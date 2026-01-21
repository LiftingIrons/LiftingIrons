export { ErrorBoundary } from "expo-router";

import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { UserProvider, useUser } from "@/context/UserContext";
import { OnboardingProvider } from "@/context/OnboardingContext";

import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// ✅ Prevent splash from auto-hiding until we say so
SplashScreen.preventAutoHideAsync().catch(() => {});

function AppContent() {
  const { user } = useUser();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const group = segments?.[0];
    const inAuth = group === "(auth)";
    const inTabs = group === "(tabs)";
    const inOnboarding = group === "(onboarding)";

    if (!user && !inAuth) {
      router.replace("/(auth)/sign-up");
      return;
    }

    if (user && !(inTabs || inOnboarding)) {
      router.replace("/(tabs)/home");
      return;
    }
  }, [user, segments, router]);

  return <Slot />;
}

function FontsGate({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
  });

  // ✅ Hide splash as soon as fonts are ready
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // While splash is showing, this UI might not be visible yet — that's OK.
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
