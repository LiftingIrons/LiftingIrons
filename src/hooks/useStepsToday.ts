import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Pedometer } from "expo-sensors";

export function useStepsToday() {
  const [steps, setSteps] = useState(0);
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let sub: any;

    (async () => {
      try {
        const isAvail = await Pedometer.isAvailableAsync();
        setAvailable(isAvail);
        if (!isAvail) return;

        // iOS: best-effort "today total"
        if (Platform.OS === "ios") {
          const start = new Date();
          start.setHours(0, 0, 0, 0);
          const end = new Date();
          const res = await Pedometer.getStepCountAsync(start, end);
          setSteps(res.steps);
        }

        // Live updates (while app open)
        sub = Pedometer.watchStepCount((r) => setSteps(r.steps));
      } catch {
        // If native module isn't present, don't crash the UI
        setAvailable(false);
      }
    })();

    return () => sub?.remove?.();
  }, []);

  return { steps, available };
}
