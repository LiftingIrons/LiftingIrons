import { createClient } from '@supabase/supabase-js'

// ✅ Replace these with your real Supabase project details:
const supabaseUrl = 'https://zfbjptlmwbvbtucazrzi.supabase.co'
const supabaseAnonKey = 'sb_publishable_afvGo6Yoc7bKgg1TZ4SrdA_LRfvmPxw'

// ✅ Initialize Supabase client
if (!supabaseUrl) {
  throw new Error('Missing Supabase URL')
}

if (!supabaseAnonKey) {
  throw new Error('Missing Supabase anon key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// -----------------------------
// Types for our database tables
// -----------------------------
export interface UserProfile {
  id: string
  user_id: string
  name: string
  age?: number
  height?: number
  weight?: number
  gender?: string
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'very'
  created_at: string
  updated_at: string
}

export interface FitnessGoals {
  id: string
  user_id: string
  primary_goal: 'weight-loss' | 'muscle-gain' | 'general-fitness' | 'athletic'
  target_weight?: number
  target_date?: string
  dietary_restrictions: string[]
  equipment_access: string[]
  workout_frequency: number
  preferred_workout_duration: number
  created_at: string
  updated_at: string
}

export interface WorkoutPlan {
  id: string
  user_id: string
  title: string
  description?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  exercises: any[]
  calories_burned: number
  plan_date: string
  is_completed: boolean
  ai_generated: boolean
  created_at: string
}

export interface MealPlan {
  id: string
  user_id: string
  title: string
  description?: string
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
  meals: any[]
  plan_date: string
  is_completed: boolean
  ai_generated: boolean
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  weight?: number
  body_fat_percentage?: number
  muscle_mass?: number
  measurements?: any
  progress_photos?: string[]
  notes?: string
  recorded_at: string
}

// -----------------------------
// API functions
// -----------------------------
export const generateWorkoutPlan = async (userId: string, preferences?: any) => {
  const response = await fetch(`${supabaseUrl}/functions/v1/generate-workout-plan`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      preferences,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate workout plan')
  }

  return response.json()
}

export const generateMealPlan = async (userId: string, preferences?: any) => {
  const response = await fetch(`${supabaseUrl}/functions/v1/generate-meal-plan`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      preferences,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate meal plan')
  }

  return response.json()
}

export const saveUserProfile = async (profile: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert(profile)
    .select()
    .single()

  if (error) throw error
  return data
}

export const saveUserGoals = async (goals: Partial<FitnessGoals>) => {
  const { data, error } = await supabase
    .from('fitness_goals')
    .upsert(goals)
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserWorkoutPlans = async (userId: string, date?: string) => {
  let query = supabase
    .from('workout_plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (date) {
    query = query.eq('plan_date', date)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export const getUserMealPlans = async (userId: string, date?: string) => {
  let query = supabase
    .from('meal_plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (date) {
    query = query.eq('plan_date', date)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export const saveUserProgress = async (progress: Partial<UserProgress>) => {
  const { data, error } = await supabase
    .from('user_progress')
    .insert(progress)
    .select()
    .single()

  if (error) throw error
  return data
}
