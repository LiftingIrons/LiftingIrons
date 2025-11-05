import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Calendar, ChevronLeft, ChevronRight, X as Close, Dumbbell, Clock, Target, RefreshCw, ThumbsUp, ThumbsDown, Plus, Minus } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { useUser } from '@/context/UserContext';
import WebSafeTouchableOpacity from '@/components/WebSafeTouchableOpacity';
import { generateWorkoutPlan, getUserWorkoutPlans, WorkoutPlan } from '@/lib/supabase';
import { exerciseLibrary } from '@/data/mockData';

export default function MyPlanScreen() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoadingWorkout, setIsLoadingWorkout] = useState(true);
  const [isGeneratingWorkout, setIsGeneratingWorkout] = useState(false);
  const [exerciseFeedback, setExerciseFeedback] = useState<{[key: string]: {liked?: boolean, weightFeedback?: 'light' | 'heavy' | 'perfect'}}>({});
  const [completedExercises, setCompletedExercises] = useState<{[key: string]: boolean}>({});

  // Function to calculate suggested weight based on exercise type, user weight, and experience
  const calculateSuggestedWeight = (exercise: any, userWeight: number = 70, activityLevel: string = 'light') => {
    if (!userWeight) userWeight = 70; // Default weight if not provided
    
    // Experience multipliers
    const experienceMultipliers = {
      'sedentary': 0.3,
      'light': 0.5,
      'moderate': 0.7,
      'very': 0.9
    };
    
    const multiplier = experienceMultipliers[activityLevel] || 0.5;
    
    // Base weight calculations as percentage of body weight
    const exerciseWeightRatios = {
      // Chest exercises
      'Push-ups': 0, // Bodyweight
      'Chest Press': userWeight * 0.8 * multiplier,
      'Bench Press': userWeight * 0.9 * multiplier,
      'Incline Press': userWeight * 0.7 * multiplier,
      'Decline Press': userWeight * 0.8 * multiplier,
      'Dumbbell Press': userWeight * 0.3 * multiplier, // Per dumbbell
      'Flyes': userWeight * 0.2 * multiplier,
      
      // Back exercises
      'Pull-ups': 0, // Bodyweight
      'Lat Pulldown': userWeight * 0.7 * multiplier,
      'Rows': userWeight * 0.6 * multiplier,
      'Deadlift': userWeight * 1.2 * multiplier,
      'T-Bar Row': userWeight * 0.8 * multiplier,
      
      // Shoulder exercises
      'Shoulder Press': userWeight * 0.5 * multiplier,
      'Lateral Raises': userWeight * 0.15 * multiplier,
      'Front Raises': userWeight * 0.15 * multiplier,
      'Rear Delt Flyes': userWeight * 0.1 * multiplier,
      
      // Leg exercises
      'Squats': userWeight * 1.0 * multiplier,
      'Leg Press': userWeight * 1.5 * multiplier,
      'Lunges': userWeight * 0.3 * multiplier, // Per leg
      'Leg Curls': userWeight * 0.4 * multiplier,
      'Leg Extensions': userWeight * 0.5 * multiplier,
      'Calf Raises': userWeight * 0.8 * multiplier,
      
      // Arm exercises
      'Bicep Curls': userWeight * 0.2 * multiplier,
      'Tricep Extensions': userWeight * 0.25 * multiplier,
      'Hammer Curls': userWeight * 0.2 * multiplier,
      'Tricep Dips': 0, // Bodyweight
      
      // Core exercises
      'Planks': 0, // Bodyweight/time
      'Crunches': 0, // Bodyweight
      'Russian Twists': userWeight * 0.1 * multiplier,
      'Weighted Sit-ups': userWeight * 0.15 * multiplier,
    };
    
    // Find matching exercise by checking if exercise name contains key words
    let suggestedWeight = 0;
    const exerciseName = exercise.name.toLowerCase();
    
    for (const [key, weight] of Object.entries(exerciseWeightRatios)) {
      if (exerciseName.includes(key.toLowerCase().split(' ')[0])) {
        suggestedWeight = weight;
        break;
      }
    }
    
    // If no specific match found, use category-based defaults
    if (suggestedWeight === 0 && exercise.category) {
      const categoryDefaults = {
        'chest': userWeight * 0.6 * multiplier,
        'back': userWeight * 0.7 * multiplier,
        'shoulders': userWeight * 0.4 * multiplier,
        'arms': userWeight * 0.2 * multiplier,
        'legs': userWeight * 0.8 * multiplier,
        'core': 0 // Usually bodyweight
      };
      
      suggestedWeight = categoryDefaults[exercise.category.toLowerCase()] || userWeight * 0.3 * multiplier;
    }
    
    // Round to nearest 2.5kg for practical weight selection
    if (suggestedWeight > 0) {
      return Math.round(suggestedWeight / 2.5) * 2.5;
    }
    
    return 0; // Bodyweight exercises
  };

  // Generate workout based on user's goals using mock data
  const generateWorkoutFromMockData = () => {
    const dateString = selectedDate.toISOString().split('T')[0];
    const dayOfWeek = selectedDate.getDay();
    const dayOfMonth = selectedDate.getDate();
    
    // Create a weekly split with proper day labels
    const dayLabels = ['Chest Day Today!', 'Back Day Today!', 'Leg Day Today!', 'Shoulder Day Today!', 'Arm Day Today!', 'Core Day Today!', 'Full Body Day Today!'];
    const dayLabel = dayLabels[dayOfWeek];
    
    // Get exercises for the specific day
    const categoryMap = {
      0: 'Chest',    // Sunday - Chest Day
      1: 'Back',     // Monday - Back Day  
      2: 'Legs',     // Tuesday - Leg Day
      3: 'Shoulders', // Wednesday - Shoulder Day
      4: 'Arms',     // Thursday - Arm Day
      5: 'Core',     // Friday - Core Day
      6: 'Chest'     // Saturday - Chest Day
    };
    
    const targetCategory = categoryMap[dayOfWeek];
    let selectedExercises = exerciseLibrary.exercises.filter(exercise => 
      exercise.category && exercise.category.toLowerCase() === targetCategory.toLowerCase()
    );
    
    // If not enough exercises in target category, add more from general library
    if (selectedExercises.length < 5) {
      const additionalExercises = exerciseLibrary.exercises.filter(exercise => 
        !selectedExercises.some(selected => selected.id === exercise.id)
      );
      selectedExercises = [...selectedExercises, ...additionalExercises];
    }
    
    // Use date-based selection to vary exercises
    const startIndex = dayOfMonth % Math.max(selectedExercises.length - 5 + 1, 1);
    const finalExercises = selectedExercises.slice(startIndex, startIndex + 5);
    
    // If still not enough, add more from the beginning
    if (finalExercises.length < 5) {
      const needed = 5 - finalExercises.length;
      const additional = selectedExercises.slice(0, needed);
      finalExercises.push(...additional);
    }

    // Convert to workout format with suggested weights
    const workoutExercises = finalExercises.map(exercise => {
      const suggestedWeight = calculateSuggestedWeight(
        exercise, 
        user?.dimensions?.weight || 70, 
        user?.goals?.activityLevel || 'light'
      );

      return {
        name: exercise.name,
        sets: 3,
        reps: '10-12',
        restTime: '60 seconds',
        suggestedWeight: suggestedWeight,
        targetMuscles: exercise.muscles || [exercise.category],
        instructions: exercise.instructions || [`Perform ${exercise.name} with proper form`]
      };
    });
    
    return {
      title: dayLabel,
      description: `A focused ${targetCategory.toLowerCase()} workout to build strength and muscle`,
      duration: 30,
      difficulty: 'beginner',
      exercises: workoutExercises,
      calories_burned: 200
    };
  };

  // Load workout plan for selected date
  const loadWorkoutPlan = async () => {
    setWorkoutPlan(null); // Clear current plan first
    setIsLoadingWorkout(true);
    
    if (!user?.id) {
      // Use mock data when no user ID
      const mockWorkout = generateWorkoutFromMockData();
      setWorkoutPlan({
        id: `mock-workout-${selectedDate.toISOString().split('T')[0]}-${selectedDate.getTime()}`,
        user_id: 'mock-user',
        title: mockWorkout.title,
        description: mockWorkout.description,
        difficulty: mockWorkout.difficulty,
        duration: mockWorkout.duration,
        exercises: mockWorkout.exercises,
        calories_burned: mockWorkout.calories_burned,
        plan_date: selectedDate.toISOString().split('T')[0],
        is_completed: false,
        ai_generated: true,
        created_at: new Date().toISOString()
      });
      setIsLoadingWorkout(false);
      return;
    }
    
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      const plans = await getUserWorkoutPlans(user.id, dateString);
      
      if (plans && plans.length > 0) {
        setWorkoutPlan(plans[0]);
      } else {
        // Generate from mock data if no saved plan
        const mockWorkout = generateWorkoutFromMockData();
        setWorkoutPlan({
          id: `mock-workout-${dateString}-${selectedDate.getTime()}`,
          user_id: user.id,
          title: mockWorkout.title,
          description: mockWorkout.description,
          difficulty: mockWorkout.difficulty,
          duration: mockWorkout.duration,
          exercises: mockWorkout.exercises,
          calories_burned: mockWorkout.calories_burned,
          plan_date: dateString,
          is_completed: false,
          ai_generated: true,
          created_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error loading workout plan:', error);
      // Fallback to mock data on error
      const mockWorkout = generateWorkoutFromMockData();
      setWorkoutPlan({
        id: `fallback-workout-${selectedDate.getTime()}`,
        user_id: user?.id || 'mock-user',
        title: mockWorkout.title,
        description: mockWorkout.description,
        difficulty: mockWorkout.difficulty,
        duration: mockWorkout.duration,
        exercises: mockWorkout.exercises,
        calories_burned: mockWorkout.calories_burned,
        plan_date: selectedDate.toISOString().split('T')[0],
        is_completed: false,
        ai_generated: true,
        created_at: new Date().toISOString()
      });
    } finally {
      setIsLoadingWorkout(false);
    }
  };

  // Generate new workout plan
  const handleGenerateWorkout = async () => {
    if (!user?.id) {
      // Generate new mock workout
      const mockWorkout = generateWorkoutFromMockData();
      setWorkoutPlan({
        id: `new-mock-workout-${Date.now()}`,
        user_id: 'mock-user',
        title: mockWorkout.title,
        description: mockWorkout.description,
        difficulty: mockWorkout.difficulty,
        duration: mockWorkout.duration,
        exercises: mockWorkout.exercises,
        calories_burned: mockWorkout.calories_burned,
        plan_date: selectedDate.toISOString().split('T')[0],
        is_completed: false,
        ai_generated: true,
        created_at: new Date().toISOString()
      });
      return;
    }
    
    setIsGeneratingWorkout(true);
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      
      // Use the actual user data from sign-up for AI generation
      const preferences = {
        duration: 45,
        difficulty: user.goals?.activityLevel === 'sedentary' ? 'beginner' : 
                   user.goals?.activityLevel === 'light' ? 'intermediate' :
                   user.goals?.activityLevel === 'moderate' ? 'intermediate' : 'advanced',
        focusAreas: user.goals?.primary === 'weight-loss' ? ['cardio', 'full-body'] :
                   user.goals?.primary === 'muscle-gain' ? ['strength', 'hypertrophy'] :
                   user.goals?.primary === 'athletic' ? ['power', 'agility'] :
                   ['general-fitness'],
        userProfile: {
          age: user.dimensions?.age,
          weight: user.dimensions?.weight,
          height: user.dimensions?.height,
          gender: user.dimensions?.gender,
          activityLevel: user.goals?.activityLevel,
          primaryGoal: user.goals?.primary
        }
      };
      
      const response = await generateWorkoutPlan(user.id, {
        ...preferences,
        date: dateString,
      });
      
      if (response.success) {
        setWorkoutPlan(response.workout);
      } else {
        // Fallback to mock data if API fails
        const mockWorkout = generateWorkoutFromMockData();
        setWorkoutPlan({
          id: `fallback-workout-${Date.now()}`,
          user_id: user.id,
          title: mockWorkout.title,
          description: mockWorkout.description,
          difficulty: mockWorkout.difficulty,
          duration: mockWorkout.duration,
          exercises: mockWorkout.exercises,
          calories_burned: mockWorkout.calories_burned,
          plan_date: dateString,
          is_completed: false,
          ai_generated: true,
          created_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error generating workout plan:', error);
      // Fallback to mock data on error
      const mockWorkout = generateWorkoutFromMockData();
      setWorkoutPlan({
        id: `error-fallback-workout-${Date.now()}`,
        user_id: user?.id || 'mock-user',
        title: mockWorkout.title,
        description: mockWorkout.description,
        difficulty: mockWorkout.difficulty,
        duration: mockWorkout.duration,
        exercises: mockWorkout.exercises,
        calories_burned: mockWorkout.calories_burned,
        plan_date: selectedDate.toISOString().split('T')[0],
        is_completed: false,
        ai_generated: true,
        created_at: new Date().toISOString()
      });
    } finally {
      setIsGeneratingWorkout(false);
    }
  };

  // Load workout when component mounts or date changes
  React.useEffect(() => {
    loadWorkoutPlan();
  }, [selectedDate, user?.id, user?.goals]);

  const renderWorkoutContent = () => {
    if (isLoadingWorkout) {
      return (
        <Card style={styles.workoutCard}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading workout plan...</Text>
          </View>
        </Card>
      );
    }

    if (!workoutPlan) {
      return (
        <Card style={styles.workoutCard}>
          <View style={styles.emptyWorkoutContainer}>
            <Dumbbell size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyWorkoutTitle}>No Workout Plan</Text>
            <Text style={styles.emptyWorkoutText}>
              Generate a personalized workout plan for today
            </Text>
            <Button
              title={isGeneratingWorkout ? "Generating..." : "Generate Workout"}
              onPress={handleGenerateWorkout}
              variant="primary"
              size="medium"
              loading={isGeneratingWorkout}
              disabled={isGeneratingWorkout}
              style={styles.generateButton}
            />
          </View>
        </Card>
      );
    }

    return (
      <Card style={styles.workoutCard}>
        <View style={styles.workoutHeader}>
          <View>
            <Text style={TYPOGRAPHY.headingSmall}>{workoutPlan.title}</Text>
            <Text style={styles.workoutDescription}>{workoutPlan.description}</Text>
          </View>
          <WebSafeTouchableOpacity
            onPress={handleGenerateWorkout}
            style={styles.refreshButton}
            disabled={isGeneratingWorkout}
          >
            <RefreshCw size={20} color={COLORS.primary} />
          </WebSafeTouchableOpacity>
        </View>

        <View style={styles.workoutStats}>
          <View style={styles.workoutStatItem}>
            <Clock size={16} color={COLORS.primary} />
            <Text style={styles.workoutStatText}>{workoutPlan.duration} min</Text>
          </View>
          <View style={styles.workoutStatItem}>
            <Target size={16} color={COLORS.primary} />
            <Text style={styles.workoutStatText}>{workoutPlan.difficulty}</Text>
          </View>
          <View style={styles.workoutStatItem}>
            <Dumbbell size={16} color={COLORS.primary} />
            <Text style={styles.workoutStatText}>{workoutPlan.exercises?.length || 0} exercises</Text>
          </View>
        </View>

        {workoutPlan.exercises?.map((exercise, index) => {
          const exerciseKey = `${workoutPlan.id}-${index}`;
          const feedback = exerciseFeedback[exerciseKey];
          const isCompleted = completedExercises[exerciseKey];
          
          return (
            <View key={index} style={styles.exercise}>
              <View style={styles.exerciseHeader}>
                <WebSafeTouchableOpacity 
                  onPress={() => handleExercisePress(exercise.name)}
                  style={styles.exerciseNameButton}
                >
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseViewDetails}>View Details →</Text>
                </WebSafeTouchableOpacity>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} sets × {exercise.reps}
                </Text>
              </View>
              {exercise.restTime && (
                <Text style={styles.exerciseRest}>Rest: {exercise.restTime}</Text>
              )}
              {exercise.suggestedWeight !== undefined && (
                <View style={styles.weightContainer}>
                  <Text style={styles.exerciseWeight}>
                    {exercise.suggestedWeight > 0 ? `Suggested: ${exercise.suggestedWeight}kg` : 'Bodyweight'}
                  </Text>
                  {exercise.suggestedWeight > 0 && (
                    <View style={styles.weightFeedback}>
                      <WebSafeTouchableOpacity
                        style={[
                          styles.weightButton,
                          feedback?.weightFeedback === 'light' && styles.weightButtonActive
                        ]}
                        onPress={() => handleWeightFeedback(index, 'light')}
                      >
                        <Minus size={16} color={feedback?.weightFeedback === 'light' ? COLORS.white : COLORS.warning} />
                        <Text style={[
                          styles.weightButtonText,
                          feedback?.weightFeedback === 'light' && styles.weightButtonTextActive
                        ]}>Too Light</Text>
                      </WebSafeTouchableOpacity>
                      
                      <WebSafeTouchableOpacity
                        style={[
                          styles.weightButton,
                          feedback?.weightFeedback === 'heavy' && styles.weightButtonActive
                        ]}
                        onPress={() => handleWeightFeedback(index, 'heavy')}
                      >
                        <Plus size={16} color={feedback?.weightFeedback === 'heavy' ? COLORS.white : COLORS.error} />
                        <Text style={[
                          styles.weightButtonText,
                          feedback?.weightFeedback === 'heavy' && styles.weightButtonTextActive
                        ]}>Too Heavy</Text>
                      </WebSafeTouchableOpacity>
                    </View>
                  )}
                </View>
              )}
              {exercise.targetMuscles && (
                <Text style={styles.exerciseMuscles}>
                  Targets: {exercise.targetMuscles.join(', ')}
                </Text>
              )}
              
              {/* Exercise Like/Dislike Buttons */}
              <View style={styles.exerciseFeedback}>
                <Text style={styles.feedbackLabel}>How was this exercise?</Text>
                <View style={styles.feedbackButtons}>
                  <WebSafeTouchableOpacity
                    style={[
                      styles.feedbackButton,
                      feedback?.liked === true && styles.likedButton
                    ]}
                    onPress={() => handleExerciseLike(index, true)}
                  >
                    <ThumbsUp 
                      size={16} 
                      color={feedback?.liked === true ? COLORS.white : COLORS.success}
                      fill={feedback?.liked === true ? COLORS.white : 'none'}
                    />
                    <Text style={[
                      styles.feedbackButtonText,
                      feedback?.liked === true && styles.feedbackButtonTextActive
                    ]}>Like</Text>
                  </WebSafeTouchableOpacity>
                  
                  <WebSafeTouchableOpacity
                    style={[
                      styles.feedbackButton,
                      feedback?.liked === false && styles.dislikedButton
                    ]}
                    onPress={() => handleExerciseLike(index, false)}
                  >
                    <ThumbsDown 
                      size={16} 
                      color={feedback?.liked === false ? COLORS.white : COLORS.error}
                      fill={feedback?.liked === false ? COLORS.white : 'none'}
                    />
                    <Text style={[
                      styles.feedbackButtonText,
                      feedback?.liked === false && styles.feedbackButtonTextActive
                    ]}>Dislike</Text>
                  </WebSafeTouchableOpacity>
                </View>
              </View>
              
              {/* Exercise Completion Button */}
              <WebSafeTouchableOpacity
                style={[
                  styles.completionButton,
                  isCompleted && styles.completionButtonCompleted
                ]}
                onPress={() => handleExerciseCompletion(index)}
              >
                <Text style={[
                  styles.completionButtonText,
                  isCompleted && styles.completionButtonTextCompleted
                ]}>
                  {isCompleted ? '✓ Completed' : 'Mark Complete'}
                </Text>
              </WebSafeTouchableOpacity>
            </View>
          );
        })}

        {workoutPlan.calories_burned && (
          <View style={styles.caloriesBurned}>
            <Text style={styles.caloriesBurnedText}>
              Estimated calories burned: {workoutPlan.calories_burned} kcal
            </Text>
          </View>
        )}
      </Card>
    );
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

  const handleExerciseLike = (exerciseIndex: number, liked: boolean) => {
    const exerciseKey = `${workoutPlan?.id}-${exerciseIndex}`;
    setExerciseFeedback(prev => ({
      ...prev,
      [exerciseKey]: {
        ...prev[exerciseKey],
        liked: prev[exerciseKey]?.liked === liked ? undefined : liked
      }
    }));
    
    // Here you could save feedback to Supabase for AI learning
    console.log(`Exercise ${exerciseIndex} ${liked ? 'liked' : 'disliked'}`);
  };

  const handleWeightFeedback = (exerciseIndex: number, feedback: 'light' | 'heavy') => {
    const exerciseKey = `${workoutPlan?.id}-${exerciseIndex}`;
    const currentFeedback = exerciseFeedback[exerciseKey]?.weightFeedback;
    const newFeedback = currentFeedback === feedback ? 'perfect' : feedback;
    
    setExerciseFeedback(prev => ({
      ...prev,
      [exerciseKey]: {
        ...prev[exerciseKey],
        weightFeedback: newFeedback
      }
    }));
    
    // Here you could save weight feedback to Supabase for AI learning
    console.log(`Exercise ${exerciseIndex} weight is ${newFeedback}`);
  };

  const handleExercisePress = (exerciseName: string) => {
    // Find the exercise in the library
    const exercise = exerciseLibrary.exercises.find(ex => 
      ex.name.toLowerCase() === exerciseName.toLowerCase()
    );
    
    if (exercise) {
      // Navigate to library tab and show the specific exercise
      router.push({
        pathname: '/(tabs)/library',
        params: { 
          section: 'exercises',
          exerciseId: exercise.id,
          exerciseName: exercise.name
        }
      });
    } else {
      // Fallback: just navigate to exercises section
      router.push({
        pathname: '/(tabs)/library',
        params: { section: 'exercises' }
      });
    }
  };

  const handleExerciseCompletion = (exerciseIndex: number) => {
    const exerciseKey = `${workoutPlan?.id}-${exerciseIndex}`;
    const isCompleted = !completedExercises[exerciseKey];
    
    setCompletedExercises(prev => ({
      ...prev,
      [exerciseKey]: isCompleted
    }));
    
    // Here you could save completion status to Supabase for AI learning
    console.log(`Exercise ${exerciseIndex} ${isCompleted ? 'completed' : 'uncompleted'}`);
    
    // Calculate calories burned for this exercise (example calculation)
    if (isCompleted && workoutPlan?.exercises[exerciseIndex]) {
      const exercise = workoutPlan.exercises[exerciseIndex];
      const estimatedCalories = calculateExerciseCalories(exercise, user?.dimensions?.weight || 70);
      console.log(`Estimated calories burned: ${estimatedCalories}`);
    }
  };

  const calculateExerciseCalories = (exercise: any, userWeight: number) => {
    // Basic calorie calculation based on exercise type and user weight
    const baseCaloriesPerMinute = {
      'chest': 8,
      'back': 7,
      'shoulders': 6,
      'arms': 5,
      'legs': 10,
      'core': 6,
      'cardio': 12
    };
    
    const category = exercise.targetMuscles?.[0]?.toLowerCase() || 'general';
    const caloriesPerMinute = baseCaloriesPerMinute[category] || 7;
    const estimatedDuration = 3; // Assume 3 minutes per exercise (including rest)
    
    // Adjust for user weight (heavier users burn more calories)
    const weightMultiplier = userWeight / 70; // 70kg as baseline
    
    return Math.round(caloriesPerMinute * estimatedDuration * weightMultiplier);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="My Plan"
        subtitle="Your personalized fitness journey 🎯"
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
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

        {/* AI-Generated Workout Plan */}
        {renderWorkoutContent()}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  dateNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    ...TYPOGRAPHY.labelMedium,
    marginLeft: SPACING.sm,
  },
  workoutCard: {
    marginBottom: SPACING.md,
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
  emptyWorkoutContainer: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyWorkoutTitle: {
    ...TYPOGRAPHY.headingSmall,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  emptyWorkoutText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  generateButton: {
    marginTop: SPACING.md,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  workoutDescription: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  refreshButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primaryLight + '20',
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  workoutStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutStatText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  exercise: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SPACING.sm,
  },
  exerciseHeader: {
    flexDirection: 'column',
    marginBottom: SPACING.xs,
  },
  exerciseNameButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  exerciseName: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.primary,
    flex: 1,
  },
  exerciseViewDetails: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  exerciseDetails: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    alignSelf: 'flex-end',
  },
  exerciseRest: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  exerciseWeight: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.success,
    marginTop: SPACING.xs,
    fontWeight: '600',
  },
  weightContainer: {
    marginTop: SPACING.xs,
  },
  weightFeedback: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  weightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  weightButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  weightButtonText: {
    ...TYPOGRAPHY.labelSmall,
    marginLeft: SPACING.xs,
    color: COLORS.textSecondary,
  },
  weightButtonTextActive: {
    color: COLORS.white,
  },
  exerciseMuscles: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  exerciseFeedback: {
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  feedbackLabel: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  likedButton: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  dislikedButton: {
    backgroundColor: COLORS.error,
    borderColor: COLORS.error,
  },
  feedbackButtonText: {
    ...TYPOGRAPHY.labelSmall,
    marginLeft: SPACING.xs,
    color: COLORS.textSecondary,
  },
  feedbackButtonTextActive: {
    color: COLORS.white,
  },
  caloriesBurned: {
    backgroundColor: COLORS.primaryLight + '20',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.md,
  },
  caloriesBurnedText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primary,
    textAlign: 'center',
  },
  completedExercise: {
    backgroundColor: COLORS.success + '10',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  completionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  completionButtonCompleted: {
    backgroundColor: COLORS.success,
  },
  completionButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.white,
    fontWeight: '600',
  },
  completionButtonTextCompleted: {
    color: COLORS.white,
  },
});