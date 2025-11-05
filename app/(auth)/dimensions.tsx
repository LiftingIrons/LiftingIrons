import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { useUser } from '@/context/UserContext';

export default function DimensionsScreen() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [dimensions, setDimensions] = useState({
    age: '',
    height: '',
    weight: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!dimensions.age) newErrors.age = 'Age is required';
    if (!dimensions.height) newErrors.height = 'Height is required';
    if (!dimensions.weight) newErrors.weight = 'Weight is required';
    if (!dimensions.gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setUser({
        ...user,
        dimensions: {
          age: parseInt(dimensions.age),
          height: parseInt(dimensions.height),
          weight: parseInt(dimensions.weight),
          gender: dimensions.gender
        }
      });
      router.push('/goals');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Dimensions</Text>
        <Text style={styles.subtitle}>
          Help us understand your body better to create a personalized plan
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={dimensions.age}
              onChangeText={(text) => setDimensions({ ...dimensions, age: text })}
              placeholder="Enter your age"
              keyboardType="numeric"
            />
            {errors.age && <Text style={styles.error}>{errors.age}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={dimensions.height}
              onChangeText={(text) => setDimensions({ ...dimensions, height: text })}
              placeholder="Enter your height in centimeters"
              keyboardType="numeric"
            />
            {errors.height && <Text style={styles.error}>{errors.height}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={dimensions.weight}
              onChangeText={(text) => setDimensions({ ...dimensions, weight: text })}
              placeholder="Enter your weight in kilograms"
              keyboardType="numeric"
            />
            {errors.weight && <Text style={styles.error}>{errors.weight}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              value={dimensions.gender}
              onChangeText={(text) => setDimensions({ ...dimensions, gender: text })}
              placeholder="Enter your gender"
            />
            {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}
          </View>

          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="large"
            fullWidth
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.displayMedium,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  form: {
    gap: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.labelMedium,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...TYPOGRAPHY.bodyMedium,
  },
  error: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  button: {
    marginTop: SPACING.md,
  },
});