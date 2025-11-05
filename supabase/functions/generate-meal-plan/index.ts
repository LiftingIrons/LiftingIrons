import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface MealRequest {
  userId: string;
  date?: string;
  preferences?: {
    dietaryRestrictions?: string[];
    calorieTarget?: number;
    mealCount?: number;
  };
}

interface Meal {
  name: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients?: string[];
  instructions?: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { userId, date, preferences }: MealRequest = await req.json()

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

    // Generate meal plan based on user's goals and preferences
    const mealPlan = generateMealPlan(profile, goals, preferences)

    // Save the generated meal plan
    const { data: savedPlan, error } = await supabase
      .from('meal_plans')
      .insert({
        user_id: userId,
        title: mealPlan.title,
        description: mealPlan.description,
        total_calories: mealPlan.totalCalories,
        total_protein: mealPlan.totalProtein,
        total_carbs: mealPlan.totalCarbs,
        total_fat: mealPlan.totalFat,
        meals: mealPlan.meals,
        plan_date: date || new Date().toISOString().split('T')[0],
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, mealPlan: savedPlan }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function generateMealPlan(profile: any, goals: any, preferences?: any) {
  const { primary_goal, dietary_restrictions } = goals
  const { weight, height, age, gender, activity_level } = profile

  // Calculate BMR (Basal Metabolic Rate)
  let bmr = 0
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
  }

  // Apply activity multiplier
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725
  }
  
  let tdee = bmr * (activityMultipliers[activity_level] || 1.375)

  // Adjust calories based on goal
  let targetCalories = tdee
  let proteinRatio = 0.25
  let carbRatio = 0.45
  let fatRatio = 0.30

  switch (primary_goal) {
    case 'weight-loss':
      targetCalories = tdee * 0.8 // 20% deficit
      proteinRatio = 0.35 // Higher protein for muscle preservation
      carbRatio = 0.35
      fatRatio = 0.30
      break
    case 'muscle-gain':
      targetCalories = tdee * 1.15 // 15% surplus
      proteinRatio = 0.30 // High protein for muscle building
      carbRatio = 0.45
      fatRatio = 0.25
      break
    default:
      targetCalories = tdee // Maintenance
  }

  const targetProtein = Math.round((targetCalories * proteinRatio) / 4) // 4 calories per gram
  const targetCarbs = Math.round((targetCalories * carbRatio) / 4)
  const targetFat = Math.round((targetCalories * fatRatio) / 9) // 9 calories per gram

  let meals: Meal[] = []
  let title = ''
  let description = ''

  switch (primary_goal) {
    case 'weight-loss':
      title = 'Weight Loss Meal Plan'
      description = 'High-protein, nutrient-dense meals to support fat loss while preserving muscle'
      
      meals = [
        {
          name: 'Breakfast',
          food: 'Protein Oatmeal with Berries',
          calories: Math.round(targetCalories * 0.20),
          protein: Math.round(targetProtein * 0.25),
          carbs: Math.round(targetCarbs * 0.30),
          fat: Math.round(targetFat * 0.15),
          ingredients: ['1/2 cup oats', '1 scoop protein powder', '1/2 cup berries', '1 tbsp almond butter'],
          instructions: ['Cook oats with water', 'Mix in protein powder', 'Top with berries and almond butter']
        },
        {
          name: 'Lunch',
          food: 'Grilled Chicken Salad',
          calories: Math.round(targetCalories * 0.25),
          protein: Math.round(targetProtein * 0.35),
          carbs: Math.round(targetCarbs * 0.20),
          fat: Math.round(targetFat * 0.30),
          ingredients: ['6oz grilled chicken breast', '2 cups mixed greens', '1/4 avocado', '2 tbsp olive oil vinaigrette'],
          instructions: ['Grill chicken breast', 'Toss greens with dressing', 'Top with chicken and avocado']
        },
        {
          name: 'Dinner',
          food: 'Baked Salmon with Vegetables',
          calories: Math.round(targetCalories * 0.30),
          protein: Math.round(targetProtein * 0.30),
          carbs: Math.round(targetCarbs * 0.25),
          fat: Math.round(targetFat * 0.40),
          ingredients: ['6oz salmon fillet', '2 cups roasted vegetables', '1 tbsp olive oil'],
          instructions: ['Season and bake salmon at 400°F for 15 minutes', 'Roast vegetables with olive oil']
        },
        {
          name: 'Snacks',
          food: 'Greek Yogurt with Almonds',
          calories: Math.round(targetCalories * 0.25),
          protein: Math.round(targetProtein * 0.10),
          carbs: Math.round(targetCarbs * 0.25),
          fat: Math.round(targetFat * 0.15),
          ingredients: ['1 cup Greek yogurt', '1oz almonds', '1 tsp honey'],
          instructions: ['Mix yogurt with honey', 'Top with almonds']
        }
      ]
      break

    case 'muscle-gain':
      title = 'Muscle Building Meal Plan'
      description = 'High-calorie, protein-rich meals to support muscle growth and recovery'
      
      meals = [
        {
          name: 'Breakfast',
          food: 'Protein Pancakes with Banana',
          calories: Math.round(targetCalories * 0.20),
          protein: Math.round(targetProtein * 0.25),
          carbs: Math.round(targetCarbs * 0.25),
          fat: Math.round(targetFat * 0.20),
          ingredients: ['2 scoops protein powder', '1 banana', '2 eggs', '1/4 cup oats', '1 tbsp peanut butter'],
          instructions: ['Blend all ingredients', 'Cook like pancakes', 'Top with peanut butter']
        },
        {
          name: 'Lunch',
          food: 'Turkey and Rice Bowl',
          calories: Math.round(targetCalories * 0.25),
          protein: Math.round(targetProtein * 0.30),
          carbs: Math.round(targetCarbs * 0.35),
          fat: Math.round(targetFat * 0.20),
          ingredients: ['8oz ground turkey', '1.5 cups brown rice', '1 cup vegetables', '1 tbsp olive oil'],
          instructions: ['Cook turkey with vegetables', 'Serve over rice', 'Drizzle with olive oil']
        },
        {
          name: 'Dinner',
          food: 'Steak with Sweet Potato',
          calories: Math.round(targetCalories * 0.30),
          protein: Math.round(targetProtein * 0.35),
          carbs: Math.round(targetCarbs * 0.25),
          fat: Math.round(targetFat * 0.35),
          ingredients: ['8oz lean steak', '1 large sweet potato', '2 cups green vegetables', '1 tbsp butter'],
          instructions: ['Grill steak to preference', 'Bake sweet potato', 'Sauté vegetables in butter']
        },
        {
          name: 'Snacks',
          food: 'Protein Shake and Trail Mix',
          calories: Math.round(targetCalories * 0.25),
          protein: Math.round(targetProtein * 0.10),
          carbs: Math.round(targetCarbs * 0.15),
          fat: Math.round(targetFat * 0.25),
          ingredients: ['1 scoop protein powder', '1 cup milk', '1oz trail mix'],
          instructions: ['Blend protein with milk', 'Enjoy with trail mix']
        }
      ]
      break

    default: // general-fitness
      title = 'Balanced Nutrition Plan'
      description = 'Well-rounded meals to support overall health and fitness goals'
      
      meals = [
        {
          name: 'Breakfast',
          food: 'Scrambled Eggs with Toast',
          calories: Math.round(targetCalories * 0.20),
          protein: Math.round(targetProtein * 0.25),
          carbs: Math.round(targetCarbs * 0.25),
          fat: Math.round(targetFat * 0.25),
          ingredients: ['3 eggs', '2 slices whole grain toast', '1 tbsp butter', '1 cup spinach'],
          instructions: ['Scramble eggs with spinach', 'Toast bread', 'Serve together']
        },
        {
          name: 'Lunch',
          food: 'Tuna Sandwich',
          calories: Math.round(targetCalories * 0.25),
          protein: Math.round(targetProtein * 0.30),
          carbs: Math.round(targetCarbs * 0.30),
          fat: Math.round(targetFat * 0.25),
          ingredients: ['1 can tuna', '2 slices bread', '1 tbsp mayo', 'lettuce, tomato'],
          instructions: ['Mix tuna with mayo', 'Assemble sandwich with vegetables']
        },
        {
          name: 'Dinner',
          food: 'Chicken Stir-Fry',
          calories: Math.round(targetCalories * 0.30),
          protein: Math.round(targetProtein * 0.35),
          carbs: Math.round(targetCarbs * 0.30),
          fat: Math.round(targetFat * 0.30),
          ingredients: ['6oz chicken breast', '2 cups mixed vegetables', '1 cup brown rice', '2 tbsp oil'],
          instructions: ['Stir-fry chicken and vegetables', 'Serve over rice']
        },
        {
          name: 'Snacks',
          food: 'Fruit and Nuts',
          calories: Math.round(targetCalories * 0.25),
          protein: Math.round(targetProtein * 0.10),
          carbs: Math.round(targetCarbs * 0.15),
          fat: Math.round(targetFat * 0.20),
          ingredients: ['1 apple', '1oz mixed nuts', '1 string cheese'],
          instructions: ['Enjoy apple with nuts and cheese']
        }
      ]
  }

  return {
    title,
    description,
    totalCalories: Math.round(targetCalories),
    totalProtein: targetProtein,
    totalCarbs: targetCarbs,
    totalFat: targetFat,
    meals
  }
}