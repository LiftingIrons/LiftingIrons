import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function localDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function round(n: number) {
  return Math.round(n);
}
function clampInt(n: number, min: number, max: number) {
  return round(clamp(n, min, max));
}

function getGoalDefaults(goal: string) {
  if (goal === "weight-loss") return { calories: 1900, protein: 160 };
  if (goal === "muscle-gain") return { calories: 2600, protein: 190 };
  if (goal === "athletic") return { calories: 2400, protein: 175 };
  return { calories: 2200, protein: 170 };
}

function macroTargets(totalCalories: number, proteinTarget: number) {
  const protein = clampInt(proteinTarget, 80, 320);
  const proteinCals = protein * 4;
  const fatCals = totalCalories * 0.25;
  const fat = clampInt(fatCals / 9, 30, 140);
  const carbCals = totalCalories - proteinCals - fat * 9;
  const carbs = clampInt(carbCals / 4, 60, 600);
  return { protein, carbs, fat };
}

async function openAIResponseJSON(params) {
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: params.model,

      // ✅ simplest input format (avoids input_text/type issues)
      input: [
        { role: "system", content: params.system },
        { role: "user", content: params.user },
      ],

      // ✅ NEW structured output format
      text: {
        format: {
          type: "json_schema",
          name: "meal_plan",      // ✅ REQUIRED (this is what your error asked for)
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              totalCalories: { type: "number" },
              totalProtein: { type: "number" },
              totalCarbs: { type: "number" },
              totalFat: { type: "number" },
              meals: {
                type: "array",
                minItems: 1,
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    name: { type: "string" },
                    food: { type: "string" },
                    calories: { type: "number" },
                    protein: { type: "number" },
                    carbs: { type: "number" },
                    fat: { type: "number" },
                    instructions: { type: "string" },
                  },
                  required: [
                    "name",
                    "food",
                    "calories",
                    "protein",
                    "carbs",
                    "fat",
                    "instructions",
                  ],
                },
              },
            },
            required: [
              "title",
              "description",
              "totalCalories",
              "totalProtein",
              "totalCarbs",
              "totalFat",
              "meals",
            ],
          },
        },
      },

    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`OpenAI error ${res.status}: ${t}`);
  }

  const json = await res.json();

  // Output helper commonly present:
  const out = typeof json.output_text === "string" ? json.output_text : "";
  if (!out) throw new Error("OpenAI returned empty output_text");

  try {
    return JSON.parse(out);
  } catch {
    throw new Error(`Failed to parse OpenAI JSON. First 400 chars: ${out.slice(0, 400)}`);
  }
}




Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing SUPABASE_URL or SUPABASE_ANON_KEY" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing OPENAI_API_KEY secret" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ✅ OPTION A: require a real user JWT
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing Authorization Bearer token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ✅ Create client that forwards user's JWT (RLS-safe)
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    // ✅ Get the real user from the JWT (do NOT trust body.userId)
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JWT / not logged in" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const userId = userData.user.id;

    const body = await req.json().catch(() => null);
    if (!body) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const preferences = body.preferences ?? {};
    const date = body.date ?? preferences.date ?? localDateKey(new Date());
    const mealCount = Number(preferences.mealCount ?? 6);

    console.log("generate-meal-plan called", { userId, date, mealCount });

    // Fetch profile & goals (RLS must allow user to read their own rows)
    const [{ data: goals }, { data: profile }] = await Promise.all([
      supabase
        .from("fitness_goals")
        .select("user_id, primary_goal, dietary_restrictions")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("user_profiles")
        .select("user_id, height, weight, age, gender, activity_level")
        .eq("user_id", userId)
        .maybeSingle(),
    ]);

    const g = goals ?? null;
    const p = profile ?? null;

    const goal = g?.primary_goal ?? "general-fitness";
    const restrictions = preferences.dietaryRestrictions ?? g?.dietary_restrictions ?? [];

    const defaults = getGoalDefaults(goal);
    const calorieAdjust = Number(preferences.calorieTarget ?? 0);
    const totalCalories = clampInt(defaults.calories + calorieAdjust, 1400, 4200);
    const macros = macroTargets(totalCalories, defaults.protein);

    // Pull recent meal history to avoid repeats
    const { data: recentPlans } = await supabase
      .from("meal_plans")
      .select("plan_date, meals")
      .eq("user_id", userId)
      .neq("plan_date", date)
      .order("plan_date", { ascending: false })
      .limit(7);

    const recentFoods: string[] = [];
    if (Array.isArray(recentPlans)) {
      for (const rp of recentPlans) {
        const meals = (rp as any)?.meals;
        if (Array.isArray(meals)) {
          for (const m of meals) if (m?.food) recentFoods.push(String(m.food));
        }
      }
    }

    const systemPrompt = `
You are a nutrition coach generating a DAILY meal plan.

Rules:
- Output MUST be valid JSON matching the schema.
- Create exactly ${mealCount} meals.
- Respect dietary restrictions.
- Make meals varied: different cuisines and protein sources across the day.
- Avoid repeating any meal or very similar meal from the recent history list.
- Keep macros realistic; do not invent extreme nutrition numbers.

Targets:
- Total calories: ${totalCalories}
- Protein (g): ${macros.protein}
- Carbs (g): ${macros.carbs}
- Fat (g): ${macros.fat}

Return:
- title, description
- totals: totalCalories/totalProtein/totalCarbs/totalFat
- meals[] with macros per meal and short cooking instructions.
`.trim();

    const userPrompt = `
Goal: ${goal}
Dietary restrictions: ${restrictions.length ? restrictions.join(", ") : "none"}
User profile (may be partial): height=${p?.height ?? "unknown"}cm, weight=${p?.weight ?? "unknown"}kg, activity=${p?.activity_level ?? "unknown"}

Date being generated: ${date}

Recent meals to AVOID repeating (use these as a hard "do not repeat" list):
${recentFoods.length ? recentFoods.slice(0, 50).map((f) => `- ${f}`).join("\n") : "(no history)"}
`.trim();

    const model = "gpt-5";
    const ai = await openAIResponseJSON({
      apiKey: OPENAI_API_KEY,
      model,
      system: systemPrompt,
      user: userPrompt,
    });

    const mealsRaw = Array.isArray(ai?.meals) ? ai.meals : [];
    if (mealsRaw.length === 0) throw new Error("AI returned no meals");

    const meals = mealsRaw.slice(0, mealCount).map((m: any) => ({
      name: String(m.name ?? ""),
      food: String(m.food ?? ""),
      calories: clampInt(Number(m.calories ?? 0), 50, 2000),
      protein: clampInt(Number(m.protein ?? 0), 0, 200),
      carbs: clampInt(Number(m.carbs ?? 0), 0, 300),
      fat: clampInt(Number(m.fat ?? 0), 0, 150),
      instructions: String(m.instructions ?? ""),
    }));

    const planToSave: any = {
      user_id: userId,
      plan_date: date,
      title: String(ai.title ?? "Meal Plan"),
      description: String(ai.description ?? ""),
      total_calories: clampInt(Number(ai.totalCalories ?? totalCalories), 1200, 5000),
      total_protein: clampInt(Number(ai.totalProtein ?? macros.protein), 50, 400),
      total_carbs: clampInt(Number(ai.totalCarbs ?? macros.carbs), 50, 700),
      total_fat: clampInt(Number(ai.totalFat ?? macros.fat), 20, 250),
      meals,
      ai_generated: true,
    };

    const { data: saved, error: saveErr } = await supabase
      .from("meal_plans")
      .upsert(planToSave, { onConflict: "user_id,plan_date" })
      .select("*")
      .single();

    if (saveErr) {
      return new Response(
        JSON.stringify({ success: false, error: saveErr.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true, mealPlan: saved }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message ?? String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
