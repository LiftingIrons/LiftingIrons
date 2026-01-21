import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "900" }}>Index Loaded ✅</Text>
        <Text style={{ marginTop: 10, textAlign: "center" }}>
          If you see this on TestFlight, routing/auth is fine and the issue is in specific screens.
        </Text>
      </View>
    </SafeAreaView>
  );
}
