import { createClient } from '@supabase/supabase-js'

// ✅ Replace these with your real Supabase project details:
const supabaseUrl = 'https://zfbjptlmwbvbtucazrzi.supabase.co';
const supabaseAnonKey = 'sb_publishable_afvGo6Yoc7bKgg1TZ4SrdA_LRfvmPxw';

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
  experience_level?: 'beginner' | 'intermediate' | 'advanced'
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
  week_start?: string
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
// Helper: get JWT (access token)
// -----------------------------
async function getAccessToken() {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) throw sessionError

  const accessToken = sessionData.session?.access_token
  if (!accessToken) throw new Error('No active session. Please log in again.')

  return accessToken
}

// -----------------------------
// Helper: fetch with timeout (prevents infinite spinner)
// -----------------------------
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 60_000
) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    return res
  } catch (err: any) {
    // AbortController throws a DOMException in many runtimes
    if (err?.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms`)
    }
    throw err
  } finally {
    clearTimeout(id)
  }
}

// -----------------------------
// API functions
// -----------------------------
export const generateWorkoutPlan = async (preferences?: any) => {
  const accessToken = await getAccessToken()

  const response = await fetchWithTimeout(
    `${supabaseUrl}/functions/v1/generate-workout-plan`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`, // ✅ user JWT (secure)
        apikey: supabaseAnonKey,                // ✅ ok to include (some setups require it)
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // ✅ do NOT send userId; function should read it from JWT
        preferences,
      }),
    },
    90_000 // workouts can take longer
  )

  const text = await response.text()

  if (!response.ok) {
    console.error('generate-workout-plan failed:', response.status, text)
    throw new Error(`Workout plan failed (${response.status}): ${text}`)
  }

  return JSON.parse(text)
}

export const generateMealPlan = async (preferences?: any) => {
  const accessToken = await getAccessToken()

  // ✅ this is what your meal-plan.tsx passes
  const date = preferences?.date

  const response = await fetchWithTimeout(
    `${supabaseUrl}/functions/v1/generate-meal-plan`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`, // ✅ real user JWT
        apikey: supabaseAnonKey,                // ✅ ok to include
        'Content-Type': 'application/json',
      },
      // ✅ send date top-level so function saves correct day
      body: JSON.stringify({ date, preferences }),
    },
    90_000 // meals can also take a while
  )

  const text = await response.text()

  if (!response.ok) {
    console.error('generate-meal-plan failed:', response.status, text)
    throw new Error(`Meal plan failed (${response.status}): ${text}`)
  }

  return JSON.parse(text)
}

// ✅ NEW: Generate a full week (Sunday–Saturday) in one request
export const generateMealWeek = async (preferences?: any) => {
  const accessToken = await getAccessToken()

  const date = preferences?.date

  const response = await fetchWithTimeout(
    `${supabaseUrl}/functions/v1/generate-meal-week`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: supabaseAnonKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, preferences }),
    },
    120_000 // week can take longer
  )

  const text = await response.text()

  if (!response.ok) {
    console.error('generate-meal-week failed:', response.status, text)
    throw new Error(`Meal week failed (${response.status}): ${text}`)
  }

  return JSON.parse(text)
}

export const saveUserProfile = async (profile: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert(profile, { onConflict: 'user_id' })
    .select()
    .single()

  if (error) throw error
  return data
}

export const saveUserGoals = async (goals: Partial<FitnessGoals>) => {
  const { data, error } = await supabase
    .from('fitness_goals')
    .upsert(goals, { onConflict: 'user_id' })
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
