import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface WorkoutRequest {
  userId: string;
  date?: string;
  preferences?: {
    duration?: number;
    difficulty?: string;
    focusAreas?: string[];
  };
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  duration?: string;
  restTime?: string;
  instructions?: string[];
  targetMuscles?: string[];
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { userId, date, preferences }: WorkoutRequest = await req.json()

    // Get user profile and goals
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    const { data: goals } = await supabase
      .from('fitness_goals')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (!profile || !goals) {
      return new Response(
        JSON.stringify({ error: 'User profile or goals not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate workout based on user's goals and preferences
    const workout = generateWorkoutPlan(profile, goals, preferences)

    // Save the generated workout plan
    const { data: savedPlan, error } = await supabase
      .from('workout_plans')
      .insert({
        user_id: userId,
        title: workout.title,
        description: workout.description,
        difficulty: workout.difficulty,
        duration: workout.duration,
        exercises: workout.exercises,
        calories_burned: workout.caloriesBurned,
        plan_date: date || new Date().toISOString().split('T')[0],
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, workout: savedPlan }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error?.message ?? String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function generateWorkoutPlan(profile: any, goals: any, preferences?: any) {
  const { primary_goal, workout_frequency, preferred_workout_duration } = goals
  const { activity_level, age } = profile
  const duration = preferences?.duration || preferred_workout_duration || 45

  let exercises: Exercise[] = []
  let title = ''
  let description = ''
  let difficulty = 'intermediate'
  let caloriesBurned = 0

  switch (primary_goal) {
    case 'weight-loss':
      title = 'Fat Burning HIIT Circuit'
      description = 'High-intensity interval training designed to maximize calorie burn'
      difficulty = activity_level === 'sedentary' ? 'beginner' : 'intermediate'
      caloriesBurned = Math.round(duration * 8) // ~8 calories per minute for HIIT
      
      exercises = [
        {
          name: 'Burpees',
          sets: 3,
          reps: '12 reps',
          restTime: '30 seconds',
          instructions: ['Start standing', 'Drop to squat', 'Jump back to plank', 'Do push-up', 'Jump feet to squat', 'Jump up with arms overhead'],
          targetMuscles: ['Full body', 'Cardio']
        },
        {
          name: 'Mountain Climbers',
          sets: 3,
          reps: '30 seconds',
          restTime: '30 seconds',
          instructions: ['Start in plank position', 'Alternate bringing knees to chest rapidly', 'Keep core tight'],
          targetMuscles: ['Core', 'Cardio', 'Shoulders']
        },
        {
          name: 'Jump Squats',
          sets: 3,
          reps: '15 reps',
          restTime: '45 seconds',
          instructions: ['Stand with feet shoulder-width apart', 'Lower into squat', 'Explode up jumping', 'Land softly'],
          targetMuscles: ['Legs', 'Glutes', 'Cardio']
        },
        {
          name: 'Push-Up to T',
          sets: 3,
          reps: '10 reps',
          restTime: '45 seconds',
          instructions: ['Do a push-up', 'At top, rotate to side plank', 'Extend top arm up', 'Return to start'],
          targetMuscles: ['Chest', 'Core', 'Shoulders']
        },
        {
          name: 'High Knees',
          sets: 3,
          reps: '30 seconds',
          restTime: '30 seconds',
          instructions: ['Run in place', 'Bring knees up to hip level', 'Pump arms actively'],
          targetMuscles: ['Cardio', 'Legs', 'Core']
        }
      ]
      break

    case 'muscle-gain':
      title = 'Strength Building Workout'
      description = 'Progressive overload training to build muscle mass and strength'
      difficulty = activity_level === 'sedentary' ? 'beginner' : 'advanced'
      caloriesBurned = Math.round(duration * 6) // ~6 calories per minute for strength training
      
      exercises = [
        {
          name: 'Push-Ups (or Chest Press)',
          sets: 4,
          reps: '8-12 reps',
          restTime: '90 seconds',
          instructions: ['Keep body straight', 'Lower chest to ground', 'Push up explosively', 'Control the descent'],
          targetMuscles: ['Chest', 'Triceps', 'Shoulders']
        },
        {
          name: 'Bodyweight Rows (or Bent-Over Rows)',
          sets: 4,
          reps: '8-12 reps',
          restTime: '90 seconds',
          instructions: ['Pull chest to bar/weight', 'Squeeze shoulder blades', 'Control the negative'],
          targetMuscles: ['Back', 'Biceps', 'Rear delts']
        },
        {
          name: 'Squats',
          sets: 4,
          reps: '10-15 reps',
          restTime: '2 minutes',
          instructions: ['Feet shoulder-width apart', 'Lower until thighs parallel', 'Drive through heels', 'Keep chest up'],
          targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings']
        },
        {
          name: 'Pike Push-Ups (or Shoulder Press)',
          sets: 4,
          reps: '8-12 reps',
          restTime: '90 seconds',
          instructions: ['Start in downward dog', 'Lower head toward ground', 'Press back up', 'Keep legs straight'],
          targetMuscles: ['Shoulders', 'Triceps', 'Upper chest']
        },
        {
          name: 'Single-Leg Deadlifts',
          sets: 3,
          reps: '8 each leg',
          restTime: '90 seconds',
          instructions: ['Stand on one leg', 'Hinge at hip', 'Reach toward ground', 'Return to standing'],
          targetMuscles: ['Hamstrings', 'Glutes', 'Core']
        }
      ]
      break

    default: // general-fitness or athletic
      title = 'Full Body Functional Workout'
      description = 'Balanced workout targeting all major muscle groups and movement patterns'
      difficulty = 'intermediate'
      caloriesBurned = Math.round(duration * 7) // ~7 calories per minute
      
      exercises = [
        {
          name: 'Push-Ups',
          sets: 3,
          reps: '10-15 reps',
          restTime: '60 seconds',
          instructions: ['Keep body straight', 'Lower chest to ground', 'Push up smoothly'],
          targetMuscles: ['Chest', 'Triceps', 'Core']
        },
        {
          name: 'Bodyweight Squats',
          sets: 3,
          reps: '15-20 reps',
          restTime: '60 seconds',
          instructions: ['Feet shoulder-width apart', 'Lower until thighs parallel', 'Stand up smoothly'],
          targetMuscles: ['Legs', 'Glutes']
        },
        {
          name: 'Plank',
          sets: 3,
          reps: '30-60 seconds',
          restTime: '60 seconds',
          instructions: ['Hold straight line from head to heels', 'Keep core tight', 'Breathe normally'],
          targetMuscles: ['Core', 'Shoulders']
        },
        {
          name: 'Lunges',
          sets: 3,
          reps: '12 each leg',
          restTime: '60 seconds',
          instructions: ['Step forward into lunge', 'Lower back knee toward ground', 'Push back to start'],
          targetMuscles: ['Legs', 'Glutes', 'Core']
        },
        {
          name: 'Glute Bridges',
          sets: 3,
          reps: '15-20 reps',
          restTime: '45 seconds',
          instructions: ['Lie on back, knees bent', 'Lift hips up', 'Squeeze glutes at top', 'Lower slowly'],
          targetMuscles: ['Glutes', 'Hamstrings', 'Core']
        }
      ]
  }

  return {
    title,
    description,
    difficulty,
    duration,
    exercises,
    caloriesBurned
  }
}