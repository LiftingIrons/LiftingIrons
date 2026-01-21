export { ErrorBoundary } from "expo-router";

import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { UserProvider, useUser } from "@/context/UserContext";
import { OnboardingProvider } from "@/context/OnboardingContext";

import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ActivityIndicator } from "react-native";

function AppContent() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const group = segments?.[0];
    const inAuth = group === "(auth)";
    const inTabs = group === "(tabs)";
    const inOnboarding = group === "(onboarding)";

    // ✅ Never block the app waiting on session restore.
    // If user is null, show auth right away.
    if (!user && !inAuth) {
      router.replace("/(auth)/sign-up");
      return;
    }

    // If we have a user, send them to tabs unless they’re already in tabs/onboarding.
    if (user && !(inTabs || inOnboarding)) {
      router.replace("/(tabs)/home");
      return;
    }
  }, [user, segments, router]);

  return (
    <>
      <Slot />

      {/* ✅ Optional: non-blocking indicator while restoring session */}
      {isLoading ? (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 50,
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
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
