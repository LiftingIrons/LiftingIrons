import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { Bot } from 'lucide-react-native';

interface Tip {
  id: string;
  title: string;
  content: string;
  icon: string;
}

interface AITipProps {
  tips: Tip[];
  interval?: number; // in milliseconds
}

export default function AITip({ tips, interval = 10000 }: AITipProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    if (tips.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, interval);

    return () => clearInterval(timer);
  }, [tips, interval]);

  if (!tips.length) return null;

  return (
    <Card variant="flat" style={styles.card}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Bot size={18} color={COLORS.primary} />
        </View>
        
        <View style={styles.content}>
          <Text style={[TYPOGRAPHY.labelMedium, styles.title]}>
            {tips[currentTipIndex].title}
          </Text>
          <Text style={[TYPOGRAPHY.bodySmall, styles.tip]}>
            {tips[currentTipIndex].content}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primaryLight + '20', // 20% opacity
    marginVertical: SPACING.md,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  content: {
    flex: 1,
  },
  title: {
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  tip: {
    color: COLORS.text,
  },
});