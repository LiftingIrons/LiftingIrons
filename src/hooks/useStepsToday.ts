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

      // iOS can usually fetch "steps today" from midnight -> now.
      if (Platform.OS === "ios") {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();

        try {
          const res = await Pedometer.getStepCountAsync(start, end);
          setSteps(res.steps);
        } catch {
          // ignore for now
        }
      }

      // Live step updates while app is open
      sub = Pedometer.watchStepCount((result) => {
        setSteps(result.steps);
      });
    })();

    return () => sub?.remove?.();
  }, []);

  return { steps, available };
}
