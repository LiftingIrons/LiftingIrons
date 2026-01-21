import { View, ActivityIndicator } from "react-native";

export default function Index() {
  // Let app/_layout.tsx decide where to send the user (auth vs tabs vs onboarding)
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
