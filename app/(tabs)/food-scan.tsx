import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function FoodScan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const { mealIndex, date } = useLocalSearchParams<{ mealIndex?: string; date?: string }>();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // ... keep the rest of your component the same


  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Loading camera…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <Text style={{ marginBottom: 12 }}>
          We need camera access to scan barcodes.
        </Text>
        <Button title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
        }}
        onBarcodeScanned={({ data }) => {
          if (scanned) return;
          setScanned(true);

          router.replace({
            pathname: "/food-confirm",
            params: { barcode: data, mealIndex: mealIndex ?? "" },
          } as any);
        }}
      />

      {scanned && (
        <View style={{ position: "absolute", bottom: 30, left: 20, right: 20 }}>
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}
