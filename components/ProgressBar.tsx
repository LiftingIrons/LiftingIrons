import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
}

export default function ProgressBar({
  progress,
  height = 10,
  label,
  showPercentage = false,
  color = COLORS.primary,
  backgroundColor = COLORS.primaryLight,
}: ProgressBarProps) {
  // Ensure progress is between 0 and 1
  const normalizedProgress = Math.min(Math.max(progress, 0), 1);
  const width = useSharedValue(0);

  // Animate the progress bar width
  useEffect(() => {
    width.value = withTiming(normalizedProgress, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [normalizedProgress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: Platform.select({
      web: `${width.value * 100}%`,
      default: `${width.value * 100}%`,
    }),
  }));

  return (
    <View style={styles.container}>
      {(label || showPercentage) && (
        <View style={styles.labelContainer}>
          {label && <Text style={[TYPOGRAPHY.labelMedium, styles.label]}>{label}</Text>}
          {showPercentage && (
            <Text style={[TYPOGRAPHY.labelMedium, styles.percentage]}>
              {Math.round(normalizedProgress * 100)}%
            </Text>
          )}
        </View>
      )}
      <View 
        style={[
          styles.progressContainer, 
          { 
            height, 
            backgroundColor 
          }
        ]}
      >
        <Animated.View
          style={[
            styles.progressBar,
            { backgroundColor: color },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: SPACING.sm,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  label: {
    color: COLORS.text,
  },
  percentage: {
    color: COLORS.textSecondary,
  },
  progressContainer: {
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
  },
});