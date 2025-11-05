import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { Target, TrendingUp, Scale, Heart } from 'lucide-react-native';
import { useUser } from '@/context/UserContext';
import WebSafeTouchableOpacity from '@/components/WebSafeTouchableOpacity';
import { generateWorkoutPlan, generateMealPlan, saveUserProfile, saveUserGoals } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

const fitnessGoals = [
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    description: 'Burn fat and achieve a leaner physique',
    icon: Scale,
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Gain',
    description: 'Build strength and increase muscle mass',
    icon: TrendingUp,
  },
  {
    id: 'general-fitness',
    title: 'General Fitness',
    description: 'Improve overall health and wellness',
    icon: Heart,
  },
  {
    id: 'athletic',
    title: 'Athletic Performance',
    description: 'Enhance speed, agility, and power',
    icon: Target,
  },
];

export default function GoalsScreen() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [activityLevel, setActivityLevel] = useState(null);
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [isGeneratingPlans, setIsGeneratingPlans] = useState(false);

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { id: 'light', label: 'Lightly Active', description: '1-3 days/week' },
    { id: 'moderate', label: 'Moderately Active', description: '3-5 days/week' },
    { id: 'very', label: 'Very Active', description: '6-7 days/week' },
  ];

  const handleContinue = () => {
    if (selectedGoal && activityLevel) {
      setShowReviewScreen(true);
    }
  };

  const handleGeneratePlans = async () => {
    if (selectedGoal && activityLevel) {
      setIsGeneratingPlans(true);
      
      try {
        // First, create Supabase auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: user?.email || '',
          password: 'temp-password-123', // In production, use the actual password from sign-up
          options: {
            emailRedirectTo: undefined, // Disable email confirmation
          }
        });

        if (authError) {
          console.error('Auth error:', authError);
          throw authError;
        }

        const userId = authData.user?.id;
        if (!userId) {
          throw new Error('Failed to create user account');
        }

        // Save user profile to database
        await saveUserProfile({
          user_id: userId,
          name: user?.name || '',
          age: user?.dimensions?.age,
          height: user?.dimensions?.height,
          weight: user?.dimensions?.weight,
          gender: user?.dimensions?.gender,
          activity_level: activityLevel as any,
        });

        // Save user goals to database
        await saveUserGoals({
          user_id: userId,
          primary_goal: selectedGoal as any,
          workout_frequency: activityLevel === 'sedentary' ? 2 : 
                           activityLevel === 'light' ? 3 :
                           activityLevel === 'moderate' ? 4 : 5,
          preferred_workout_duration: 45,
          dietary_restrictions: [],
          equipment_access: ['bodyweight'],
        });

        // Update user context with complete data including Supabase ID
        const updatedUser = {
          ...user,
          id: userId,
          goals: {
            primary: selectedGoal,
            activityLevel: activityLevel
          }
        };
        
        setUser(updatedUser);
        
        // Generate AI plans
        const workoutResponse = await generateWorkoutPlan(userId, {
          duration: 45,
          difficulty: activityLevel === 'sedentary' ? 'beginner' : 'intermediate'
        });
        
        const mealResponse = await generateMealPlan(userId, {
          calorieTarget: selectedGoal === 'weight-loss' ? -500 : 
                        selectedGoal === 'muscle-gain' ? 500 : 0
        });
        
        console.log('Generated workout plan:', workoutResponse);
        console.log('Generated meal plan:', mealResponse);
        
        router.replace('/(tabs)');
      } catch (error) {
        console.error('Error generating plans:', error);
        // Still navigate to app even if plan generation fails
        router.replace('/(tabs)');
      } finally {
        setIsGeneratingPlans(false);
      }
    }
  };

  const handleCompleteOld = () => {
    if (selectedGoal && activityLevel) {
      setUser({
        ...user,
        goals: {
          primary: selectedGoal,
          activityLevel: activityLevel
        }
      });
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showReviewScreen ? (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Your Fitness Goals</Text>
          <Text style={styles.subtitle}>
            Let's customize your experience based on what you want to achieve
          </Text>

          <Text style={styles.sectionTitle}>Primary Goal</Text>
          <View style={styles.goalsGrid}>
            {fitnessGoals.map((goal) => (
              <WebSafeTouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  selectedGoal === goal.id && styles.selectedGoalCard,
                ]}
                onPress={() => setSelectedGoal(goal.id)}
              >
                <View style={styles.goalIcon}>
                  <goal.icon
                    size={24}
                    color={selectedGoal === goal.id ? COLORS.white : COLORS.primary}
                  />
                </View>
                <Text style={[
                  styles.goalTitle,
                  selectedGoal === goal.id && styles.selectedGoalText
                ]}>
                  {goal.title}
                </Text>
                <Text style={[
                  styles.goalDescription,
                  selectedGoal === goal.id && styles.selectedGoalText
                ]}>
                  {goal.description}
                </Text>
              </WebSafeTouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Activity Level</Text>
          <View style={styles.activityContainer}>
            {activityLevels.map((level) => (
              <WebSafeTouchableOpacity
                key={level.id}
                style={[
                  styles.activityButton,
                  activityLevel === level.id && styles.selectedActivityButton,
                ]}
                onPress={() => setActivityLevel(level.id)}
              >
                <Text style={[
                  styles.activityLabel,
                  activityLevel === level.id && styles.selectedActivityText
                ]}>
                  {level.label}
                </Text>
                <Text style={[
                  styles.activityDescription,
                  activityLevel === level.id && styles.selectedActivityText
                ]}>
                  {level.description}
                </Text>
              </WebSafeTouchableOpacity>
            ))}
          </View>

          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="large"
            fullWidth
            style={styles.button}
            disabled={!selectedGoal || !activityLevel}
          />
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Review Your Details</Text>
          <Text style={styles.subtitle}>
            Check your information before we generate your personalized plans
          </Text>

          {/* Personal Info */}
          <View style={styles.reviewSection}>
            <Text style={styles.reviewSectionTitle}>Personal Information</Text>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Name:</Text>
              <Text style={styles.reviewValue}>{user?.name}</Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Email:</Text>
              <Text style={styles.reviewValue}>{user?.email}</Text>
            </View>
          </View>

          {/* Body Measurements */}
          <View style={styles.reviewSection}>
            <Text style={styles.reviewSectionTitle}>Body Measurements</Text>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Age:</Text>
              <Text style={styles.reviewValue}>{user?.dimensions?.age} years</Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Height:</Text>
              <Text style={styles.reviewValue}>{user?.dimensions?.height} cm</Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Weight:</Text>
              <Text style={styles.reviewValue}>{user?.dimensions?.weight} kg</Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Gender:</Text>
              <Text style={styles.reviewValue}>{user?.dimensions?.gender}</Text>
            </View>
          </View>

          {/* Fitness Goals */}
          <View style={styles.reviewSection}>
            <Text style={styles.reviewSectionTitle}>Fitness Goals</Text>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Primary Goal:</Text>
              <Text style={styles.reviewValue}>
                {fitnessGoals.find(g => g.id === selectedGoal)?.title}
              </Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Activity Level:</Text>
              <Text style={styles.reviewValue}>
                {activityLevels.find(l => l.id === activityLevel)?.label}
              </Text>
            </View>
          </View>

          {/* AI Generation Info */}
          <View style={styles.aiInfoCard}>
            <Text style={styles.aiInfoTitle}>🤖 AI Will Generate:</Text>
            <Text style={styles.aiInfoItem}>• Personalized workout plan based on your goals</Text>
            <Text style={styles.aiInfoItem}>• Custom meal plan with calculated calories</Text>
            <Text style={styles.aiInfoItem}>• Exercise instructions and progressions</Text>
            <Text style={styles.aiInfoItem}>• Macro-balanced nutrition recommendations</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Back to Edit"
              onPress={() => setShowReviewScreen(false)}
              variant="outline"
              size="large"
              style={styles.backButton}
            />
            <Button
              title={isGeneratingPlans ? "Generating Plans..." : "Generate My Plans"}
              onPress={handleGeneratePlans}
              variant="primary"
              size="large"
              style={styles.generateButton}
              disabled={isGeneratingPlans}
              loading={isGeneratingPlans}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.displayMedium,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.headingMedium,
    marginBottom: SPACING.md,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  goalCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedGoalCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  goalTitle: {
    ...TYPOGRAPHY.labelMedium,
    marginBottom: SPACING.xs,
  },
  goalDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  selectedGoalText: {
    color: COLORS.white,
  },
  activityContainer: {
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  activityButton: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedActivityButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  activityLabel: {
    ...TYPOGRAPHY.labelMedium,
    marginBottom: 2,
  },
  activityDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  selectedActivityText: {
    color: COLORS.white,
  },
  button: {
    marginTop: SPACING.md,
  },
  reviewSection: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  reviewSectionTitle: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  reviewLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  reviewValue: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '500',
  },
  aiInfoCard: {
    backgroundColor: COLORS.primaryLight + '20',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  aiInfoTitle: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  aiInfoItem: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  backButton: {
    flex: 1,
  },
  generateButton: {
    flex: 2,
  },
});