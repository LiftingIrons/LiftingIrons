import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Button from "@/components/Button";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";

type LookupResult = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

function num(x: any) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}


export default function FoodConfirm() {
  const { user } = useUser();

  // ✅ NEW: read "date" too
  const { barcode, mealIndex, date } = useLocalSearchParams<{
    barcode?: string;
    mealIndex?: string;
    date?: string;
  }>();

  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState<LookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!barcode) {
        setError("No barcode provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // OpenFoodFacts lookup (no API key needed)
        const res = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );
        const json = await res.json();

        if (!json || json.status !== 1) {
          setError("Product not found for this barcode.");
          setFood(null);
          return;
        }

        const p = json.product;

        const name =
          p.product_name ||
          p.generic_name ||
          p.abbreviated_product_name ||
          p.brands ||
          "Unknown product";

        // Most OpenFoodFacts nutrition is per 100g
        const n = p.nutriments || {};

        const calories = num(n["energy-kcal_100g"] ?? n["energy-kcal"] ?? 0);
        const protein = num(n["proteins_100g"] ?? 0);
        const carbs = num(n["carbohydrates_100g"] ?? 0);
        const fat = num(n["fat_100g"] ?? 0);

        setFood({ name, calories, protein, carbs, fat });
      } catch (e: any) {
        setError("Lookup failed. Check connection or try again.");
        setFood(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [barcode]);

  const saveReplacement = async () => {
    if (!user?.id) return;
    if (!food) return;

    const idx = Number(mealIndex);
    if (!Number.isFinite(idx)) {
      setError("Missing meal index.");
      return;
    }

    // ✅ NEW: use passed date if valid (YYYY-MM-DD), else fallback to today
    const dateKey =
      date && /^\d{4}-\d{2}-\d{2}$/.test(date)
        ? date
        : new Date().toISOString().slice(0, 10);

    const replacement = {
      name: food.name,
      food: food.name,
      calories: round1(food.calories),
      protein: round1(food.protein),
      carbs: round1(food.carbs),
      fat: round1(food.fat),
      source: "barcode",
      barcode: barcode ?? null,
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

    // Go back to meal plan and force refresh
    router.replace({
      pathname: "/meal-plan",
      params: { refresh: String(Date.now()) },
    } as any);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "800" }}>Confirm food</Text>
      <Text style={{ marginTop: 8 }}>Barcode: {barcode ?? "-"}</Text>

      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 10 }}>Looking up product…</Text>
        </View>
      )}

      {!loading && error && <Text style={{ marginTop: 20 }}>{error}</Text>}

      {!loading && food && (
        <View style={{ marginTop: 20, gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>{food.name}</Text>
          <Text>Calories: {food.calories} (per 100g)</Text>
          <Text>Protein: {food.protein}g</Text>
          <Text>Carbs: {food.carbs}g</Text>
          <Text>Fat: {food.fat}g</Text>

          <View style={{ marginTop: 16 }}>
            <Button
              title="Replace this meal"
              variant="primary"
              onPress={saveReplacement}
            />
          </View>
        </View>
      )}
    </View>
  );
}
