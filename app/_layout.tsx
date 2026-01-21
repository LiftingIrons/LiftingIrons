export { ErrorBoundary } from "expo-router";

import React, { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { UserProvider, useUser } from "@/context/UserContext";
import { OnboardingProvider } from "@/context/OnboardingContext";

SplashScreen.preventAutoHideAsync().catch(() => {});

function BootOverlay({ label }: { label: string }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>BOOT ✅</Text>
      <Text style={{ marginTop: 10, fontWeight: "700" }}>{label}</Text>
      <View style={{ height: 16 }} />
      <ActivityIndicator />
      <Text style={{ marginTop: 12, textAlign: "center", opacity: 0.75 }}>
        If you see this in TestFlight, native splash is hidden and JS is running.
      </Text>
    </View>
  );
}

function AppContent() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Don’t route until the router has segments
    if (!segments?.length) return;

    const group = segments?.[0];
    const inAuth = group === "(auth)";
    const inTabs = group === "(tabs)";
    const inOnboarding = group === "(onboarding)";

    if (!user && !inAuth) router.replace("/(auth)/sign-up");
    if (user && !(inTabs || inOnboarding)) router.replace("/(tabs)/home");
  }, [user, segments, router]);

  // IMPORTANT: never return null; always render Slot so errors can surface
  return (
    <>
      <Slot />
      {isLoading ? (
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 60, alignItems: "center" }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8, fontWeight: "700" }}>Loading session…</Text>
        </View>
      ) : null}
    </>
  );
}

function FontsGate({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
  });

  // This is the critical piece: ALWAYS hide splash after a max timeout,
  // even if fonts never load for some reason in release.
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setForced(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (fontsLoaded || forced) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, forced]);

  if (!fontsLoaded && !forced) {
    return <BootOverlay label="Loading fonts…" />;
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
