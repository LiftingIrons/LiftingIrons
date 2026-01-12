import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Utensils,
  ThumbsUp,
  ThumbsDown,
  X,
} from 'lucide-react-native';
import Button from '@/components/Button';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import WebSafeTouchableOpacity from '@/components/WebSafeTouchableOpacity';
import { useUser } from '@/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  generateMealPlan,
  generateMealWeek,
  getUserMealPlans,
  MealPlan,
  supabase,
} from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';


interface Meal {
  name: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  completed?: boolean;
  imageUrl?: string;
}

type DbProfile = {
  user_id: string;
  age?: number;
  height?: number;
  weight?: number;
  gender?: string;
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'very';
};

type DbGoals = {
  user_id: string;
  primary_goal?: 'weight-loss' | 'muscle-gain' | 'general-fitness' | 'athletic';
  dietary_restrictions?: string[];
};

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


export default function MealPlanScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { refresh } = useLocalSearchParams<{ refresh?: string }>();


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedMeals, setCompletedMeals] = useState<string[]>([]);
  const [mealFeedback, setMealFeedback] = useState<{
    [key: string]: 'like' | 'dislike' | null;
  }>({});
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isLoadingMealPlan, setIsLoadingMealPlan] = useState(true);
  const [isGeneratingMealPlan, setIsGeneratingMealPlan] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

  // Meal info modal
  const [mealModalVisible, setMealModalVisible] = useState(false);
  const [expandedMeal, setExpandedMeal] = useState<{ meal: Meal; index: number } | null>(null);

  // Edit modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editMealIndex, setEditMealIndex] = useState<number | null>(null);

  const openEditModal = (index: number) => {
    setEditMealIndex(index);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setEditMealIndex(null);
  };

  const formatDateKey = (date: Date) => date.toISOString().split('T')[0];

  const completionKeyForDate = (date: Date) =>
    `@completed_meals_${user?.id ?? 'anon'}_${formatDateKey(date)}`;

  const fetchProfileAndGoals = async (): Promise<{
    profile: DbProfile | null;
    goals: DbGoals | null;
  }> => {
    if (!user?.id) return { profile: null, goals: null };

    const [profileRes, goalsRes] = await Promise.all([
      supabase.from('user_profiles').select('*').eq('user_id', user.id).maybeSingle(),
      supabase.from('fitness_goals').select('*').eq('user_id', user.id).maybeSingle(),
    ]);

    const profile = (profileRes.data as DbProfile) ?? null;
    const goals = (goalsRes.data as DbGoals) ?? null;

    setNeedsSetup(!profile || !goals);
    return { profile, goals };
  };

  const loadMealPlan = async () => {
    if (!user?.id) {
      setMealPlan(null);
      setIsLoadingMealPlan(false);
      return;
    }

    setIsLoadingMealPlan(true);
    try {
      const dateString = formatDateKey(selectedDate);
      const plans = await getUserMealPlans(user.id, dateString);

if (plans && plans.length > 0) {
  const plan = plans[0];

  // Fetch overrides for this user + date
  const { data: overrides } = await supabase
    .from('meal_overrides')
    .select('meal_index, replacement')
    .eq('user_id', user.id)
    .eq('date', dateString);

  if (overrides && overrides.length > 0) {
    const meals = [...(plan.meals || [])];
    for (const o of overrides as any[]) {
      const i = Number(o.meal_index);
      if (Number.isFinite(i) && meals[i]) {
        meals[i] = { ...meals[i], ...(o.replacement || {}) };
      }
    }
    setMealPlan({ ...plan, meals });
  } else {
    setMealPlan(plan);
  }
} else {
  setMealPlan(null);
}
    } catch (error) {
      console.error('Error loading meal plan:', error);
      setMealPlan(null);
    } finally {
      setIsLoadingMealPlan(false);
    }
  };

  const handleGenerateMealPlan = async () => {
    if (!user?.id) return;

    setIsGeneratingMealPlan(true);
    try {
      const dateString = formatDateKey(selectedDate);
      const { profile, goals } = await fetchProfileAndGoals();

      if (!profile || !goals) {
        setNeedsSetup(true);
        return;
      }

      const primaryGoal = goals.primary_goal ?? 'general-fitness';

      const preferences = {
        dietaryRestrictions: goals.dietary_restrictions ?? [],
        calorieTarget:
          primaryGoal === 'weight-loss' ? -500 : primaryGoal === 'muscle-gain' ? 500 : 0,
        mealCount: 4,
      };

      const response = await generateMealPlan({
        ...preferences,
        date: dateString,
      });

      if (response?.success && response?.mealPlan) setMealPlan(response.mealPlan);
      else setMealPlan(null);
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setMealPlan(null);
    } finally {
      setIsGeneratingMealPlan(false);
    }
  };

  const handleGenerateMealWeek = async () => {
    if (!user?.id) return;

    setIsGeneratingMealPlan(true);
    try {
      const dateString = formatDateKey(selectedDate);
      const { profile, goals } = await fetchProfileAndGoals();

      if (!profile || !goals) {
        setNeedsSetup(true);
        return;
      }

      const primaryGoal = goals.primary_goal ?? 'general-fitness';

      const preferences = {
        dietaryRestrictions: goals.dietary_restrictions ?? [],
        calorieTarget:
          primaryGoal === 'weight-loss' ? -500 : primaryGoal === 'muscle-gain' ? 500 : 0,
        mealCount: 4,
        date: dateString,
      };

      await generateMealWeek(preferences);
      await loadMealPlan();
    } catch (error) {
      console.error('Error generating meal week:', error);
      setMealPlan(null);
    } finally {
      setIsGeneratingMealPlan(false);
    }
  };

  React.useEffect(() => {
    loadMealPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, user?.id, refresh]);

  React.useEffect(() => {
    const loadCompleted = async () => {
      try {
        const raw = await AsyncStorage.getItem(completionKeyForDate(selectedDate));
        setCompletedMeals(raw ? JSON.parse(raw) : []);
      } catch {
        setCompletedMeals([]);
      }
    };

    loadCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, user?.id]);

  const toggleMealCompletion = (mealId: string) => {
    setCompletedMeals((prev) => {
      const next = prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId];
      AsyncStorage.setItem(completionKeyForDate(selectedDate), JSON.stringify(next)).catch(() => {});
      return next;
    });
  };

  const handleMealFeedback = (mealId: string, feedback: 'like' | 'dislike') => {
    setMealFeedback((prev) => ({
      ...prev,
      [mealId]: prev[mealId] === feedback ? null : feedback,
    }));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const consumedCalories =
    mealPlan?.meals
      .filter((_, index) => completedMeals.includes(`today-${index}`))
      .reduce((sum: number, meal: any) => sum + meal.calories, 0) || 0;

  const openMealModal = (meal: Meal, index: number) => {
    setExpandedMeal({ meal, index });
    setMealModalVisible(true);
  };

  const closeMealModal = () => {
    setMealModalVisible(false);
    setExpandedMeal(null);
  };

  const renderMealPlan = () => {
    if (isLoadingMealPlan) {
      return (
        <View style={styles.homeCard}>
          <View style={styles.cardAccent} />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading meal plan...</Text>
          </View>
        </View>
      );
    }

    if (!mealPlan) {
      return (
        <View style={styles.homeCard}>
          <View style={styles.cardAccent} />
          <View style={styles.emptyMealPlanContainer}>
            <Utensils size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyMealPlanTitle}>No Meal Plan</Text>
            <Text style={styles.emptyMealPlanText}>Generate a personalized meal plan for today</Text>

            {needsSetup ? (
              <Button
                title="Complete setup"
                onPress={() => router.push('/(onboarding)/goals')}
                variant="primary"
                size="medium"
                style={styles.generateButton}
              />
            ) : (
              <>
                <Button
                  title={isGeneratingMealPlan ? 'Generating...' : 'Generate Week (Sun–Sat)'}
                  onPress={handleGenerateMealWeek}
                  variant="primary"
                  size="medium"
                  loading={isGeneratingMealPlan}
                  disabled={isGeneratingMealPlan}
                  style={styles.generateButton}
                />

                <Button
                  title={isGeneratingMealPlan ? 'Generating...' : 'Generate Just This Day'}
                  onPress={handleGenerateMealPlan}
                  variant="secondary"
                  size="medium"
                  disabled={isGeneratingMealPlan}
                  style={styles.generateButton}
                />
              </>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.homeCard}>
        <View style={styles.cardAccent} />

        <View style={styles.dayHeader}>
          <Text style={[TYPOGRAPHY.headingMedium, styles.dayTitle]} numberOfLines={1}>
            {mealPlan.title}
          </Text>
          <Text style={styles.dayCalories}>
            {consumedCalories} / {mealPlan.total_calories} kcal
          </Text>
        </View>

        <Text style={styles.proteinTarget}>Target: {mealPlan.total_protein}g protein</Text>

        <View style={styles.mealsContainer}>
          {mealPlan.meals.map((meal: Meal, index: number) => {
            const mealId = `today-${index}`;
            const isCompleted = completedMeals.includes(mealId);

            return (
              <View key={index} style={[styles.mealItem, isCompleted && styles.completedMeal]}>
                {/* Completion toggle (image) */}
                <WebSafeTouchableOpacity
                  style={styles.mealImageContainer}
                  onPress={() => toggleMealCompletion(mealId)}
                >
                  <View style={[styles.mealImage, { backgroundColor: COLORS.primaryLight + '40' }]}>
                    <Utensils size={24} color={COLORS.primary} />
                  </View>
                  {isCompleted && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>✓</Text>
                    </View>
                  )}
                </WebSafeTouchableOpacity>

                {/* Meal details clickable */}
                <WebSafeTouchableOpacity
                  style={styles.mealDetails}
                  onPress={() => openMealModal(meal, index)}
                >
                  <Text style={[TYPOGRAPHY.headingSmall, styles.mealName]} numberOfLines={2}>
                    {meal.name}
                  </Text>
                  <Text style={[TYPOGRAPHY.bodyMedium, styles.mealFood]} numberOfLines={1}>
                    {meal.food}
                  </Text>

                  <View style={styles.mealMacros}>
<Text style={styles.macroText}>{fmt1(meal.calories)} kcal</Text>
<Text style={styles.macroText}>| {fmt1(meal.protein)}g protein</Text>
<Text style={styles.macroText}>| {fmt1(meal.carbs)}g carbs</Text>

                  </View>
                </WebSafeTouchableOpacity>

                {/* Right-side controls */}
                <View style={styles.rightColumn}>
                  <Clock size={16} color={COLORS.textSecondary} />

                  <WebSafeTouchableOpacity style={styles.editButton} onPress={() => openEditModal(index)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </WebSafeTouchableOpacity>

                  <View style={styles.feedbackButtons}>
                    <WebSafeTouchableOpacity
                      style={[styles.feedbackButton, mealFeedback[mealId] === 'like' && styles.likedButton]}
                      onPress={() => handleMealFeedback(mealId, 'like')}
                    >
                      <ThumbsUp
                        size={16}
                        color={mealFeedback[mealId] === 'like' ? COLORS.white : COLORS.success}
                        fill={mealFeedback[mealId] === 'like' ? COLORS.white : 'none'}
                      />
                    </WebSafeTouchableOpacity>

                    <WebSafeTouchableOpacity
                      style={[
                        styles.feedbackButton,
                        mealFeedback[mealId] === 'dislike' && styles.dislikedButton,
                      ]}
                      onPress={() => handleMealFeedback(mealId, 'dislike')}
                    >
                      <ThumbsDown
                        size={16}
                        color={mealFeedback[mealId] === 'dislike' ? COLORS.white : COLORS.error}
                        fill={mealFeedback[mealId] === 'dislike' ? COLORS.white : 'none'}
                      />
                    </WebSafeTouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Meal info modal */}
        <Modal
          visible={mealModalVisible}
          animationType="slide"
          transparent
          onRequestClose={closeMealModal}
        >
          <Pressable style={styles.modalBackdrop} onPress={closeMealModal} />

          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} numberOfLines={2}>
                {expandedMeal?.meal?.name ?? 'Meal'}
              </Text>

              <WebSafeTouchableOpacity onPress={closeMealModal} style={styles.modalClose}>
                <X size={20} color={COLORS.text} />
              </WebSafeTouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalBody}>
              <Text style={styles.modalSubTitle}>Food</Text>
              <Text style={styles.modalText}>{expandedMeal?.meal?.food ?? '-'}</Text>

              <View style={styles.modalMacrosRow}>
<Text style={styles.modalPill}>{fmt1(expandedMeal?.meal?.calories ?? 0)} kcal</Text>
<Text style={styles.modalPill}>{fmt1(expandedMeal?.meal?.protein ?? 0)}g protein</Text>
<Text style={styles.modalPill}>{fmt1(expandedMeal?.meal?.carbs ?? 0)}g carbs</Text>
<Text style={styles.modalPill}>{fmt1(expandedMeal?.meal?.fat ?? 0)}g fat</Text>
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* Edit modal */}
        <Modal
          visible={editModalVisible}
          animationType="slide"
          transparent
          onRequestClose={closeEditModal}
        >
          <Pressable style={styles.modalBackdrop} onPress={closeEditModal} />

          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit meal</Text>

              <WebSafeTouchableOpacity onPress={closeEditModal} style={styles.modalClose}>
                <X size={20} color={COLORS.text} />
              </WebSafeTouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, gap: SPACING.sm }}>
              <Button
                title="Search food"
                variant="primary"
                onPress={() => {
                  closeEditModal();
                  router.push(
                    { pathname: '/food-search', params: { mealIndex: String(editMealIndex ?? '') } } as any
                  );
                }}
              />

              <Button
                title="Scan barcode"
                variant="secondary"
                onPress={() => {
                  closeEditModal();
router.push(
  {
    pathname: "/food-search",
    params: {
      mealIndex: String(editMealIndex ?? ""),
      date: formatDateKey(selectedDate),
    },
  } as any
);

                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerWrap}>
        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.brand}>LiftingIrons</Text>
            <Text style={styles.hello}>Meal Plan 🍽️</Text>
            <Text style={styles.date}>{niceDateLabel()}</Text>
          </View>
          <View style={styles.streakPill}>
            <Text style={styles.streakEmoji}>🍽️</Text>
            <Text style={styles.streakValue}>TODAY</Text>
            <Text style={styles.streakSmall}>meals</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingBottom: SPACING.xxxl }]}>
        <View style={styles.homeCardSm}>
          <View style={styles.cardAccent} />
          <View style={styles.dateNav}>
            <WebSafeTouchableOpacity onPress={() => changeDate(-1)}>
              <ChevronLeft size={24} color={COLORS.primary} />
            </WebSafeTouchableOpacity>

            <View style={styles.dateContainer}>
              <Calendar size={20} color={COLORS.primary} />
              <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            </View>

            <WebSafeTouchableOpacity onPress={() => changeDate(1)}>
              <ChevronRight size={24} color={COLORS.primary} />
            </WebSafeTouchableOpacity>
          </View>
        </View>

        {renderMealPlan()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  bannerWrap: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm },
  banner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 24,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  brand: { ...TYPOGRAPHY.headingLarge, color: 'white', fontWeight: '800', letterSpacing: 0.6 },
  hello: { ...TYPOGRAPHY.headingMedium, color: 'white', marginTop: 6 },
  date: { ...TYPOGRAPHY.bodySmall, color: 'rgba(255,255,255,0.92)', marginTop: 6 },

  streakPill: {
    width: 84,
    borderRadius: 18,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakEmoji: { color: 'white', fontSize: 16, marginBottom: 2 },
  streakValue: { color: 'white', fontSize: 14, fontWeight: '900' },
  streakSmall: { color: 'rgba(255,255,255,0.9)', fontSize: 12, marginTop: 2 },

  content: { paddingTop: SPACING.lg, paddingHorizontal: SPACING.lg, gap: SPACING.md },

  homeCard: {
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
    marginBottom: SPACING.md,
  },
  homeCardSm: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: SPACING.md,
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

  dateNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dateContainer: { flexDirection: 'row', alignItems: 'center' },
  dateText: { ...TYPOGRAPHY.labelMedium, marginLeft: SPACING.sm, color: COLORS.text },

  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  dayTitle: { color: COLORS.text, flex: 1 },
  dayCalories: { ...TYPOGRAPHY.labelMedium, color: COLORS.primary },
  proteinTarget: { ...TYPOGRAPHY.labelMedium, color: COLORS.textSecondary, marginBottom: SPACING.md },

  mealsContainer: { gap: SPACING.sm },

  mealItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  completedMeal: { backgroundColor: COLORS.success + '10', borderColor: COLORS.success },

  mealImageContainer: { position: 'relative', marginRight: SPACING.md },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: { color: COLORS.white, fontSize: 12, fontWeight: 'bold' },

  mealDetails: { flex: 1, minWidth: 0 },

  mealName: {
    color: COLORS.text,
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },

  mealFood: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    fontSize: 13,
  },

  mealMacros: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  macroText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginRight: 6,
  },

  rightColumn: {
    flexShrink: 0,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: SPACING.sm,
    paddingTop: 2,
  },

  editButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editButtonText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '800',
  },

  feedbackButtons: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: 8,
    flexShrink: 0,
  },

  feedbackButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedButton: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  dislikedButton: { backgroundColor: COLORS.error, borderColor: COLORS.error },

  loadingContainer: { alignItems: 'center', padding: SPACING.xl },
  loadingText: { ...TYPOGRAPHY.bodyMedium, color: COLORS.textSecondary, marginTop: SPACING.md },

  emptyMealPlanContainer: { alignItems: 'center', padding: SPACING.xl },
  emptyMealPlanTitle: { ...TYPOGRAPHY.headingSmall, marginTop: SPACING.md, marginBottom: SPACING.sm },
  emptyMealPlanText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  generateButton: { marginTop: SPACING.md },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '80%',
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  modalHeader: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  modalTitle: {
    flex: 1,
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '900',
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  modalSubTitle: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.text,
    fontWeight: '800',
  },
  modalText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  modalMacrosRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  modalPill: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
});
