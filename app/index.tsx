import { Redirect } from "expo-router";

export default function Index() {
  // Always start in auth flow; UserContext will send logged-in users to tabs.
  return <Redirect href="/(auth)/sign-up" />;
}
