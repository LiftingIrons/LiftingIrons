import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="goals" // ensures onboarding starts at goals
    >
      <Stack.Screen name="goals" />
    </Stack>
  );
}
