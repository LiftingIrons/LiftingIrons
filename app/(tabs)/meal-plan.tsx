import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { ChevronLeft, ChevronRight, Calendar, Clock, Utensils, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import WebSafeTouchableOpacity from '@/components/WebSafeTouchableOpacity';
import { useUser } from '@/context/UserContext';
import { generateMealPlan, getUserMealPlans, MealPlan } from '@/lib/supabase';
import { meals } from '@/data/mockData';

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

export default function MealPlanScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedMeals, setCompletedMeals] = useState<string[]>([]);
  const [mealFeedback, setMealFeedback] = useState<{[key: string]: 'like' | 'dislike' | null}>({});
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isLoadingMealPlan, setIsLoadingMealPlan] = useState(true);
  const [isGeneratingMealPlan, setIsGeneratingMealPlan] = useState(false);
  const { user } = useUser();

  // Generate meal plan from mock data
  const generateMealPlanFromMockData = () => {
    if (!user?.goals?.primary) {
      // Default meal plan
      const defaultMeals = meals.slice(0, 4);
      return {
        title: 'Balanced Daily Meals',
        description: 'A well-rounded meal plan for general health',
        total_calories: defaultMeals.reduce((sum, meal) => sum + meal.calories, 0),
        total_protein: defaultMeals.reduce((sum, meal) => sum + meal.protein, 0),
        total_carbs: defaultMeals.reduce((sum, meal) => sum + meal.carbs, 0),
        total_fat: defaultMeals.reduce((sum, meal) => sum + meal.fat, 0),
        meals: defaultMeals.map(meal => ({
          name: meal.title.includes('Breakfast') ? 'Breakfast' :
                meal.title.includes('Lunch') ? 'Lunch' :
                meal.title.includes('Dinner') ? 'Dinner' : 'Snack',
          food: meal.title,
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fat: meal.fat,
          imageUrl: meal.imageUrl
        }))
      };
    }

    let filteredMeals = [];
    let title = '';
    let description = '';
    let targetCalories = 2000;

    switch (user.goals.primary) {
      case 'weight-loss':
        title = 'Weight Loss Meal Plan';
        description = 'High-protein, lower-calorie meals to support fat loss';
        targetCalories = 1600;
        // Filter for lower calorie, high protein meals
        filteredMeals = meals.filter(meal => 
          meal.calories < 400 && meal.protein > 15
        ).slice(0, 4);
        break;
        
      case 'muscle-gain':
        title = 'Muscle Building Meal Plan';
        description = 'High-calorie, protein-rich meals to support muscle growth';
        targetCalories = 2800;
        // Filter for higher calorie, high protein meals
        filteredMeals = meals.filter(meal => 
          meal.protein > 20
        ).slice(0, 4);
        break;
        
      default:
        title = 'Balanced Nutrition Plan';
        description = 'Well-rounded meals for general fitness and health';
        targetCalories = 2200;
        filteredMeals = meals.slice(0, 4);
    }

    // If not enough filtered meals, add more from the general pool
    if (filteredMeals.length < 4) {
      const remainingMeals = meals.filter(meal => 
        !filteredMeals.some(fm => fm.id === meal.id)
      );
      filteredMeals = [...filteredMeals, ...remainingMeals].slice(0, 4);
    }

    // Assign meal types
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    const planMeals = filteredMeals.map((meal, index) => ({
      name: mealTypes[index] || 'Meal',
      food: meal.title,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      imageUrl: meal.imageUrl
    }));

    return {
      title,
      description,
      total_calories: planMeals.reduce((sum, meal) => sum + meal.calories, 0),
      total_protein: planMeals.reduce((sum, meal) => sum + meal.protein, 0),
      total_carbs: planMeals.reduce((sum, meal) => sum + meal.carbs, 0),
      total_fat: planMeals.reduce((sum, meal) => sum + meal.fat, 0),
      meals: planMeals
    };
  };
  // Load meal plan for selected date
  const loadMealPlan = async () => {
    if (!user?.id) {
      // Use mock data when no user ID
      const mockMealPlan = generateMealPlanFromMockData();
      setMealPlan({
        id: 'mock-meal-plan',
        user_id: 'mock-user',
        title: mockMealPlan.title,
        description: mockMealPlan.description,
        total_calories: mockMealPlan.total_calories,
        total_protein: mockMealPlan.total_protein,
        total_carbs: mockMealPlan.total_carbs,
        total_fat: mockMealPlan.total_fat,
        meals: mockMealPlan.meals,
        plan_date: selectedDate.toISOString().split('T')[0],
        is_completed: false,
        ai_generated: true,
        created_at: new Date().toISOString()
      });
      setIsLoadingMealPlan(false);
      return;
    }
    
    setIsLoadingMealPlan(true);
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      const plans = await getUserMealPlans(user.id, dateString);
      
      if (plans && plans.length > 0) {
        setMealPlan(plans[0]);
      } else {
        // Generate from mock data if no saved plan
        const mockMealPlan = generateMealPlanFromMockData();
        setMealPlan({
          id: `mock-meal-plan-${dateString}`,
          user_id: user.id,
          title: mockMealPlan.title,
          description: mockMealPlan.description,
          total_calories: mockMealPlan.total_calories,
          total_protein: mockMealPlan.total_protein,
          total_carbs: mockMealPlan.total_carbs,
          total_fat: mockMealPlan.total_fat,
          meals: mockMealPlan.meals,
          plan_date: dateString,
          is_completed: false,
          ai_generated: true,
          created_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error loading meal plan:', error);
      // Fallback to mock data on error
      const mockMealPlan = generateMealPlanFromMockData();
      setMealPlan({
        id: 'fallback-meal-plan',
        user_id: user?.id || 'mock-user',
        title: mockMealPlan.title,
        description: mockMealPlan.description,
        total_calories: mockMealPlan.total_calories,
        total_protein: mockMealPlan.total_protein,
        total_carbs: mockMealPlan.total_carbs,
        total_fat: mockMealPlan.total_fat,
        meals: mockMealPlan.meals,
        plan_date: selectedDate.toISOString().split('T')[0],
        is_completed: false,
        ai_generated: true,
        created_at: new Date().toISOString()
      });
    } finally {
      setIsLoadingMealPlan(false);
    }
  };

  // Generate new meal plan
  const handleGenerateMealPlan = async () => {
    if (!user?.id) {
      // Generate new mock meal plan
      const mockMealPlan = generateMealPlanFromMockData();
      setMealPlan({
        id: `new-mock-meal-plan-${Date.now()}`,
        user_id: 'mock-user',
        title: mockMealPlan.title,
        description: mockMealPlan.description,
        total_calories: mockMealPlan.total_calories,
        total_protein: mockMealPlan.total_protein,
        total_carbs: mockMealPlan.total_carbs,
        total_fat: mockMealPlan.total_fat,
        meals: mockMealPlan.meals,
        plan_date: selectedDate.toISOString().split('T')[0],
        is_completed: false,
        ai_generated: true,
        created_at: new Date().toISOString()
      });
      return;
    }
    
    setIsGeneratingMealPlan(true);
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      
      const preferences = {
        calorieTarget: user.goals?.primary === 'weight-loss' ? -500 : 
                     user.goals?.primary === 'muscle-gain' ? 500 : 0,
        dietaryRestrictions: [],
        mealCount: 4,
        userProfile: {
          age: user.dimensions?.age,
          weight: user.dimensions?.weight,
          height: user.dimensions?.height,
          gender: user.dimensions?.gender,
          activityLevel: user.goals?.activityLevel,
          primaryGoal: user.goals?.primary
        }
      };
      
      const response = await generateMealPlan(user.id, {
        ...preferences,
        date: dateString,
      });
      
      if (response.success) {
        setMealPlan(response.mealPlan);
      } else {
        // Fallback to mock data if API fails
        const mockMealPlan = generateMealPlanFromMockData();
        setMealPlan({
          id: `fallback-meal-plan-${Date.now()}`,
          user_id: user.id,
          title: mockMealPlan.title,
          description: mockMealPlan.description,
          total_calories: mockMealPlan.total_calories,
          total_protein: mockMealPlan.total_protein,
          total_carbs: mockMealPlan.total_carbs,
          total_fat: mockMealPlan.total_fat,
          meals: mockMealPlan.meals,
          plan_date: dateString,
          is_completed: false,
          ai_generated: true,
          created_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error generating meal plan:', error);
      // Fallback to mock data on error
      const mockMealPlan = generateMealPlanFromMockData();
      setMealPlan({
        id: `error-fallback-meal-plan-${Date.now()}`,
        user_id: user?.id || 'mock-user',
        title: mockMealPlan.title,
        description: mockMealPlan.description,
        total_calories: mockMealPlan.total_calories,
        total_protein: mockMealPlan.total_protein,
        total_carbs: mockMealPlan.total_carbs,
        total_fat: mockMealPlan.total_fat,
        meals: mockMealPlan.meals,
        plan_date: selectedDate.toISOString().split('T')[0],
        is_completed: false,
        ai_generated: true,
        created_at: new Date().toISOString()
      });
    } finally {
      setIsGeneratingMealPlan(false);
    }
  };

  // Load meal plan when component mounts or date changes
  React.useEffect(() => {
    loadMealPlan();
  }, [selectedDate, user?.id]);

  const toggleMealCompletion = (mealId: string) => {
    setCompletedMeals(prev => 
      prev.includes(mealId)
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const handleMealFeedback = (mealId: string, feedback: 'like' | 'dislike') => {
    setMealFeedback(prev => ({
      ...prev,
      [mealId]: prev[mealId] === feedback ? null : feedback
    }));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const consumedCalories = mealPlan?.meals
    .filter((_, index) => completedMeals.includes(`today-${index}`))
    .reduce((sum: number, meal: any) => sum + meal.calories, 0) || 0;

  const renderMealPlan = () => {
    if (isLoadingMealPlan) {
      return (
        <Card style={styles.mealPlanCard}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading meal plan...</Text>
          </View>
        </Card>
      );
    }

    if (!mealPlan) {
      return (
        <Card style={styles.mealPlanCard}>
          <View style={styles.emptyMealPlanContainer}>
            <Utensils size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyMealPlanTitle}>No Meal Plan</Text>
            <Text style={styles.emptyMealPlanText}>
              Generate a personalized meal plan for today
            </Text>
            <Button
              title={isGeneratingMealPlan ? "Generating..." : "Generate Meal Plan"}
              onPress={handleGenerateMealPlan}
              variant="primary"
              size="medium"
              loading={isGeneratingMealPlan}
              disabled={isGeneratingMealPlan}
              style={styles.generateButton}
            />
          </View>
        </Card>
      );
    }

    return (
      <Card style={styles.mealPlanCard}>
        <View style={styles.dayHeader}>
          <Text style={[TYPOGRAPHY.headingMedium, styles.dayTitle]}>{mealPlan.title}</Text>
          <Text style={styles.dayCalories}>
            {consumedCalories} / {mealPlan.total_calories} kcal
          </Text>
        </View>
        
        <Text style={styles.proteinTarget}>
          Target: {mealPlan.total_protein}g protein
        </Text>
        
        <View style={styles.mealsContainer}>
          {mealPlan.meals.map((meal: Meal, index: number) => {
            const mealId = `today-${index}`;
            const isCompleted = completedMeals.includes(mealId);
            
            return (
              <WebSafeTouchableOpacity
                key={index}
                style={[styles.mealItem, isCompleted && styles.completedMeal]}
                onPress={() => toggleMealCompletion(mealId)}
              >
                <View style={styles.mealImageContainer}>
                  <View style={[styles.mealImage, { backgroundColor: COLORS.primaryLight + '40' }]}>
                    <Utensils size={24} color={COLORS.primary} />
                  </View>
                  {isCompleted && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>✓</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.mealDetails}>
                  <Text style={[TYPOGRAPHY.labelMedium, styles.mealName]}>
                    {meal.name}
                  </Text>
                  <Text style={[TYPOGRAPHY.bodyMedium, styles.mealFood]} numberOfLines={1}>
                    {meal.food}
                  </Text>
                  <View style={styles.mealMacros}>
                    <Text style={styles.macroText}>{meal.calories} kcal</Text>
                    <Text style={styles.macroText}>•</Text>
                    <Text style={styles.macroText}>{meal.protein}g protein</Text>
                    <Text style={styles.macroText}>•</Text>
                    <Text style={styles.macroText}>{meal.carbs}g carbs</Text>
                  </View>
                </View>
                
                <View style={styles.mealTime}>
                  <Clock size={16} color={COLORS.textSecondary} />
                </View>
                
                {/* Feedback Buttons */}
                <View style={styles.feedbackButtons}>
                  <WebSafeTouchableOpacity
                    style={[
                      styles.feedbackButton,
                      mealFeedback[mealId] === 'like' && styles.likedButton
                    ]}
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
                      mealFeedback[mealId] === 'dislike' && styles.dislikedButton
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
              </WebSafeTouchableOpacity>
            );
          })}
        </View>
      </Card>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Meal Plan"
        subtitle="Your personalized nutrition plan 🍽️"
      />
      
      {/* Date Navigation */}
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

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* AI-Generated Meal Plan */}
        {renderMealPlan()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  dateNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    ...TYPOGRAPHY.labelMedium,
    marginLeft: SPACING.sm,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  mealPlanCard: {
    marginBottom: SPACING.lg,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  dayTitle: {
    color: COLORS.text,
  },
  dayCalories: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.primary,
  },
  proteinTarget: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  mealsContainer: {
    gap: SPACING.sm,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  completedMeal: {
    backgroundColor: COLORS.success + '10',
    borderColor: COLORS.success,
  },
  mealImageContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
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
  completedText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  mealFood: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  mealMacros: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  macroText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  mealTime: {
    padding: SPACING.sm,
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginLeft: SPACING.sm,
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
  likedButton: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  dislikedButton: {
    backgroundColor: COLORS.error,
    borderColor: COLORS.error,
  },
  emptyState: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  loadingText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  emptyMealPlanContainer: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyMealPlanTitle: {
    ...TYPOGRAPHY.headingSmall,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  emptyMealPlanText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  generateButton: {
    marginTop: SPACING.md,
  },
});