import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import ProgressBar from './ProgressBar';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { Trophy } from 'lucide-react-native';

interface GoalCardProps {
  title: string;
  description: string;
  progress: number; // 0 to 1
  daysLeft?: number;
  onPress: () => void;
}

export default function GoalCard({
  title,
  description,
  progress,
  daysLeft,
  onPress,
}: GoalCardProps) {
  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.iconContainer}>
        <Trophy size={24} color={COLORS.primary} />
      </View>
      
      <View style={styles.content}>
        <Text style={TYPOGRAPHY.headingSmall}>{title}</Text>
        <Text style={[TYPOGRAPHY.bodySmall, styles.description]} numberOfLines={2}>
          {description}
        </Text>
        
        <ProgressBar 
          progress={progress} 
          height={6} 
          showPercentage={true} 
        />
        
        {daysLeft !== undefined && daysLeft > 0 && (
          <Text style={[
            TYPOGRAPHY.labelSmall, 
            styles.daysLeft,
            { color: progress === 1 ? COLORS.success : COLORS.textSecondary }
          ]}>
            {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
          </Text>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SPACING.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  description: {
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  daysLeft: {
    marginTop: SPACING.xs,
  },
});