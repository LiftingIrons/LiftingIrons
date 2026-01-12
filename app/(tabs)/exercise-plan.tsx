import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/UserContext';
import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/Typography';
import { SPACING } from '@/constants/Spacing';

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number | null;
  notes?: string;
};

type DayPlan = {
  dayIndex: number;
  label: string;
  focus: string;
  exercises: Exercise[];
};

type PlanRow = {
  id: string;
  title: string | null;
  focus: string | null;
  created_at: string | null;
  exercises: Exercise[] | null;
  days: DayPlan[] | null;
  plan_week_start: string | null;
};

type LogRow = {
  exercise_id: string;
  completed: boolean;
  actual_weight: number | null;
};

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function todayIndexLocal() {
  const d = new Date();
  return (d.getDay() + 6) % 7; // Monday=0
}

function estimateMinutes(exercises: Exercise[]) {
  if (!exercises?.length) return 0;
  const est = Math.round(exercises.length * 3.5 + 8);
  return Math.min(Math.max(est, 15), 90);
}

function focusBadge(focus: string) {
  const f = focus.toLowerCase();
  if (f.includes('push')) return 'PUSH';
  if (f.includes('pull')) return 'PULL';
  if (f.includes('leg')) return 'LEGS';
  if (f.includes('full')) return 'FULL';
  if (f.includes('rest')) return 'REST';
  return 'WORKOUT';
}

function warmupForFocus(focus: string) {
  const f = focus.toLowerCase();
  if (f.includes('push')) return ['5 min easy cardio', 'Band pull-aparts x20', 'Shoulder circles x20', '2 warm-up sets bench/press'];
  if (f.includes('pull')) return ['5 min easy cardio', 'Scapular pull-ups x8', 'Band rows x20', '2 warm-up sets rows/pulldown'];
  if (f.includes('leg')) return ['5 min easy cardio', 'Bodyweight squats x15', 'Hip hinges x15', '2 warm-up sets squat/press'];
  if (f.includes('full')) return ['5 min easy cardio', 'Dynamic stretch 3 min', '2 light warm-up sets first lift'];
  return ['5 min easy walk', 'Mobility 5 min'];
}

function cooldownDefault() {
  return ['Walk 5 min', 'Stretch 5 min', 'Hydrate + protein'];
}

function niceDateLabel() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

export default function ExercisePlan() {
  const { user } = useUser();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<PlanRow | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(todayIndexLocal());
  const [regenerating, setRegenerating] = useState(false);

  // progress logs for current plan/day
  const [logs, setLogs] = useState<Record<string, LogRow>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [swappingId, setSwappingId] = useState<string | null>(null);

  const selected = useMemo(() => {
    if (plan?.days?.length === 7) {
      return plan.days.find((d) => d.dayIndex === selectedDay) ?? plan.days[0];
    }
    return null;
  }, [plan, selectedDay]);

  const exercises = selected?.exercises ?? plan?.exercises ?? [];
  const focus = selected?.focus ?? plan?.focus ?? 'Workout';
  const badge = focusBadge(focus);

  const minutes = useMemo(() => estimateMinutes(exercises), [exercises]);

  const completedCount = useMemo(() => {
    return exercises.reduce((acc, ex) => acc + (logs[ex.id]?.completed ? 1 : 0), 0);
  }, [exercises, logs]);

  const loadLatestPlan = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);

    const { data, error } = await supabase
      .from('workout_plans')
      .select('id, title, focus, created_at, exercises, days, plan_week_start')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      setPlan(null);
      setLogs({});
      setLoading(false);
      return;
    }

    setPlan(data[0] as PlanRow);
    setLoading(false);
  }, [user?.id]);

  const loadLogsForDay = async (planId: string, dayIdx: number) => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('workout_exercise_logs')
      .select('exercise_id, completed, actual_weight')
      .eq('user_id', user.id)
      .eq('plan_id', planId)
      .eq('day_index', dayIdx);

    if (error || !data) {
      setLogs({});
      return;
    }

    const map: Record<string, LogRow> = {};
    data.forEach((row: any) => {
      map[row.exercise_id] = {
        exercise_id: row.exercise_id,
        completed: !!row.completed,
        actual_weight: row.actual_weight ?? null,
      };
    });

    setLogs(map);
  };

  useEffect(() => {
    loadLatestPlan();
  }, [loadLatestPlan]);

  useEffect(() => {
    if (!plan?.id) return;
    loadLogsForDay(plan.id, selectedDay);
  }, [plan?.id, selectedDay]);

  useEffect(() => {
    setSelectedDay(todayIndexLocal());
  }, []);

  const regenerate = async () => {
    if (!user?.id) return;
    setRegenerating(true);

    const { error } = await supabase.functions.invoke('generate-workout', {
      body: { user_id: user.id },
    });

    if (error) console.error('generate-workout error:', error);

    await loadLatestPlan();
    setRegenerating(false);
  };

  const toggleComplete = async (exerciseId: string) => {
    if (!user?.id || !plan?.id) return;

    const current = logs[exerciseId]?.completed ?? false;
    const next = !current;

    setSavingId(exerciseId);

    const { error } = await supabase
      .from('workout_exercise_logs')
      .upsert(
        {
          user_id: user.id,
          plan_id: plan.id,
          day_index: selectedDay,
          exercise_id: exerciseId,
          completed: next,
          actual_weight: logs[exerciseId]?.actual_weight ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,plan_id,day_index,exercise_id' }
      );

    if (!error) {
      setLogs((prev) => ({
        ...prev,
        [exerciseId]: {
          exercise_id: exerciseId,
          completed: next,
          actual_weight: prev[exerciseId]?.actual_weight ?? null,
        },
      }));
    } else {
      console.error('save complete error:', error);
    }

    setSavingId(null);
  };

  const adjustWeight = async (exerciseId: string, delta: number, suggested: number | null) => {
    if (!user?.id || !plan?.id) return;

    const base = logs[exerciseId]?.actual_weight ?? suggested ?? 0;
    const next = Math.max(0, Math.round((base + delta) * 2) / 2); // 0.5kg steps

    setSavingId(exerciseId);

    const { error } = await supabase
      .from('workout_exercise_logs')
      .upsert(
        {
          user_id: user.id,
          plan_id: plan.id,
          day_index: selectedDay,
          exercise_id: exerciseId,
          completed: logs[exerciseId]?.completed ?? false,
          actual_weight: next,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,plan_id,day_index,exercise_id' }
      );

    if (!error) {
      setLogs((prev) => ({
        ...prev,
        [exerciseId]: {
          exercise_id: exerciseId,
          completed: prev[exerciseId]?.completed ?? false,
          actual_weight: next,
        },
      }));
    } else {
      console.error('save weight error:', error);
    }

    setSavingId(null);
  };

  const swapExercise = async (exercise: Exercise) => {
    if (!user?.id || !plan?.id) return;

    setSwappingId(exercise.id);

    const bodyweightGuess = 75;
    const avoid_names = exercises.map((e) => e.name);

    const { data, error } = await supabase.functions.invoke('swap-exercise', {
      body: {
        user_id: user.id,
        exercise_id: exercise.id,
        focus,
        bodyweight_kg: bodyweightGuess,
        avoid_names,
      },
    });

    if (error) {
      console.error('swap-exercise error:', error);
      setSwappingId(null);
      return;
    }

    const replacement: Exercise | undefined = data?.exercise;
    if (!replacement?.id) {
      setSwappingId(null);
      return;
    }

    // Update local plan JSON
    const newPlan: PlanRow = JSON.parse(JSON.stringify(plan));

    if (newPlan.days?.length === 7) {
      const day = newPlan.days.find((d) => d.dayIndex === selectedDay);
      if (day) {
        day.exercises = day.exercises.map((x) => (x.id === exercise.id ? replacement : x));
      }
      const dayNow = newPlan.days.find((d) => d.dayIndex === selectedDay);
      newPlan.exercises = dayNow?.exercises ?? newPlan.exercises;
      newPlan.focus = dayNow?.focus ?? newPlan.focus;
    } else {
      newPlan.exercises = (newPlan.exercises ?? []).map((x) => (x.id === exercise.id ? replacement : x));
    }

    const { error: updateError } = await supabase
      .from('workout_plans')
      .update({
        days: newPlan.days,
        exercises: newPlan.exercises,
        focus: newPlan.focus,
      })
      .eq('id', plan.id);

    if (updateError) {
      console.error('plan update error:', updateError);
      setSwappingId(null);
      return;
    }

    // clear log for replaced exercise id (optional)
    setLogs((prev) => {
      const copy = { ...prev };
      delete copy[exercise.id];
      return copy;
    });

    setPlan(newPlan);
    setSwappingId(null);
  };

  // ---------------- UI states ----------------
  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.mutedCenter}>Loading your plan…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!plan) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <Text style={styles.h1}>No workout plan yet</Text>
          <Text style={styles.mutedCenter}>Generate your weekly plan to see workouts here.</Text>

          <TouchableOpacity
            style={[styles.primaryBtn, regenerating && { opacity: 0.7 }]}
            onPress={regenerate}
            disabled={regenerating}
          >
            <Text style={styles.primaryBtnText}>
              {regenerating ? 'Generating…' : 'Generate weekly plan'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const headerTitle = plan.title ?? 'Weekly Plan';
  const week = plan.plan_week_start ? `Week of ${plan.plan_week_start}` : '';
  const warmup = warmupForFocus(focus);
  const cooldown = cooldownDefault();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: SPACING.xxxl + insets.bottom,
        }}
      >
        {/* Home-style banner header */}
        <View style={styles.bannerWrap}>
          <View style={styles.banner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.brand}>LiftingIrons</Text>
              <Text style={styles.hello}>{headerTitle}</Text>
              <Text style={styles.date}>{niceDateLabel()}</Text>
              {!!week && <Text style={styles.date}>{week}</Text>}
            </View>

            <View style={styles.streakPill}>
              <Text style={styles.streakEmoji}>🏋️</Text>
              <Text style={styles.streakValue}>{badge}</Text>
              <Text style={styles.streakSmall}>today</Text>
            </View>
          </View>
        </View>

        <View style={styles.grid}>
          {/* Summary card */}
          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>📊 Summary</Text>
              <Text style={styles.cardMeta}>{completedCount}/{exercises.length} done</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{completedCount}/{exercises.length}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.stat}>
                <Text style={styles.statValue}>{minutes}</Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.stat}>
                <Text style={styles.statValue} numberOfLines={1}>{focus}</Text>
                <Text style={styles.statLabel}>Focus</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={regenerate}
              disabled={regenerating}
              style={[styles.secondaryBtn, regenerating && { opacity: 0.7 }]}
            >
              <Text style={styles.secondaryBtnText}>
                {regenerating ? 'Regenerating…' : 'Regenerate plan'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Day selector */}
          {plan.days?.length === 7 && (
            <View style={styles.card}>
              <View style={styles.cardAccent} />
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>🗓️ Days</Text>
                <Text style={styles.cardMeta}>Pick a day</Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.dayRow}>
                  {DAY_LABELS.map((lbl, idx) => {
                    const active = idx === selectedDay;
                    return (
                      <TouchableOpacity
                        key={lbl}
                        onPress={() => setSelectedDay(idx)}
                        style={[styles.dayChip, active && styles.dayChipActive]}
                      >
                        <Text style={[styles.dayChipText, active && styles.dayChipTextActive]}>
                          {lbl}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Warmup */}
          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>🔥 Warm-up</Text>
              <Text style={styles.cardMeta}>5–10 min</Text>
            </View>

            {warmup.map((w, i) => (
              <Text key={i} style={styles.bullet}>• {w}</Text>
            ))}
          </View>

          {/* Rest day */}
          {badge === 'REST' ? (
            <View style={styles.card}>
              <View style={styles.cardAccent} />
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>🧘 Rest day</Text>
                <Text style={styles.cardMeta}>Recover</Text>
              </View>

              <Text style={styles.mutedLeft}>Light walk, mobility and recovery.</Text>
            </View>
          ) : (
            <>
              <Text style={styles.h2}>Workout</Text>

              {exercises.map((ex, idx) => {
                const completed = logs[ex.id]?.completed ?? false;
                const actual = logs[ex.id]?.actual_weight ?? null;

                return (
                  <View
                    key={`${selectedDay}-${idx}-${ex.id}`}
                    style={[styles.card, completed && styles.cardDone]}
                  >
                    <View style={styles.cardAccent} />

                    <View style={styles.exerciseHeader}>
                      <TouchableOpacity onPress={() => toggleComplete(ex.id)} style={[styles.check, completed && styles.checkOn]}>
                        <Text style={[styles.checkText, completed && styles.checkTextOn]}>
                          {completed ? '✓' : ''}
                        </Text>
                      </TouchableOpacity>

                      <View style={{ flex: 1 }}>
                        <Text
                          style={[styles.exerciseName, completed && styles.exerciseNameDone]}
                          numberOfLines={1}
                        >
                          {ex.name}
                        </Text>
                        <Text style={[styles.meta, completed && styles.metaDone]}>
                          {ex.sets} sets • {ex.reps}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => swapExercise(ex)}
                        disabled={swappingId === ex.id}
                        style={[styles.swapBtn, swappingId === ex.id && { opacity: 0.7 }]}
                      >
                        <Text style={styles.swapText}>{swappingId === ex.id ? 'Swapping…' : 'Swap'}</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Weight controls */}
                    <View style={styles.weightRow}>
                      <Text style={styles.weightLabel}>Weight</Text>

                      <TouchableOpacity
                        onPress={() => adjustWeight(ex.id, -2.5, typeof ex.weight === 'number' ? ex.weight : null)}
                        disabled={savingId === ex.id}
                        style={styles.smallBtn}
                      >
                        <Text style={styles.smallBtnText}>−</Text>
                      </TouchableOpacity>

                      <View style={styles.weightPill}>
                        <Text style={styles.weightText}>
                          {typeof actual === 'number'
                            ? `${actual} kg`
                            : typeof ex.weight === 'number'
                            ? `${ex.weight} kg`
                            : 'Bodyweight'}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => adjustWeight(ex.id, +2.5, typeof ex.weight === 'number' ? ex.weight : null)}
                        disabled={savingId === ex.id}
                        style={styles.smallBtn}
                      >
                        <Text style={styles.smallBtnText}>＋</Text>
                      </TouchableOpacity>
                    </View>

                    {!!ex.notes && <Text style={styles.notes}>{ex.notes}</Text>}
                  </View>
                );
              })}
            </>
          )}

          {/* Cooldown */}
          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>❄️ Cooldown</Text>
              <Text style={styles.cardMeta}>5–10 min</Text>
            </View>

            {cooldown.map((c, i) => (
              <Text key={i} style={styles.bullet}>• {c}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },

  // Home-style banner
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
  streakPill: {
    width: 92,
    borderRadius: 18,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakEmoji: { color: 'white', fontSize: 16, marginBottom: 2 },
  streakValue: { color: 'white', fontSize: 14, fontWeight: '900' },
  streakSmall: { color: 'rgba(255,255,255,0.9)', fontSize: 12, marginTop: 2 },

  grid: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },

  center: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },

  h1: { ...TYPOGRAPHY.headingLarge, textAlign: 'center' },
  h2: { ...TYPOGRAPHY.headingMedium, marginTop: SPACING.lg, marginBottom: SPACING.md },

  mutedCenter: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  mutedLeft: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'left',
  },

  // Home-style card
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
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.9,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: SPACING.sm,
  },
  cardTitle: { ...TYPOGRAPHY.headingSmall, color: COLORS.text },
  cardMeta: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary },

  // Summary stats
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  divider: { width: 1, height: 28, backgroundColor: COLORS.border },

  secondaryBtn: {
    marginTop: SPACING.md,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  secondaryBtnText: { color: COLORS.primary, fontWeight: '800' },

  primaryBtn: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  primaryBtnText: { color: '#fff', fontWeight: '800' },

  // Day chips
  dayRow: { flexDirection: 'row', gap: 10 },
  dayChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dayChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dayChipText: { color: COLORS.textSecondary, fontWeight: '800' },
  dayChipTextActive: { color: '#fff' },

  // Bullets & notes
  bullet: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginTop: 6 },
  notes: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginTop: SPACING.md },

  // Exercise card header
  exerciseHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },

  // Done effect
  cardDone: { opacity: 0.55 },
  exerciseNameDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  metaDone: { color: COLORS.textSecondary },

  // Checkbox style aligned to Home
  check: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkOn: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  checkText: { fontWeight: '900', color: COLORS.text, fontSize: 16 },
  checkTextOn: { color: 'white' },

  exerciseName: { ...TYPOGRAPHY.headingMedium, color: COLORS.text },
  meta: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginTop: 4 },

  swapBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  swapText: { color: COLORS.primary, fontWeight: '800' },

  weightRow: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  weightLabel: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, width: 56 },

  smallBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  smallBtnText: { fontSize: 18, fontWeight: '900', color: COLORS.text },

  weightPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  weightText: { fontWeight: '900', color: COLORS.text },
});
