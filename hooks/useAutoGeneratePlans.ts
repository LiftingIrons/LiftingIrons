import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import {
  generateWorkoutPlan,
  generateMealPlan,
  getUserWorkoutPlans,
  getUserMealPlans,
  supabase,
} from '@/lib/supabase';

type DbGoals = {
  primary_goal?: 'weight-loss' | 'muscle-gain' | 'general-fitness' | 'athletic';
};

type DbProfile = {
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'very';
};

export function useAutoGeneratePlans() {
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    const checkAndGeneratePlans = async () => {
      const today = new Date().toISOString().split('T')[0];

      try {
        // Pull latest profile + goals from DB (instead of user.goals, which doesn't exist on the type)
        const [profileRes, goalsRes] = await Promise.all([
          supabase
            .from('user_profiles')
            .select('activity_level')
            .eq('user_id', user.id)
            .single(),
          supabase
            .from('fitness_goals')
            .select('primary_goal')
            .eq('user_id', user.id)
            .single(),
        ]);

        const profile = (profileRes.data as DbProfile | null) ?? null;
        const goals = (goalsRes.data as DbGoals | null) ?? null;

        const activityLevel = profile?.activity_level ?? 'light';
        const primaryGoal = goals?.primary_goal ?? 'general-fitness';

        // Check if workout plan exists for today
        const workoutPlans = await getUserWorkoutPlans(user.id, today);
        if (!workoutPlans || workoutPlans.length === 0) {
          console.log('Generating daily workout plan...');
          await generateWorkoutPlan(user.id, {
            duration: 45,
            difficulty: activityLevel === 'sedentary' ? 'beginner' : 'intermediate',
            date: today,
          });
        }

        // Check if meal plan exists for today
        const mealPlans = await getUserMealPlans(user.id, today);
        if (!mealPlans || mealPlans.length === 0) {
          console.log('Generating daily meal plan...');
          await generateMealPlan(user.id, {
            calorieTarget:
              primaryGoal === 'weight-loss' ? -500 :
              primaryGoal === 'muscle-gain' ? 500 : 0,
            mealCount: 6, // <-- IMPORTANT: 3 meals + 3 snacks
            date: today,
          });
        }
      } catch (error) {
        console.error('Error auto-generating plans:', error);
      }
    };

    // Generate plans when user logs in
    checkAndGeneratePlans();

    // Set up daily generation at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      checkAndGeneratePlans();

      // Set up daily interval after first midnight trigger
      const intervalId = setInterval(checkAndGeneratePlans, 24 * 60 * 60 * 1000);

      return () => clearInterval(intervalId);
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, [user?.id]);
}
