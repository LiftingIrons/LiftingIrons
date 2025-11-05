import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { generateWorkoutPlan, generateMealPlan, getUserWorkoutPlans, getUserMealPlans } from '@/lib/supabase';

export function useAutoGeneratePlans() {
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    const checkAndGeneratePlans = async () => {
      const today = new Date().toISOString().split('T')[0];
      
      try {
        // Check if workout plan exists for today
        const workoutPlans = await getUserWorkoutPlans(user.id, today);
        if (!workoutPlans || workoutPlans.length === 0) {
          console.log('Generating daily workout plan...');
          await generateWorkoutPlan(user.id, {
            duration: 45,
            difficulty: user.goals?.activityLevel === 'sedentary' ? 'beginner' : 'intermediate',
            date: today,
          });
        }

        // Check if meal plan exists for today
        const mealPlans = await getUserMealPlans(user.id, today);
        if (!mealPlans || mealPlans.length === 0) {
          console.log('Generating daily meal plan...');
          await generateMealPlan(user.id, {
            calorieTarget: user.goals?.primary === 'weight-loss' ? -500 : 
                         user.goals?.primary === 'muscle-gain' ? 500 : 0,
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
  }, [user?.id, user?.goals]);
}