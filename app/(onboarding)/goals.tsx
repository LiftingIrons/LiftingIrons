import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { Target, TrendingUp, Scale, Heart } from 'lucide-react-native';
import { useUser } from '@/context/UserContext';
import WebSafeTouchableOpacity from '@/components/WebSafeTouchableOpacity';
import {
  generateMealPlan,
  saveUserProfile,
  saveUserGoals,
  supabase,
} from '@/lib/supabase';

type ActivityLevel = 'light' | 'sedentary' | 'moderate' | 'very';
type FitnessGoal = 'weight-loss' | 'muscle-gain' | 'general-fitness' | 'athletic';
type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export default function GoalsScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [sessionChecked, setSessionChecked] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal>();
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>();
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('beginner');

  const [isGeneratingPlans, setIsGeneratingPlans] = useState(false);

  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  const fitnessGoals = [
    { id: 'weight-loss' as const, title: 'Weight Loss', description: 'Burn fat and get lean', icon: Scale },
    { id: 'muscle-gain' as const, title: 'Muscle Gain', description: 'Build muscle mass', icon: TrendingUp },
    { id: 'general-fitness' as const, title: 'General Fitness', description: 'Feel healthier overall', icon: Heart },
    { id: 'athletic' as const, title: 'Athletic Performance', description: 'Boost performance', icon: Target },
  ];

  const activityLevels = [
    { id: 'sedentary' as const, label: 'Sedentary', description: 'Little to no exercise' },
    { id: 'light' as const, label: 'Lightly Active', description: '1–3 days/week' },
    { id: 'moderate' as const, label: 'Moderately Active', description: '3–5 days/week' },
    { id: 'very' as const, label: 'Very Active', description: '6–7 days/week' },
  ];

  const experienceLevels = [
    { id: 'beginner' as const, label: 'Beginner', description: 'New / returning' },
    { id: 'intermediate' as const, label: 'Intermediate', description: '6–24 months training' },
    { id: 'advanced' as const, label: 'Advanced', description: '2+ years consistent' },
  ];

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.replace('/(auth)/sign-up');
        return;
      }
      setSessionChecked(true);
    };
    checkSession();
  }, []);

  const handleGeneratePlans = async () => {
    if (!user?.id || !selectedGoal || !activityLevel) return;
    setIsGeneratingPlans(true);

    try {
      const safeAge = Number(age);
      const safeHeight = Number(height);
      const safeWeight = Number(weight);

      if (!Number.isFinite(safeAge) || safeAge <= 0 || safeAge > 120) {
        Alert.alert('Check your age', 'Please enter a valid age.');
        setIsGeneratingPlans(false);
        return;
      }
      if (!Number.isFinite(safeHeight) || safeHeight <= 0 || safeHeight > 260) {
        Alert.alert('Check your height', 'Please enter height in cm (e.g. 178).');
        setIsGeneratingPlans(false);
        return;
      }
      if (!Number.isFinite(safeWeight) || safeWeight <= 0 || safeWeight > 400) {
        Alert.alert('Check your weight', 'Please enter weight in kg (e.g. 82).');
        setIsGeneratingPlans(false);
        return;
      }

      // 1️⃣ Save profile
      await saveUserProfile({
        user_id: user.id,
        name: user.email ?? '',
        age: safeAge,
        height: safeHeight,
        weight: safeWeight,
        gender,
        activity_level: activityLevel,
      });

      // 2️⃣ Save goals (NOW includes experience_level ✅)
      await saveUserGoals({
        user_id: user.id,
        primary_goal: selectedGoal,
        workout_frequency:
          activityLevel === 'sedentary' ? 2 :
          activityLevel === 'light' ? 3 :
          activityLevel === 'moderate' ? 4 : 5,
        preferred_workout_duration: 45,
        dietary_restrictions: [],
        equipment_access: ['bodyweight', 'gym'],

        // ✅ NEW FIELD (make sure this column exists in Supabase: fitness_goals.experience_level)
        experience_level: experienceLevel,
      });

      // 🧹 3️⃣ DELETE OLD WORKOUT PLANS (so regenerate is always fresh)
      await supabase
        .from('workout_plans')
        .delete()
        .eq('user_id', user.id);

      // 🤖 4️⃣ AI GENERATE WORKOUT
      const { error } = await supabase.functions.invoke('generate-workout', {
        body: { user_id: user.id },
      });

      if (error) {
        console.error('Workout generation failed:', error);
        throw error;
      }

      // 🍽️ 5️⃣ Meal plan
      await generateMealPlan({
        calorieTarget:
          selectedGoal === 'weight-loss' ? -500 :
          selectedGoal === 'muscle-gain' ? 500 : 0,
      });

      // 6️⃣ Go to workouts
      router.replace('/(tabs)/exercise-plan');
    } catch (err) {
      console.error('Onboarding failed:', err);
      Alert.alert(
        'Could not save your details',
        'Please check your connection and try again'
      );
      return;
    } finally {
      setIsGeneratingPlans(false);
    }
  };

  if (!sessionChecked) {
    return <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }} />;
  }

  const canSubmit =
    !!selectedGoal &&
    !!activityLevel &&
    !!age &&
    !!height &&
    !!weight &&
    !!gender;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: SPACING.lg }}>
        <Text style={styles.title}>Your Fitness Goals</Text>

        <TextInput style={styles.input} placeholder="Age" keyboardType="number-pad" value={age} onChangeText={setAge} />
        <TextInput style={styles.input} placeholder="Height (cm)" keyboardType="number-pad" value={height} onChangeText={setHeight} />
        <TextInput style={styles.input} placeholder="Weight (kg)" keyboardType="number-pad" value={weight} onChangeText={setWeight} />
        <TextInput style={styles.input} placeholder="Gender" value={gender} onChangeText={setGender} />

        <Text style={styles.sectionHeader}>Goal</Text>
        <View style={styles.goalsGrid}>
          {fitnessGoals.map(goal => (
            <WebSafeTouchableOpacity
              key={goal.id}
              style={[styles.goalCard, selectedGoal === goal.id && styles.selectedCard]}
              onPress={() => setSelectedGoal(goal.id)}
            >
              <goal.icon size={24} color={selectedGoal === goal.id ? COLORS.white : COLORS.primary} />
              <Text style={[styles.cardTitle, selectedGoal === goal.id && styles.cardTitleSelected]}>
                {goal.title}
              </Text>
              <Text style={[styles.cardDesc, selectedGoal === goal.id && styles.cardDescSelected]}>
                {goal.description}
              </Text>
            </WebSafeTouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionHeader}>Activity level</Text>
        <View style={styles.activityContainer}>
          {activityLevels.map(level => (
            <WebSafeTouchableOpacity
              key={level.id}
              style={[styles.activityButton, activityLevel === level.id && styles.selectedCard]}
              onPress={() => setActivityLevel(level.id)}
            >
              <Text style={[styles.activityLabel, activityLevel === level.id && styles.activityLabelSelected]}>
                {level.label}
              </Text>
              <Text style={[styles.activityDesc, activityLevel === level.id && styles.activityDescSelected]}>
                {level.description}
              </Text>
            </WebSafeTouchableOpacity>
          ))}
        </View>

        {/* ✅ NEW: Experience */}
        <Text style={styles.sectionHeader}>Experience</Text>
        <View style={styles.activityContainer}>
          {experienceLevels.map(level => (
            <WebSafeTouchableOpacity
              key={level.id}
              style={[styles.activityButton, experienceLevel === level.id && styles.selectedCard]}
              onPress={() => setExperienceLevel(level.id)}
            >
              <Text style={[styles.activityLabel, experienceLevel === level.id && styles.activityLabelSelected]}>
                {level.label}
              </Text>
              <Text style={[styles.activityDesc, experienceLevel === level.id && styles.activityDescSelected]}>
                {level.description}
              </Text>
            </WebSafeTouchableOpacity>
          ))}
        </View>

        <Button
          title={isGeneratingPlans ? 'Generating workout…' : 'Generate My Workout'}
          onPress={handleGeneratePlans}
          loading={isGeneratingPlans}
          disabled={!canSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { ...TYPOGRAPHY.displayMedium, marginBottom: SPACING.lg },

  sectionHeader: {
    ...TYPOGRAPHY.headingSmall,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },

  goalsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },

  goalCard: {
    width: '47%',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  selectedCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  cardTitle: {
    marginTop: 8,
    fontWeight: '800',
    color: COLORS.text,
  },
  cardTitleSelected: {
    color: COLORS.white,
  },
  cardDesc: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  cardDescSelected: {
    color: 'rgba(255,255,255,0.85)',
  },

  activityContainer: { marginTop: SPACING.sm },

  activityButton: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  activityLabel: { fontWeight: '800', color: COLORS.text },
  activityLabelSelected: { color: COLORS.white },

  activityDesc: { marginTop: 4, color: COLORS.textSecondary, fontSize: 12 },
  activityDescSelected: { color: 'rgba(255,255,255,0.85)' },

  input: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
