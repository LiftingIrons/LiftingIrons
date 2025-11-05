/*
  # Fitness App Database Schema

  1. New Tables
    - `user_profiles` - Extended user information beyond auth
    - `fitness_goals` - User's fitness objectives and preferences
    - `workout_plans` - Generated workout plans
    - `meal_plans` - Generated meal plans
    - `user_progress` - Track user's progress over time
    - `plan_feedback` - User feedback on generated plans

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- User Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  age integer,
  height integer, -- in cm
  weight numeric(5,2), -- in kg
  gender text,
  activity_level text CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'very')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Fitness Goals
CREATE TABLE IF NOT EXISTS fitness_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  primary_goal text NOT NULL CHECK (primary_goal IN ('weight-loss', 'muscle-gain', 'general-fitness', 'athletic')),
  target_weight numeric(5,2),
  target_date date,
  dietary_restrictions text[] DEFAULT '{}',
  equipment_access text[] DEFAULT '{}',
  workout_frequency integer DEFAULT 3,
  preferred_workout_duration integer DEFAULT 45, -- in minutes
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Generated Workout Plans
CREATE TABLE IF NOT EXISTS workout_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  difficulty text CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  duration integer, -- in minutes
  exercises jsonb NOT NULL, -- Array of exercise objects
  calories_burned integer,
  plan_date date DEFAULT CURRENT_DATE,
  is_completed boolean DEFAULT false,
  ai_generated boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Generated Meal Plans
CREATE TABLE IF NOT EXISTS meal_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  total_calories integer,
  total_protein numeric(5,2),
  total_carbs numeric(5,2),
  total_fat numeric(5,2),
  meals jsonb NOT NULL, -- Array of meal objects
  plan_date date DEFAULT CURRENT_DATE,
  is_completed boolean DEFAULT false,
  ai_generated boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- User Progress Tracking
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  weight numeric(5,2),
  body_fat_percentage numeric(4,2),
  muscle_mass numeric(5,2),
  measurements jsonb, -- Store various body measurements
  progress_photos text[], -- URLs to progress photos
  notes text,
  recorded_at timestamptz DEFAULT now()
);

-- Plan Feedback for AI Improvement
CREATE TABLE IF NOT EXISTS plan_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type text CHECK (plan_type IN ('workout', 'meal')),
  plan_id uuid, -- References workout_plans.id or meal_plans.id
  rating integer CHECK (rating >= 1 AND rating <= 5),
  feedback_text text,
  difficulty_rating integer CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE fitness_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own goals"
  ON fitness_goals
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own workout plans"
  ON workout_plans
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own meal plans"
  ON meal_plans
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own progress"
  ON user_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own feedback"
  ON plan_feedback
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_fitness_goals_user_id ON fitness_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_plans_user_id ON workout_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_plans_date ON workout_plans(user_id, plan_date);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user_id ON meal_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_date ON meal_plans(user_id, plan_date);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_plan_feedback_user_id ON plan_feedback(user_id);