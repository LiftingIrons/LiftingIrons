import { supabase } from "@/lib/supabase";

export const generateWorkout = async (userId: string) => {
  const { error } = await supabase.functions.invoke("generate-workout", {
    body: { user_id: userId },
  });

  if (error) {
    console.error("Workout generation failed:", error);
  }
};
