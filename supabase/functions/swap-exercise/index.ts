import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number | null;
  notes?: string;
};

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

function uidSuffix(id: string) {
  return `${id}_${crypto.randomUUID()}`;
}

function pickFromPool(focus: string, avoidNames: string[]) {
  const f = (focus ?? "").toLowerCase();
  const avoid = new Set((avoidNames ?? []).map((n) => n.toLowerCase().trim()));

  const PUSH: Exercise[] = [
    { id: "incline_db", name: "Incline Dumbbell Press", sets: 3, reps: "8–10", weight: null, notes: "Swap option" },
    { id: "machine_press", name: "Machine Chest Press", sets: 3, reps: "10–12", weight: null, notes: "Swap option" },
    { id: "dips", name: "Assisted Dips", sets: 3, reps: "8–12", weight: null, notes: "Swap option" },
    { id: "cable_fly", name: "Cable Fly", sets: 3, reps: "12–15", weight: null, notes: "Swap option" },
    { id: "db_shoulder", name: "Dumbbell Shoulder Press", sets: 3, reps: "8–10", weight: null, notes: "Swap option" },
  ];

  const PULL: Exercise[] = [
    { id: "lat_pulldown", name: "Lat Pulldown", sets: 3, reps: "10–12", weight: null, notes: "Swap option" },
    { id: "chest_supported_row", name: "Chest-Supported Row", sets: 3, reps: "8–12", weight: null, notes: "Swap option" },
    { id: "single_arm_row", name: "Single-Arm DB Row", sets: 3, reps: "10–12", weight: null, notes: "Swap option" },
    { id: "rear_delt", name: "Rear Delt Fly", sets: 3, reps: "12–15", weight: null, notes: "Swap option" },
    { id: "cable_row", name: "Cable Row", sets: 3, reps: "10–12", weight: null, notes: "Swap option" },
  ];

  const LEGS: Exercise[] = [
    { id: "leg_press", name: "Leg Press", sets: 3, reps: "10–12", weight: null, notes: "Swap option" },
    { id: "split_squat", name: "Bulgarian Split Squat", sets: 3, reps: "8–10/leg", weight: null, notes: "Swap option" },
    { id: "leg_extension", name: "Leg Extension", sets: 3, reps: "12–15", weight: null, notes: "Swap option" },
    { id: "ham_curl", name: "Hamstring Curl", sets: 3, reps: "10–12", weight: null, notes: "Swap option" },
    { id: "goblet", name: "Goblet Squat", sets: 3, reps: "10–12", weight: null, notes: "Swap option" },
  ];

  const pool =
    f.includes("push") ? PUSH :
    f.includes("pull") ? PULL :
    f.includes("leg") ? LEGS :
    [...PUSH, ...PULL, ...LEGS];

  const filtered = pool.filter((e) => !avoid.has(e.name.toLowerCase().trim()));
  const choice = (filtered.length ? filtered : pool)[Math.floor(Math.random() * (filtered.length ? filtered.length : pool.length))];
  return { ...choice, id: uidSuffix(choice.id) };
}

serve(async (req: Request) => {
  try {
    const body = await req.json();
    const user_id = body.user_id as string | undefined;
    const exercise_id = body.exercise_id as string | undefined;
    const focus = (body.focus ?? "Workout") as string;
    const avoid_names = (body.avoid_names ?? []) as string[];

    if (!user_id || !exercise_id) {
      return new Response(JSON.stringify({ error: "Missing user_id or exercise_id" }), { status: 400 });
    }

    const prompt = `
Return STRICT JSON ONLY.
Create ONE replacement exercise for a workout.

Context:
- workout_focus: ${focus}
- replace_exercise_id: ${exercise_id}
- avoid_names: ${JSON.stringify(avoid_names)}

Rules:
- Must NOT return any exercise whose name is in avoid_names (even if similar).
- Output exactly: {"exercise":{ "id":"...", "name":"...", "sets":3, "reps":"8–12", "weight":null, "notes":"..." }}
- Match movement pattern to focus (push/pull/legs)
`;

    // Try AI first
    try {
      const txt = await callOpenAI(prompt);
      const parsed = JSON.parse(txt);
      const ex: Exercise | undefined = parsed.exercise;

      if (!ex?.id || !ex?.name || !ex?.sets || !ex?.reps) {
        const fb = pickFromPool(focus, avoid_names);
        return new Response(JSON.stringify({ success: true, exercise: fb }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // Ensure it’s not in avoid list
      const avoid = new Set((avoid_names ?? []).map((n) => n.toLowerCase().trim()));
      if (avoid.has(ex.name.toLowerCase().trim())) {
        const fb = pickFromPool(focus, avoid_names);
        return new Response(JSON.stringify({ success: true, exercise: fb }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // Ensure unique id
      const unique = { ...ex, id: uidSuffix(ex.id) };

      return new Response(JSON.stringify({ success: true, exercise: unique }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      const fb = pickFromPool(focus, avoid_names);
      return new Response(JSON.stringify({ success: true, exercise: fb }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
