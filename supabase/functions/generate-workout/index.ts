import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number | null;
  notes?: string;
};

type DayPlan = {
  dayIndex: number; // 0..6 Mon..Sun
  label: string;
  focus: string;
  exercises: Exercise[];
};

const DAY_LABELS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function dayIndexUTC(d = new Date()) {
  return (d.getUTCDay() + 6) % 7; // Monday=0
}

function weekStartISO(d = new Date()) {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = (date.getUTCDay() + 6) % 7; // Monday=0
  date.setUTCDate(date.getUTCDate() - day);
  return date.toISOString().slice(0, 10);
}

function buildFallbackWeek(goal: string, freq: number, bw: number): DayPlan[] {
  const useSplit = freq >= 4 || goal === "muscle-gain";

  const push: Exercise[] = [
    { id: "bench", name: "Bench Press", sets: 4, reps: "6–8", weight: Math.round(bw * 0.7) },
    { id: "incline_db", name: "Incline DB Press", sets: 3, reps: "8–10", weight: Math.round(bw * 0.4) },
    { id: "ohp", name: "Overhead Press", sets: 3, reps: "8–10", weight: Math.round(bw * 0.5) },
    { id: "lateral", name: "Lateral Raise", sets: 3, reps: "12–15", weight: Math.round(bw * 0.08) },
    { id: "triceps", name: "Tricep Pushdown", sets: 3, reps: "10–12", weight: Math.round(bw * 0.25) },
    { id: "pushups", name: "Push Ups", sets: 2, reps: "AMRAP", weight: null },
  ];

  const pull: Exercise[] = [
    { id: "row", name: "Barbell Row", sets: 4, reps: "8–10", weight: Math.round(bw * 0.6) },
    { id: "pulldown", name: "Lat Pulldown", sets: 3, reps: "10–12", weight: Math.round(bw * 0.5) },
    { id: "pullups", name: "Pull Ups", sets: 3, reps: "AMRAP", weight: null },
    { id: "facepull", name: "Face Pull", sets: 3, reps: "12–15", weight: Math.round(bw * 0.2) },
    { id: "curl", name: "Bicep Curl", sets: 3, reps: "10–12", weight: Math.round(bw * 0.25) },
    { id: "shrug", name: "DB Shrug", sets: 3, reps: "12", weight: Math.round(bw * 0.35) },
  ];

  const legs: Exercise[] = [
    { id: "squat", name: "Back Squat", sets: 4, reps: "5–8", weight: Math.round(bw * 1.0) },
    { id: "rdl", name: "Romanian Deadlift", sets: 3, reps: "8–10", weight: Math.round(bw * 0.9) },
    { id: "legpress", name: "Leg Press", sets: 3, reps: "10–12", weight: Math.round(bw * 1.6) },
    { id: "hamcurl", name: "Hamstring Curl", sets: 3, reps: "10–12", weight: Math.round(bw * 0.6) },
    { id: "calf", name: "Calf Raise", sets: 4, reps: "12–15", weight: Math.round(bw * 0.6) },
    { id: "plank", name: "Plank", sets: 3, reps: "45–60s", weight: null },
  ];

  const full: Exercise[] = [
    { id: "goblet", name: "Goblet Squat", sets: 3, reps: "10–12", weight: Math.round(bw * 0.35) },
    { id: "pushup", name: "Push Ups", sets: 3, reps: "10–15", weight: null },
    { id: "rowdb", name: "DB Row", sets: 3, reps: "10–12", weight: Math.round(bw * 0.3) },
    { id: "lunge", name: "Walking Lunges", sets: 3, reps: "10/leg", weight: Math.round(bw * 0.2) },
    { id: "ohpdb", name: "DB Shoulder Press", sets: 3, reps: "10", weight: Math.round(bw * 0.25) },
    { id: "core", name: "Dead Bug", sets: 3, reps: "12/side", weight: null },
  ];

  const days: DayPlan[] = [];

  for (let i = 0; i < 7; i++) {
    const label = DAY_LABELS[i];

    if (!useSplit) {
      const trainDays = Math.max(2, Math.min(6, freq));
      const isTrainDay = i < trainDays;
      days.push({
        dayIndex: i,
        label,
        focus: isTrainDay ? "Full Body" : "Rest",
        exercises: isTrainDay ? full : [],
      });
    } else {
      const pattern = ["Push", "Pull", "Legs", "Rest", "Push", "Pull", "Rest"];
      const f = pattern[i];
      days.push({
        dayIndex: i,
        label,
        focus: f,
        exercises: f === "Push" ? push : f === "Pull" ? pull : f === "Legs" ? legs : [],
      });
    }
  }

  return days;
}

async function callOpenAI(prompt: string) {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY secret");

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5.2",
      input: prompt,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${txt}`);
  }

  const json = await res.json();
  return (
    json.output_text ??
    json.output?.[0]?.content?.[0]?.text ??
    ""
  );
}

function expMultiplier(exp: string) {
  const e = (exp ?? "beginner").toLowerCase();
  if (e.includes("advanced")) return 1.15;
  if (e.includes("intermediate")) return 1.0;
  return 0.85; // beginner
}

function looksWeighted(name: string) {
  const n = (name ?? "").toLowerCase();
  // Anything that is very likely loaded
  const keywords = [
    "barbell","dumbbell","db ","machine","press","row","pulldown","curl",
    "extension","fly","leg press","squat","deadlift","rdl","lunge","split squat",
    "cable","smith","hip thrust","calf raise","lat","pullover"
  ];
  // bodyweight-ish exceptions
  const body = ["push up","pushup","pull up","pullup","plank","dead bug","jumping","run","walk","bike","stretch"];
  if (body.some((k) => n.includes(k))) return false;
  return keywords.some((k) => n.includes(k));
}

function roundTo2_5(x: number) {
  return Math.max(0, Math.round(x / 2.5) * 2.5);
}

function autoFillWeight(ex: Exercise, bw: number, mult: number): Exercise {
  if (!looksWeighted(ex.name)) return { ...ex, weight: null };

  // If AI already provided a number, keep it
  if (typeof ex.weight === "number" && Number.isFinite(ex.weight)) return ex;

  // Otherwise estimate based on movement pattern in the NAME
  const n = ex.name.toLowerCase();

  let base = bw * 0.3; // default dumbbell-ish

  if (n.includes("bench") || n.includes("chest press") || n.includes("incline")) base = bw * 0.6;
  if (n.includes("row") || n.includes("pulldown") || n.includes("lat")) base = bw * 0.55;
  if (n.includes("squat")) base = bw * 0.9;
  if (n.includes("deadlift") || n.includes("rdl")) base = bw * 1.0;
  if (n.includes("leg press")) base = bw * 1.5;
  if (n.includes("curl")) base = bw * 0.25;
  if (n.includes("lateral")) base = bw * 0.08;
  if (n.includes("tricep") || n.includes("pushdown")) base = bw * 0.25;
  if (n.includes("calf")) base = bw * 0.6;

  const w = roundTo2_5(base * mult);

  return { ...ex, weight: w };
}

serve(async (req: Request) => {
  try {
    const { user_id } = await req.json();
    if (!user_id) return new Response("Missing user_id", { status: 400 });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ✅ Pull goals (now includes experience_level and duration)
    const { data: goalsRow } = await supabase
      .from("fitness_goals")
      .select("primary_goal, workout_frequency, equipment_access, preferred_workout_duration, experience_level")
      .eq("user_id", user_id)
      .maybeSingle();

    // ✅ Pull profile safely
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("weight")
      .eq("id", user_id)
      .maybeSingle();

    const bw = (profile?.weight ?? 75) as number;
    const goal = (goalsRow?.primary_goal ?? "general-fitness") as string;
    const freq = (goalsRow?.workout_frequency ?? 4) as number;
    const equipment = goalsRow?.equipment_access ?? ["gym"];
    const duration = (goalsRow?.preferred_workout_duration ?? 45) as number;
    const exp = (goalsRow?.experience_level ?? "beginner") as string;
    const mult = expMultiplier(exp);

    // Dislikes
    const { data: feedback } = await supabase
      .from("exercise_feedback")
      .select("exercise_id, liked")
      .eq("user_id", user_id);

    const disliked = (feedback ?? [])
      .filter((f: any) => f.liked === false)
      .map((f: any) => f.exercise_id);

    const weekStart = weekStartISO();
    const todayIdx = dayIndexUTC();

    let days: DayPlan[] = [];
    let usedAI = false;

    // AI prompt with strong weight rules
    try {
      const prompt = `
Return STRICT JSON ONLY (no markdown). Create a 7-day workout plan.

User:
- goal: ${goal}
- days_per_week: ${freq}
- preferred_duration_minutes: ${duration}
- bodyweight_kg: ${bw}
- experience_level: ${exp}  (beginner/intermediate/advanced)
- equipment: ${JSON.stringify(equipment)}
- disliked_exercise_ids: ${JSON.stringify(disliked)}

Rules:
- Output: {"days":[ ...7 items... ]}
- day fields: dayIndex 0..6 (Mon..Sun), label ("Mon".."Sun"), focus (Push/Pull/Legs/Full Body/Rest), exercises[]
- Rest days: exercises=[]
- Training days: 6–12 exercises
- exercise object: { id, name, sets, reps, weight, notes? }
- weight MUST be a NUMBER (kg) for barbell/dumbbell/machine/cable exercises.
- weight MUST be null only for bodyweight/core/cardio/mobility (pushups, pullups, planks, dead bug, running etc).
- Use experience to scale weights:
  - beginner: lighter & safer
  - intermediate: moderate
  - advanced: heavier
- Avoid disliked exercise ids (choose alternatives)
`;
      const txt = await callOpenAI(prompt);
      const parsed = JSON.parse(txt);
      const parsedDays = parsed.days;

      if (!Array.isArray(parsedDays) || parsedDays.length !== 7) {
        throw new Error("AI output not 7 days");
      }

      days = parsedDays;
      usedAI = true;
    } catch (_e) {
      days = buildFallbackWeek(goal, freq, bw);
      usedAI = false;
    }

    // ✅ Post-process: ensure weights exist for weighted lifts
    days = days.map((d) => ({
      ...d,
      exercises: (d.exercises ?? []).map((ex) => autoFillWeight(ex, bw, mult)),
    }));

    const today = days[todayIdx] ?? days[0];

    // Delete the plan for this week to avoid duplicates
    await supabase
      .from("workout_plans")
      .delete()
      .eq("user_id", user_id)
      .eq("plan_week_start", weekStart);

    // Insert weekly plan
    const { error: insertError } = await supabase.from("workout_plans").insert({
      user_id,
      title: `Weekly Plan • ${weekStart}`,
      plan_week_start: weekStart,
      focus: today.focus,
      days,
      exercises: today.exercises,
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      return new Response(JSON.stringify({ where: "insert", insertError }), { status: 500 });
    }

    return new Response(
      JSON.stringify({
        success: true,
        usedAI,
        weekStart,
        focus: today.focus,
        experience_level: exp,
        count: today.exercises.length,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
