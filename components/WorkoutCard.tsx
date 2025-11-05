import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Dumbbell, Clock, Star } from 'lucide-react-native';
import Card from './Card';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';

interface WorkoutCardProps {
  title: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  exercises: number;
  imageUrl?: string;
  onPress: () => void;
}

export default function WorkoutCard({
  title,
  duration,
  level,
  exercises,
  imageUrl,
  onPress,
}: WorkoutCardProps) {
  const getLevelColor = () => {
    switch (level) {
      case 'beginner':
        return COLORS.success;
      case 'intermediate':
        return COLORS.warning;
      case 'advanced':
        return COLORS.error;
      default:
        return COLORS.success;
    }
  };

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ 
              uri: imageUrl || 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg'
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.levelBadge}>
            <Text style={[TYPOGRAPHY.labelSmall, { color: COLORS.white }]}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <Text style={TYPOGRAPHY.headingSmall} numberOfLines={1}>
            {title}
          </Text>
          
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Clock size={16} color={COLORS.textSecondary} />
              <Text style={[TYPOGRAPHY.bodySmall, styles.statText]}>{duration}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Dumbbell size={16} color={COLORS.textSecondary} />
              <Text style={[TYPOGRAPHY.bodySmall, styles.statText]}>
                {exercises} {exercises === 1 ? 'exercise' : 'exercises'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'column',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  levelBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  details: {
    padding: SPACING.md,
  },
  stats: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  statText: {
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
});