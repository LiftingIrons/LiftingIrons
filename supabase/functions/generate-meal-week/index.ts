import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function dateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Sunday start of week (0 = Sunday)
function sundayStart(d: Date) {
  const start = new Date(d);
  start.setHours(0, 0, 0, 0);
  const day = start.getDay(); // 0..6 (Sun..Sat)
  start.setDate(start.getDate() - day);
  return start;
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
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

async function openAIWeekJSON(params: {
  apiKey: string;
  model: string;
  system: string;
  user: string;
}) {
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: params.model,
      input: [
        { role: "system", content: params.system },
        { role: "user", content: params.user },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "meal_week",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              weekStart: { type: "string" },
              days: {
                type: "array",
                minItems: 7,
                maxItems: 7,
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    date: { type: "string" },
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
                    "date",
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
            required: ["weekStart", "days"],
          },
        },
      },
      // Do NOT include temperature (your model rejected it)
    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`OpenAI error ${res.status}: ${t}`);
  }

  const json = await res.json();

  // ✅ FIX: Responses API does not always provide json.output_text.
  // Extract text from json.output[].content[].type === "output_text"
  let out = "";

  if (Array.isArray(json.output)) {
    for (const item of json.output) {
      const content = item?.content;
      if (Array.isArray(content)) {
        for (const c of content) {
          if (c?.type === "output_text" && typeof c?.text === "string") {
            out += c.text;
          }
        }
      }
    }
  }

  // Fallback if present
  if (!out && typeof json.output_text === "string") {
    out = json.output_text;
  }

  out = String(out ?? "").trim();

  if (!out) {
    throw new Error(
      `OpenAI returned no text. output=${Array.isArray(json.output) ? json.output.length : "none"} output_text=${typeof json.output_text}`
    );
  }

  return JSON.parse(out);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

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

    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing Authorization Bearer token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JWT / not logged in" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const userId = userData.user.id;

    const body = await req.json().catch(() => ({} as any));
    const preferences = body?.preferences ?? {};
    const anyDate = body?.date ? new Date(body.date) : new Date();

    const weekStartDate = sundayStart(anyDate);
    const weekStart = dateKey(weekStartDate);
    const dates = Array.from({ length: 7 }, (_, i) => dateKey(addDays(weekStartDate, i)));

    // Cache: return existing week if already saved
    const { data: existing } = await supabase
      .from("meal_plans")
      .select("*")
      .eq("user_id", userId)
      .eq("week_start", weekStart)
      .order("plan_date", { ascending: true });

    if (Array.isArray(existing) && existing.length >= 7) {
      return new Response(
        JSON.stringify({ success: true, weekStart, days: existing }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Load onboarding info
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

    const goal = goals?.primary_goal ?? "general-fitness";
    const restrictions = preferences.dietaryRestrictions ?? goals?.dietary_restrictions ?? [];

    const defaults = getGoalDefaults(goal);
    const calorieAdjust = Number(preferences.calorieTarget ?? 0);
    const totalCalories = clampInt(defaults.calories + calorieAdjust, 1400, 4200);
    const mealCount = Number(preferences.mealCount ?? 6);
    const macros = macroTargets(totalCalories, defaults.protein);

    // Recent history to avoid repeats
    const { data: recentPlans } = await supabase
      .from("meal_plans")
      .select("meals")
      .eq("user_id", userId)
      .order("plan_date", { ascending: false })
      .limit(10);

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
You are a nutrition coach generating a 7-DAY meal plan (Sunday–Saturday).

Rules:
- Output MUST be valid JSON matching the schema.
- Return exactly 7 days in "days".
- Each day must have exactly ${mealCount} meals.
- Respect dietary restrictions.
- Avoid repeating the same meals across the week.
- Avoid repeating meals from recent history list.
- Keep macros realistic.

Daily targets (approx, per day):
- Total calories: ${totalCalories}
- Protein (g): ${macros.protein}
- Carbs (g): ${macros.carbs}
- Fat (g): ${macros.fat}
`.trim();

    const userPrompt = `
Week start (Sunday): ${weekStart}
Dates (must match exactly): ${dates.join(", ")}

Goal: ${goal}
Dietary restrictions: ${restrictions.length ? restrictions.join(", ") : "none"}
User profile: height=${profile?.height ?? "unknown"}cm, weight=${profile?.weight ?? "unknown"}kg, age=${profile?.age ?? "unknown"}, activity=${profile?.activity_level ?? "unknown"}

Recent meals to AVOID repeating:
${recentFoods.length ? recentFoods.slice(0, 80).map((f) => `- ${f}`).join("\n") : "(no history)"}
`.trim();

    const model = "gpt-4.1-mini";
    const ai = await openAIWeekJSON({
      apiKey: OPENAI_API_KEY,
      model,
      system: systemPrompt,
      user: userPrompt,
    });

    const days = Array.isArray(ai?.days) ? ai.days : [];
    if (days.length !== 7) throw new Error("AI did not return exactly 7 days");

    const rows = days.map((d: any) => ({
      user_id: userId,
      week_start: weekStart,
      plan_date: String(d.date),
      title: String(d.title ?? "Meal Plan"),
      description: String(d.description ?? ""),
      total_calories: clampInt(Number(d.totalCalories ?? totalCalories), 1200, 5000),
      total_protein: clampInt(Number(d.totalProtein ?? macros.protein), 50, 400),
      total_carbs: clampInt(Number(d.totalCarbs ?? macros.carbs), 50, 700),
      total_fat: clampInt(Number(d.totalFat ?? macros.fat), 20, 250),
      meals: Array.isArray(d.meals) ? d.meals : [],
      ai_generated: true,
    }));

    const { data: saved, error: saveErr } = await supabase
      .from("meal_plans")
      .upsert(rows, { onConflict: "user_id,plan_date" })
      .select("*")
      .order("plan_date", { ascending: true });

    if (saveErr) {
      return new Response(
        JSON.stringify({ success: false, error: saveErr.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, weekStart, days: saved ?? [] }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message ?? String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
