import { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { UserProvider, useUser } from "@/context/UserContext";
import { OnboardingProvider } from "@/context/OnboardingContext";

import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ActivityIndicator, Text } from "react-native";

function AppContent() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const segments = useSegments();

  // Hard fallback: never allow infinite loading
  const [bootTimedOut, setBootTimedOut] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBootTimedOut(true), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // If auth is still loading but we timed out, treat as logged out
    const effectiveLoading = isLoading && !bootTimedOut;
    if (effectiveLoading) return;

    const group = segments?.[0];
    const inAuth = group === "(auth)";
    const inTabs = group === "(tabs)";
    const inOnboarding = group === "(onboarding)";

    const effectiveUser = bootTimedOut ? null : user;

    if (!effectiveUser && !inAuth) {
      router.replace("/(auth)/sign-up");
      return;
    }

    if (effectiveUser && !(inTabs || inOnboarding)) {
      router.replace("/(tabs)/home");
      return;
    }
  }, [user, isLoading, bootTimedOut, segments, router]);

  if (isLoading && !bootTimedOut) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12, fontWeight: "700" }}>Loading session…</Text>
      </View>
    );
  }

  if (bootTimedOut) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12, fontWeight: "700" }}>Starting…</Text>
        <Text style={{ marginTop: 6, textAlign: "center" }}>
          Session restore timed out — continuing as logged out.
        </Text>
      </View>
    );
  }

  return <Slot />;
}

function FontsGate({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <UserProvider>
      <OnboardingProvider>
        <FontsGate>
          <AppContent />
        </FontsGate>
      </OnboardingProvider>
    </UserProvider>
  );
}
