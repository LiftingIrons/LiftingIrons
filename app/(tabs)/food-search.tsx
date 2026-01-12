import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import { COLORS } from "@/constants/Colors";

const { barcode } = useLocalSearchParams<{ barcode?: string }>();


type FoodItem = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  brand?: string;
};

function num(x: any) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}


export default function FoodSearch() {
  const { user } = useUser();
  const { mealIndex, date } = useLocalSearchParams<{ mealIndex?: string; date?: string }>();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<FoodItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dateKey = useMemo(() => {
    return date && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? date
      : new Date().toISOString().slice(0, 10);
  }, [date]);

  const idx = useMemo(() => {
    const n = Number(mealIndex);
    return Number.isFinite(n) ? n : null;
  }, [mealIndex]);

  useEffect(() => {
    // Debounced “search as you type”
    const t = setTimeout(async () => {
      const q = query.trim();
      if (q.length < 2) {
        setItems([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // OpenFoodFacts text search
        const url =
          "https://world.openfoodfacts.org/cgi/search.pl" +
          `?search_terms=${encodeURIComponent(q)}` +
          "&search_simple=1&action=process&json=1&page_size=20";

        const res = await fetch(url);
        const json = await res.json();

        const products = Array.isArray(json?.products) ? json.products : [];

        const mapped: FoodItem[] = products
          .map((p: any) => {
            const n = p?.nutriments || {};
            const name =
              p?.product_name ||
              p?.generic_name ||
              p?.abbreviated_product_name ||
              p?.brands ||
              "Unknown";

            // Often per 100g on OFF
            const calories = num(n["energy-kcal_100g"] ?? n["energy-kcal"] ?? 0);
            const protein = num(n["proteins_100g"] ?? 0);
            const carbs = num(n["carbohydrates_100g"] ?? 0);
            const fat = num(n["fat_100g"] ?? 0);

            const id = String(p?._id || p?.id || p?.code || name);

            return {
              id,
              name,
              brand: p?.brands,
              calories,
              protein,
              carbs,
              fat,
            };
          })
          // remove super-empty items
          .filter((x: FoodItem) => x.name && x.name !== "Unknown");

        setItems(mapped);
      } catch (e) {
        setError("Search failed. Check connection and try again.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(t);
  }, [query]);

  const saveReplacement = async (food: FoodItem) => {
    if (!user?.id) {
      setError("You must be logged in.");
      return;
    }
    if (idx === null) {
      setError("Missing meal index.");
      return;
    }

    const replacement = {
      name: food.name,
      food: food.name,
      calories: round1(food.calories),
      protein: round1(food.protein),
      carbs: round1(food.carbs),
      fat: round1(food.fat),
      brand: food.brand ?? null,
      source: "search",
      // note: these numbers are usually per 100g — you can add serving later
    };

    const { error } = await supabase
      .from("meal_overrides")
      .upsert(
        {
          user_id: user.id,
          date: dateKey,
          meal_index: idx,
          replacement,
        },
        { onConflict: "user_id,date,meal_index" }
      );

    if (error) {
      setError(error.message);
      return;
    }

    router.replace({ pathname: "/meal-plan", params: { refresh: String(Date.now()) } } as any);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 18, fontWeight: "800" }}>Search food</Text>
      <Text style={{ marginTop: 6, color: "#666" }}>
        Type to search (results update live)
      </Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="e.g. greek yogurt, banana, protein bar..."
        autoCapitalize="none"
        style={{
          marginTop: 12,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 10,
          fontSize: 16,
        }}
      />

      {loading && (
        <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", gap: 10 }}>
          <ActivityIndicator />
          <Text>Searching…</Text>
        </View>
      )}

      {error && <Text style={{ marginTop: 12, color: "red" }}>{error}</Text>}

      <FlatList
        style={{ marginTop: 12 }}
        data={items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          !loading && query.trim().length >= 2 ? (
            <Text style={{ marginTop: 20, color: "#666" }}>No results.</Text>
          ) : (
            <Text style={{ marginTop: 20, color: "#666" }}>
              Start typing to search…
            </Text>
          )
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => saveReplacement(item)}
            style={{
              padding: 12,
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 14,
              marginBottom: 10,
              backgroundColor: "#fafafa",
            }}
          >
            <Text style={{ fontWeight: "800", fontSize: 15 }}>{item.name}</Text>
            {!!item.brand && <Text style={{ color: "#666", marginTop: 2 }}>{item.brand}</Text>}
            <Text style={{ color: "#666", marginTop: 6 }}>
              {item.calories} kcal • P {item.protein}g • C {item.carbs}g • F {item.fat}g (per 100g)
            </Text>
          </Pressable>
        )}
      />

      <View style={{ marginTop: 6 }}>
        <Button title="Back" variant="secondary" onPress={() => router.back()} />
      </View>
    </View>
  );
}
