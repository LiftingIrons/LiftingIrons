import { StyleSheet } from 'react-native';
import { COLORS } from './Colors';
import { FONT_SIZE, LINE_HEIGHT } from './Spacing';

export const TYPOGRAPHY = StyleSheet.create({
  displayLarge: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.display,
    lineHeight: FONT_SIZE.display * LINE_HEIGHT.compact,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  displayMedium: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.xxxl,
    lineHeight: FONT_SIZE.xxxl * LINE_HEIGHT.compact,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  displaySmall: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.xxl,
    lineHeight: FONT_SIZE.xxl * LINE_HEIGHT.compact,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  headingLarge: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.xxl,
    lineHeight: FONT_SIZE.xxl * LINE_HEIGHT.compact,
    color: COLORS.text,
    fontWeight: '600',
  },
  headingMedium: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.xl,
    lineHeight: FONT_SIZE.xl * LINE_HEIGHT.compact,
    color: COLORS.text,
    fontWeight: '600',
  },
  headingSmall: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.lg,
    lineHeight: FONT_SIZE.lg * LINE_HEIGHT.compact,
    color: COLORS.text,
    fontWeight: '600',
  },
  bodyLarge: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.lg,
    lineHeight: FONT_SIZE.lg * LINE_HEIGHT.normal,
    color: COLORS.text,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.md,
    lineHeight: FONT_SIZE.md * LINE_HEIGHT.normal,
    color: COLORS.text,
  },
  bodySmall: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.sm,
    lineHeight: FONT_SIZE.sm * LINE_HEIGHT.normal,
    color: COLORS.text,
  },
  labelLarge: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.md,
    lineHeight: FONT_SIZE.md * LINE_HEIGHT.compact,
    color: COLORS.text,
    fontWeight: '500',
  },
  labelMedium: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.sm,
    lineHeight: FONT_SIZE.sm * LINE_HEIGHT.compact,
    color: COLORS.text,
    fontWeight: '500',
  },
  labelSmall: {
    fontFamily: 'System',
    fontSize: FONT_SIZE.xs,
    lineHeight: FONT_SIZE.xs * LINE_HEIGHT.compact,
    color: COLORS.text,
    fontWeight: '500',
  },
});