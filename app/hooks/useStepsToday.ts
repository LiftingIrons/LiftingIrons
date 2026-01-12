import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Pedometer } from "expo-sensors";

export function useStepsToday() {
  const [steps, setSteps] = useState(0);
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let sub: any;

    (async () => {
      const isAvail = await Pedometer.isAvailableAsync();
      setAvailable(isAvail);
      if (!isAvail) return;

      // iOS: best effort "steps today"
      if (Platform.OS === "ios") {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        try {
          const res = await Pedometer.getStepCountAsync(start, end);
          setSteps(res.steps);
        } catch {}
      }

      // live updates while app open
      sub = Pedometer.watchStepCount((result) => {
        setSteps(result.steps);
      });
    })();

    return () => sub?.remove?.();
  }, []);

  return { steps, available };
}
