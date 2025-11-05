import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { SHADOW } from '@/constants/Colors';
import WebSafeTouchableOpacity from './WebSafeTouchableOpacity';
import { useUser } from '@/context/UserContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  hideBackground?: boolean;
  variant?: 'default' | 'gradient' | 'minimal';
}

export default function Header({ 
  title, 
  subtitle, 
  hideBackground = false,
  variant = 'default'
}: HeaderProps) {
  const router = useRouter();
  const { user } = useUser();

  const handleProfilePress = () => {
    router.push('/(tabs)/profile');
  };

  const renderContent = () => (
    <View style={styles.content}>
      {/* Header row with text on left and profile on right */}
      <View style={styles.headerRow}>
        {/* Text content on the left */}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        
        {/* Profile picture on the right */}
        <WebSafeTouchableOpacity 
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg' }}
            style={styles.profileImage}
          />
        </WebSafeTouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'web' ? SPACING.sm : 0,
    paddingBottom: SPACING.sm,
    width: '100%',
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  content: {
    paddingHorizontal: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileButton: {
    borderRadius: 25,
    overflow: 'hidden',
    ...SHADOW.small,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  title: {
    fontFamily: 'System',
    fontSize: 28,
    color: COLORS.text,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'left',
  },
});