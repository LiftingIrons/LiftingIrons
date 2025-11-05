import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SHADOW } from '@/constants/Colors';
import { BORDER_RADIUS, SPACING } from '@/constants/Spacing';
import WebSafeTouchableOpacity from './WebSafeTouchableOpacity';

interface CardProps {
  children: ReactNode;
  style?: object;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'flat';
}

export default function Card({ 
  children, 
  style, 
  onPress, 
  variant = 'default' 
}: CardProps) {
  const cardStyle = [
    styles.card,
    variant === 'outlined' && styles.outlined,
    variant === 'flat' && styles.flat,
    style,
  ];

  if (onPress) {
    return (
      <WebSafeTouchableOpacity 
        style={cardStyle} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </WebSafeTouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.small,
  },
  outlined: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  flat: {
    backgroundColor: COLORS.background,
    shadowOpacity: 0,
    elevation: 0,
  },
});