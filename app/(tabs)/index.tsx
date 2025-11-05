import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  SafeAreaView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Plus, Check, Clock, Utensils, Flame as Fire, ChevronRight, Target, TrendingUp, Droplets } from 'lucide-react-native';
import Card from '@/components/Card';
import GoalCard from '@/components/GoalCard';
import WorkoutCard from '@/components/WorkoutCard';
import AITip from '@/components/AITip';
import ProgressBar from '@/components/ProgressBar';
import Header from '@/components/Header';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { goals, tips, user, meals, exerciseLibrary } from '@/data/mockData';
import WebSafeTouchableOpacity from '@/components/WebSafeTouchableOpacity';
import { useUser } from '@/context/UserContext';
import { useAutoGeneratePlans } from '@/hooks/useAutoGeneratePlans';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  
  // Auto-generate daily plans
  useAutoGeneratePlans();
  
  const [waterIntake, setWaterIntake] = React.useState(1000); // in ml
  const waterGoal = 2000; // 2 litres in ml
  const todayMeals = (meals || []).slice(0, 3);
  const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = todayMeals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = todayMeals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = todayMeals.reduce((sum, meal) => sum + meal.fat, 0);
  const calorieGoal = 2200;
  const calorieProgress = totalCalories / calorieGoal;

  const handleWaterUpdate = () => {
    if (waterIntake < waterGoal) {
      setWaterIntake(prev => Math.min(prev + 500, waterGoal));
    } else {
      setWaterIntake(0); // Reset if at max
    }
  };
  // Show loading state if user data is still being set up
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Header title="Loading..." subtitle="Setting up your personalized experience" />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Generate today's workout based on user goals using exercise library
  const generateTodaysWorkout = () => {
    if (!user?.goals?.primary) {
      return {
        name: 'Welcome Workout',
        duration: '20 min',
        exercises: exerciseLibrary.exercises.slice(0, 4).map(ex => ex.name),
        calories: 150
      };
    }

    const dayOfWeek = new Date().getDay();
    let targetCategory = '';
    
    // Create a weekly split based on user's goal
    switch (user.goals.primary) {
      case 'weight-loss':
        const weightLossCategories = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
        targetCategory = weightLossCategories[dayOfWeek % weightLossCategories.length];
        return {
          name: `${targetCategory} Fat Burn`,
          duration: '30 min',
          exercises: exerciseLibrary.exercises
            .filter(ex => ex.category === targetCategory)
            .slice(0, 4)
            .map(ex => ex.name),
          calories: 350
        };
      case 'muscle-gain':
        const muscleGainSplit = {
          0: 'Chest',    // Sunday
          1: 'Back',     // Monday  
          2: 'Legs',     // Tuesday
          3: 'Shoulders', // Wednesday
          4: 'Arms',     // Thursday
          5: 'Core',     // Friday
          6: 'Chest'     // Saturday
        };
        targetCategory = muscleGainSplit[dayOfWeek];
        return {
          name: `${targetCategory} Hypertrophy`,
          duration: '45 min',
          exercises: exerciseLibrary.exercises
            .filter(ex => ex.category === targetCategory)
            .slice(0, 4)
            .map(ex => ex.name),
          calories: 280
        };
      default:
        const generalCategories = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
        targetCategory = generalCategories[dayOfWeek % generalCategories.length];
        return {
          name: `${targetCategory} Strength`,
          duration: '35 min',
          exercises: exerciseLibrary.exercises
            .filter(ex => ex.category === targetCategory)
            .slice(0, 4)
            .map(ex => ex.name),
          calories: 250
        };
    }
  };

  const todaysWorkout = generateTodaysWorkout();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header 
          title={user ? `Welcome back, ${user.name.split(' ')[0]}!` : "Welcome Back!"}
          subtitle="Let's crush your goals today 🌟"
        />

        {/* Progress Overview */}
        {user?.goals && (
          <Card style={styles.progressCard}>
            <Text style={[TYPOGRAPHY.headingSmall, styles.sectionTitle]}>
              Your Progress
            </Text>
            <View style={styles.progressStats}>
              <View style={styles.progressItem}>
                <Target size={24} color={COLORS.primary} />
                <Text style={styles.progressValue}>
                  {user.goals.primary === 'weight-loss' ? 'Weight Loss' : 
                   user.goals.primary === 'muscle-gain' ? 'Muscle Gain' : 'General Fitness'}
                </Text>
                <Text style={styles.progressLabel}>Primary Goal</Text>
              </View>
              <View style={styles.progressItem}>
                <TrendingUp size={24} color={COLORS.success} />
                <Text style={styles.progressValue}>85%</Text>
                <Text style={styles.progressLabel}>Weekly Target</Text>
              </View>
              <View style={styles.progressItem}>
                <Fire size={24} color={COLORS.error} />
                <Text style={styles.progressValue}>1,250</Text>
                <Text style={styles.progressLabel}>Calories Burned</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Today's Overview */}
        <Card style={styles.overviewCard}>
          <Text style={[TYPOGRAPHY.headingSmall, styles.sectionTitle]}>
            Today's Overview
          </Text>
          <View style={styles.overviewStats}>
            <View style={styles.statItem}>
              <Fire size={24} color={COLORS.primary} />
              <Text style={styles.statValue}>{totalCalories}</Text>
              <Text style={styles.statLabel}>kcal</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <WebSafeTouchableOpacity 
                style={styles.waterStatContainer}
                onPress={handleWaterUpdate}
              >
                <Droplets size={24} color={COLORS.primary} />
                <Text style={styles.statValue}>{waterIntake / 1000}L</Text>
                <Text style={styles.statLabel}>water</Text>
                <View style={styles.waterMeter}>
                  <View 
                    style={[
                      styles.waterProgress, 
                      { width: `${(waterIntake / waterGoal) * 100}%` }
                    ]} 
                  />
                </View>
              </WebSafeTouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Clock size={24} color={COLORS.primary} />
              <Text style={styles.statValue}>{todaysWorkout?.duration || '0'}</Text>
              <Text style={styles.statLabel}>workout</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Utensils size={24} color={COLORS.primary} />
              <Text style={styles.statValue}>{todayMeals.length}</Text>
              <Text style={styles.statLabel}>meals</Text>
            </View>
          </View>
          
          {/* Macro breakdown */}
          <View style={styles.macroBreakdown}>
            <Text style={[TYPOGRAPHY.labelMedium, styles.macroTitle]}>
              Today's Macros
            </Text>
            <View style={styles.macroStats}>
              <View style={styles.macroItem}>
                <View style={[styles.macroIndicator, { backgroundColor: COLORS.error }]} />
                <Text style={styles.macroLabel}>Protein</Text>
                <Text style={styles.macroValue}>{totalProtein}g</Text>
              </View>
              <View style={styles.macroItem}>
                <View style={[styles.macroIndicator, { backgroundColor: COLORS.primary }]} />
                <Text style={styles.macroLabel}>Carbs</Text>
                <Text style={styles.macroValue}>{totalCarbs}g</Text>
              </View>
              <View style={styles.macroItem}>
                <View style={[styles.macroIndicator, { backgroundColor: COLORS.warning }]} />
                <Text style={styles.macroLabel}>Fat</Text>
                <Text style={styles.macroValue}>{totalFat}g</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* AI Coach Tip */}
        <AITip tips={tips || []} />

        {/* Today's Workout */}
        <View style={styles.sectionHeader}>
          <Text style={TYPOGRAPHY.headingMedium}>Today's Workout</Text>
          <WebSafeTouchableOpacity 
            style={styles.seeAllButton}
            onPress={() => router.push('/exercise-plan')}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={COLORS.primary} />
          </WebSafeTouchableOpacity>
        </View>

        {todaysWorkout && (
          <Card style={styles.workoutCard}>
            <Text style={TYPOGRAPHY.headingSmall}>{todaysWorkout.name}</Text>
            <View style={styles.workoutStats}>
              <Text style={styles.workoutDuration}>{todaysWorkout.duration}</Text>
              <Text style={styles.workoutCalories}>{todaysWorkout.calories} cal</Text>
            </View>
            <View style={styles.exerciseList}>
              {todaysWorkout.exercises.map((exercise, index) => (
                <Text key={index} style={styles.exerciseItem}>• {exercise}</Text>
              ))}
            </View>
          </Card>
        )}

        {/* Today's Meals */}
        <View style={styles.sectionHeader}>
          <Text style={TYPOGRAPHY.headingMedium}>Today's Meals</Text>
          <WebSafeTouchableOpacity 
            style={styles.seeAllButton}
            onPress={() => router.push('/meal-plan')}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={COLORS.primary} />
          </WebSafeTouchableOpacity>
        </View>

        <Card style={styles.mealsCard}>
          <View style={styles.calorieProgress}>
            <View style={styles.calorieHeader}>
              <Text style={TYPOGRAPHY.labelMedium}>Calories</Text>
              <Text style={TYPOGRAPHY.labelMedium}>
                {totalCalories} / {calorieGoal} kcal
              </Text>
            </View>
            <ProgressBar 
              progress={calorieProgress} 
              height={8}
              color={COLORS.primary}
            />
          </View>

          {todayMeals.map((meal, index) => (
            <View key={meal.id} style={styles.mealItem}>
              <Image 
                source={{ uri: meal.imageUrl }} 
                style={styles.mealImage}
              />
              <View style={styles.mealInfo}>
                <Text style={TYPOGRAPHY.labelMedium} numberOfLines={1}>
                  {meal.title}
                </Text>
                <Text style={styles.mealMacros}>
                  {meal.calories} kcal • {meal.protein}g protein
                </Text>
              </View>
              <View style={styles.mealCheck}>
                <Check size={16} color={COLORS.success} />
              </View>
            </View>
          ))}

          <WebSafeTouchableOpacity 
            style={styles.addMealButton}
            onPress={() => router.push('/meal-plan')}
          >
            <Plus size={16} color={COLORS.primary} />
            <Text style={styles.addMealText}>Add Meal</Text>
          </WebSafeTouchableOpacity>
        </Card>

        {/* Current Goals */}
        {user?.goals && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={TYPOGRAPHY.headingMedium}>Your Goals</Text>
              <WebSafeTouchableOpacity onPress={() => router.push('/profile')}>
                <Text style={styles.seeAllText}>See All</Text>
              </WebSafeTouchableOpacity>
            </View>

            {(goals || []).slice(0, 2).map((goal) => (
              <GoalCard
                key={goal.id}
                title={goal.title}
                description={goal.description}
                progress={goal.progress}
                daysLeft={goal.daysLeft}
                onPress={() => {}}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxxl,
    ...(Platform.OS === 'web' && {
      maxWidth: 800,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  overviewCard: {
    marginTop: SPACING.md,
  },
  progressCard: {
    marginTop: SPACING.md,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressItem: {
    flex: 1,
    alignItems: 'center',
  },
  progressValue: {
    ...TYPOGRAPHY.labelMedium,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  progressLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...TYPOGRAPHY.headingSmall,
    marginTop: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
  workoutCard: {
    marginBottom: SPACING.md,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  workoutDuration: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primary,
  },
  workoutCalories: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  exerciseList: {
    marginTop: SPACING.sm,
  },
  exerciseItem: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  mealsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  calorieProgress: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  calorieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  mealImage: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.sm,
  },
  mealInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  mealMacros: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  mealCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  addMealText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  macroBreakdown: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  macroTitle: {
    marginBottom: SPACING.sm,
    color: COLORS.textSecondary,
  },
  macroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
  },
  macroIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: SPACING.xs,
  },
  macroLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  macroValue: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.text,
  },
  waterStatContainer: {
    flex: 1,
    alignItems: 'center',
  },
  waterMeter: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginTop: SPACING.xs,
    overflow: 'hidden',
  },
  waterProgress: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});