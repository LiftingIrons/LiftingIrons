import { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/lib/supabase';
import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/Typography';
import { SPACING } from '@/constants/Spacing';

// ✅ NEW: steps hook (make sure you created src/hooks/useStepsToday.ts)
import { useStepsToday } from "../../src/hooks/useStepsToday";

const STREAK_KEY = '@daily_streak';
const LAST_LOGIN_KEY = '@last_login_date';

// Water tracking (local)
const WATER_DATE_KEY = '@water_date';
const WATER_ML_KEY = '@water_ml';
const WATER_GOAL_ML = 2500;

type MealItem = {
  name: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type MealPlanRow = {
  id: string;
  title: string | null;
  meals: MealItem[] | null;
  total_calories: number | null;
  total_protein: number | null;
  total_carbs: number | null;
  total_fat: number | null;
  plan_date: string | null;
};

type DayPlan = {
  dayIndex: number;
  label: string;
  focus: string;
  exercises: any[];
};

type WorkoutPlanRow = {
  id: string;
  title: string | null;
  focus: string | null;
  days: DayPlan[] | null;
  created_at: string | null;
};

function todayKeyLocal() {
  return new Date().toISOString().split('T')[0];
}
function todayIndexLocal() {
  const d = new Date();
  return (d.getDay() + 6) % 7;
}
function niceDateLabel() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

function fmt1(n: number) {
  const x = Number(n);
  return Number.isFinite(x) ? x.toFixed(1) : "0.0";
}


// ---------- RING ----------
function Ring({
  label,
  valueText,
  pct,
  size = 64,
  stroke = 8,
}: {
  label: string;
  valueText: string;
  pct: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * Math.max(0, Math.min(1, pct));

  return (
    <View style={styles.ringWrap}>
      <Svg width={size} height={size}>
        {/* track */}
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={'rgba(0,0,0,0.07)'}
          strokeWidth={stroke}
          fill="none"
        />
        {/* progress */}
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={COLORS.primaryLight}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          rotation={-90}
          originX={cx}
          originY={cy}
        />
      </Svg>

      <View style={styles.ringCenter}>
        <Text style={styles.ringValue} numberOfLines={1}>
          {valueText}
        </Text>
      </View>

      <Text style={styles.ringLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export default function Home() {
  const { user, isLoading } = useUser();
  const insets = useSafeAreaInsets();

  const [streak, setStreak] = useState(1);
  const [loadingSummary, setLoadingSummary] = useState(true);

  const [todayWorkout, setTodayWorkout] = useState('Rest Day');
  const [mealItems, setMealItems] = useState<MealItem[]>([]);
  const [mealsEaten, setMealsEaten] = useState<boolean[]>([]);

  const [waterMl, setWaterMl] = useState(0);

  // ✅ NEW: steps (uses app.json motion permission)
  const { steps, available: stepsAvailable } = useStepsToday();

  const totals = useMemo(() => {
    return mealItems.reduce(
      (acc, m) => {
        acc.calories += m.calories || 0;
        acc.protein += m.protein || 0;
        acc.carbs += m.carbs || 0;
        acc.fat += m.fat || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [mealItems]);

  const eaten = useMemo(() => {
    return mealsEaten.reduce(
      (acc, didEat, i) => {
        if (didEat && mealItems[i]) {
          acc.calories += mealItems[i].calories || 0;
          acc.protein += mealItems[i].protein || 0;
          acc.carbs += mealItems[i].carbs || 0;
          acc.fat += mealItems[i].fat || 0;
        }
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [mealsEaten, mealItems]);

  const pctCalories = useMemo(
    () => (totals.calories ? Math.min(1, eaten.calories / totals.calories) : 0),
    [eaten.calories, totals.calories]
  );
  const pctProtein = useMemo(
    () => (totals.protein ? Math.min(1, eaten.protein / totals.protein) : 0),
    [eaten.protein, totals.protein]
  );
  const pctCarbs = useMemo(
    () => (totals.carbs ? Math.min(1, eaten.carbs / totals.carbs) : 0),
    [eaten.carbs, totals.carbs]
  );
  const pctFat = useMemo(
    () => (totals.fat ? Math.min(1, eaten.fat / totals.fat) : 0),
    [eaten.fat, totals.fat]
  );

  const waterPct = useMemo(() => Math.min(1, waterMl / WATER_GOAL_ML), [waterMl]);

  if (isLoading) return null;
  if (!user) return null;

  const completionKeyForDate = (dateKey: string) => `@completed_meals_${user.id}_${dateKey}`;

  // --- Streak ---
  useEffect(() => {
    const updateStreak = async () => {
      const lastLogin = await AsyncStorage.getItem(LAST_LOGIN_KEY);
      const savedStreak = await AsyncStorage.getItem(STREAK_KEY);

      let newStreak = 1;
      if (lastLogin) {
        const diff =
          (new Date().getTime() - new Date(lastLogin).getTime()) /
          (1000 * 60 * 60 * 24);

        if (diff < 1) newStreak = Number(savedStreak);
        else if (diff < 2) newStreak = Number(savedStreak) + 1;
      }

      await AsyncStorage.setItem(STREAK_KEY, newStreak.toString());
      await AsyncStorage.setItem(LAST_LOGIN_KEY, new Date().toISOString());
      setStreak(newStreak);
    };

    updateStreak();
  }, []);

  // --- Water daily reset ---
  useEffect(() => {
    const loadWater = async () => {
      const today = todayKeyLocal();
      const savedDate = await AsyncStorage.getItem(WATER_DATE_KEY);
      const savedMl = await AsyncStorage.getItem(WATER_ML_KEY);

      if (savedDate !== today) {
        await AsyncStorage.setItem(WATER_DATE_KEY, today);
        await AsyncStorage.setItem(WATER_ML_KEY, '0');
        setWaterMl(0);
        return;
      }

      setWaterMl(savedMl ? Number(savedMl) : 0);
    };

    loadWater();
  }, []);

  const setWater = async (ml: number) => {
    const next = Math.max(0, Math.min(99999, ml));
    setWaterMl(next);
    await AsyncStorage.setItem(WATER_ML_KEY, String(next));
    await AsyncStorage.setItem(WATER_DATE_KEY, todayKeyLocal());
  };

  const addWater = async (ml: number) => setWater(waterMl + ml);

  // --- Load today's plans ---
  const loadSummary = useCallback(async () => {
    if (!user?.id) return;
    setLoadingSummary(true);

    try {
      const today = todayKeyLocal();
      const dayIdx = todayIndexLocal();

      const { data: mealRows } = await supabase
        .from('meal_plans')
        .select('id, title, meals, total_calories, total_protein, total_carbs, total_fat, plan_date, created_at')
        .eq('user_id', user.id)
        .eq('plan_date', today)
        .order('created_at', { ascending: false })
        .limit(1);

      if (mealRows && mealRows.length > 0) {
        const plan = mealRows[0] as MealPlanRow;
        let meals = (plan.meals ?? []).filter(Boolean);

        // ✅ NEW: apply meal overrides before setting state (so rings use updated macros)
        const { data: overrides } = await supabase
          .from('meal_overrides')
          .select('meal_index, replacement')
          .eq('user_id', user.id)
          .eq('date', today);

        if (overrides && overrides.length > 0) {
          const merged = [...meals];
          for (const o of overrides as any[]) {
            const i = Number(o.meal_index);
            if (Number.isFinite(i) && merged[i]) {
              merged[i] = { ...merged[i], ...(o.replacement || {}) };
            }
          }
          meals = merged;
        }

        setMealItems(meals);

        // Load completion state saved from meal-plan.tsx
        const raw = await AsyncStorage.getItem(completionKeyForDate(today));
        const completedIds: string[] = raw ? JSON.parse(raw) : [];
        const eatenFlags = meals.map((_, index) => completedIds.includes(`today-${index}`));
        setMealsEaten(eatenFlags);
      } else {
        setMealItems([]);
        setMealsEaten([]);
      }

      const { data: workoutRows } = await supabase
        .from('workout_plans')
        .select('id, title, focus, days, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (workoutRows && workoutRows.length > 0) {
        const plan = workoutRows[0] as WorkoutPlanRow;

        if (plan.days && plan.days.length === 7) {
          const todayDay = plan.days.find((d) => d.dayIndex === dayIdx) ?? plan.days[0];
          setTodayWorkout(todayDay?.focus || 'Workout');
        } else {
          setTodayWorkout(plan.focus || plan.title || 'Workout');
        }
      } else {
        setTodayWorkout('Workout');
      }
    } catch (e) {
      console.error('Home summary load error:', e);
    } finally {
      setLoadingSummary(false);
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      loadSummary();
    }, [loadSummary])
  );

  const toggleMeal = (index: number) => {
    setMealsEaten((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  // Next meal (first unticked)
  const nextMealIndex = mealsEaten.findIndex((x) => !x);
  const nextMeal = nextMealIndex >= 0 ? mealItems[nextMealIndex] : null;
  const mealsDoneCount = mealsEaten.filter(Boolean).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: SPACING.xxxl + insets.bottom,
        }}
      >
        {/* Small blue banner ONLY for welcome + streak */}
        <View style={styles.bannerWrap}>
          <View style={styles.banner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.brand}>LiftingIrons</Text>
              <Text style={styles.hello}>Hey {user.name} 👋</Text>
              <Text style={styles.date}>{niceDateLabel()}</Text>
            </View>

            {/* ✅ UPDATED: streak is now a square + steps square next to it */}
            <View style={styles.bannerMiniRow}>
              <View style={styles.miniCard}>
                <Text style={styles.miniTop}>🔥</Text>
                <Text style={styles.miniValue}>{streak}</Text>
                <Text style={styles.miniLabel}>Streak</Text>
              </View>

              <View style={styles.miniCard}>
                <Text style={styles.miniTop}>👣</Text>
                <Text style={styles.miniValue}>
                  {stepsAvailable ? steps : '—'}
                </Text>
                <Text style={styles.miniLabel}>Steps</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Dashboard cards - all consistent */}
        <View style={styles.grid}>
          {/* Workout card */}
          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>🏋️ Workout</Text>
              <Text style={styles.cardMeta}>Today</Text>
            </View>

            {loadingSummary ? (
              <View style={styles.centerPad}>
                <ActivityIndicator />
              </View>
            ) : (
              <Text style={styles.bigValue} numberOfLines={1}>
                {todayWorkout}
              </Text>
            )}
          </View>

          {/* Macros card */}
          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>⚡ Macros</Text>
              <Text style={styles.cardMeta}>
                {mealItems.length ? `${eaten.calories}/${totals.calories} kcal` : 'No plan'}
              </Text>
            </View>

            <View style={styles.ringsRow}>
              <Ring label="Protein" valueText={mealItems.length ? `${fmt1(eaten.protein)}g` : '—'} pct={pctProtein} />
              <Ring label="Carbs" valueText={mealItems.length ? `${fmt1(eaten.carbs)}g` : '—'} pct={pctCarbs} />
              <Ring label="Fat" valueText={mealItems.length ? `${fmt1(eaten.fat)}g` : '—'} pct={pctFat} />
            </View>

            <Text style={styles.hint}>
              Tap meals below to update your dials.
            </Text>
          </View>

          {/* Water card */}
          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>💧 Hydration</Text>
              <Text style={styles.cardMeta}>
                {waterMl} / {WATER_GOAL_ML} ml
              </Text>
            </View>

            <View style={[styles.track, { backgroundColor: '#E6F3FF' }]}>
              <View style={[styles.fillBlue, { width: `${Math.round(waterPct * 100)}%` }]} />
            </View>

            <View style={styles.waterBubbles}>
              {Array.from({ length: 10 }).map((_, i) => (
                <View
                  key={i}
                  style={[styles.bubble, i / 9 <= waterPct ? styles.bubbleOn : styles.bubbleOff]}
                />
              ))}
            </View>

            <View style={styles.waterButtons}>
              <TouchableOpacity style={styles.waterBtn} onPress={() => addWater(250)} activeOpacity={0.85}>
                <Text style={styles.waterBtnText}>+250</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.waterBtn} onPress={() => addWater(500)} activeOpacity={0.85}>
                <Text style={styles.waterBtnText}>+500</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.waterBtn, styles.waterBtnGhost]} onPress={() => setWater(0)} activeOpacity={0.85}>
                <Text style={[styles.waterBtnText, styles.waterBtnGhostText]}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Meals card */}
          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>🍽️ Next meal</Text>
              <Text style={styles.cardMeta}>
                {mealItems.length ? `${mealsDoneCount}/${mealItems.length}` : '—'}
              </Text>
            </View>

            {loadingSummary ? (
              <View style={styles.centerPad}>
                <ActivityIndicator />
              </View>
            ) : mealItems.length === 0 ? (
              <Text style={styles.emptyText}>
                No meal plan saved for today. Go to Meal Plan and tap “Generate”.
              </Text>
            ) : !nextMeal ? (
              <Text style={styles.emptyText}>
                All meals completed for today 🎉
              </Text>
            ) : (
              <View style={styles.mealList}>
                <View style={styles.mealRow}>
                  <View style={styles.check}>
                    <Text style={styles.checkText}></Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.mealName}>{nextMeal.name}</Text>
                    <Text style={styles.mealFood} numberOfLines={1}>
                      {nextMeal.food}
                    </Text>
                  </View>

                  <Text style={styles.mealCals}>{nextMeal.calories} kcal</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.tip}>
          <Text style={styles.tipTitle}>✨ Tiny win</Text>
          <Text style={styles.tipText}>Small steps daily = scary results monthly.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },

  // --- Banner only for welcome+streak ---
  bannerWrap: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  banner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 24,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },

  brand: {
    ...TYPOGRAPHY.headingLarge,
    color: 'white',
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  hello: {
    ...TYPOGRAPHY.headingMedium,
    color: 'white',
    marginTop: 6,
  },
  date: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.92)',
    marginTop: 6,
  },

  // ✅ NEW: row for streak + steps mini cards
  bannerMiniRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'center',
  },

  // ✅ NEW: square mini cards (same vibe as old pill)
  miniCard: {
    width: 88,
    height: 88,
    borderRadius: 18,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniTop: { color: 'white', fontSize: 16, marginBottom: 2 },
  miniValue: { color: 'white', fontSize: 22, fontWeight: '900' },
  miniLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 12, marginTop: 2 },

  // --- Cards grid (consistent design) ---
  grid: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },

  // little accent strip so all cards feel “same system”
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.9,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: SPACING.sm,
  },
  cardTitle: { ...TYPOGRAPHY.headingSmall, color: COLORS.text },
  cardMeta: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary },

  bigValue: {
    ...TYPOGRAPHY.headingMedium,
    color: COLORS.text,
    marginTop: 2,
  },

  // --- Rings ---
  ringsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.sm,
  },
  ringWrap: { alignItems: 'center', width: 74 },
  ringCenter: {
    position: 'absolute',
    top: 18,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  ringValue: { color: COLORS.text, fontWeight: '900', fontSize: 12 },
  ringLabel: { marginTop: 6, color: COLORS.textSecondary, fontSize: 12 },

  hint: {
    marginTop: SPACING.sm,
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },

  // --- Water ---
  track: {
    height: 12,
    borderRadius: 999,
    backgroundColor: COLORS.background,
    marginTop: SPACING.sm,
    overflow: 'hidden',
  },
  fillBlue: {
    height: 12,
    borderRadius: 999,
    backgroundColor: COLORS.primaryLight,
  },
  waterBubbles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  bubble: { width: 10, height: 10, borderRadius: 999 },
  bubbleOn: { backgroundColor: COLORS.primaryLight, opacity: 0.95 },
  bubbleOff: { backgroundColor: COLORS.border, opacity: 0.7 },

  waterButtons: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.md },
  waterBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
  },
  waterBtnText: { ...TYPOGRAPHY.labelMedium, color: 'white', fontWeight: '800' },
  waterBtnGhost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.primaryLight },
  waterBtnGhostText: { color: COLORS.primaryLight },

  // --- Meals ---
  centerPad: { paddingVertical: SPACING.lg, alignItems: 'center' },
  emptyText: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, lineHeight: 18, marginTop: SPACING.sm },

  mealList: { gap: SPACING.sm, marginTop: SPACING.sm },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  mealRowDone: { opacity: 0.9 },

  check: {
    width: 26,
    height: 26,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkOn: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  checkText: { fontWeight: '900', color: COLORS.text },
  checkTextOn: { color: 'white' },

  mealName: { ...TYPOGRAPHY.labelMedium, color: COLORS.text },
  mealFood: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginTop: 2 },
  mealCals: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginLeft: 10 },
  doneText: { color: COLORS.textSecondary, textDecorationLine: 'line-through' },

  // --- Tip ---
  tip: {
    marginTop: SPACING.lg,
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tipTitle: { ...TYPOGRAPHY.labelMedium, color: COLORS.text, marginBottom: 6 },
  tipText: { ...TYPOGRAPHY.bodyMedium, color: COLORS.textSecondary, lineHeight: 18 },
});
