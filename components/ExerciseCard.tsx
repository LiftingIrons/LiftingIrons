import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Modal,
  ScrollView,
  SafeAreaView,
  Platform
} from 'react-native';
import { ChevronRight, X as Close, Dumbbell, Target, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Card from './Card';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import WebSafeTouchableOpacity from '@/components/WebSafeTouchableOpacity';

interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  equipment: string[];
  muscles: string[];
  imageUrl: string;
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  variations: string[];
}

interface ExerciseCardProps {
  exercise: Exercise;
  onPress?: () => void;
}

export default function ExerciseCard({ exercise, onPress }: ExerciseCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setShowModal(true);
    }
  };

  const getDifficultyColor = () => {
    switch (exercise.difficulty.toLowerCase()) {
      case 'beginner':
        return COLORS.success;
      case 'intermediate':
        return COLORS.warning;
      case 'advanced':
        return COLORS.error;
      default:
        return COLORS.primary;
    }
  };

  return (
    <>
      <Card onPress={handlePress} style={styles.card}>
        <Image source={{ uri: exercise.imageUrl }} style={styles.image} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={TYPOGRAPHY.headingSmall}>{exercise.name}</Text>
              <Text style={styles.category}>{exercise.category}</Text>
            </View>
            
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
              <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
            </View>
          </View>

          <View style={styles.equipment}>
            <Dumbbell size={16} color={COLORS.textSecondary} />
            <Text style={styles.equipmentText}>
              {exercise.equipment.join(', ')}
            </Text>
          </View>

          <View style={styles.viewDetails}>
            <Text style={styles.viewDetailsText}>View Details</Text>
            <ChevronRight size={16} color={COLORS.primary} />
          </View>
        </View>
      </Card>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={TYPOGRAPHY.headingMedium}>{exercise.name}</Text>
              <WebSafeTouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Close size={24} color={COLORS.text} />
              </WebSafeTouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={{ uri: exercise.imageUrl }} style={styles.modalImage} />

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Target size={20} color={COLORS.primary} />
                  <Text style={styles.sectionTitle}>Target Muscles</Text>
                </View>
                <View style={styles.muscles}>
                  {exercise.muscles?.map((muscle, index) => (
                    <View key={index} style={styles.muscleBadge}>
                      <Text style={styles.muscleText}>{muscle}</Text>
                    </View>
                  )) || null}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Instructions</Text>
                {exercise.instructions?.map((instruction, index) => (
                  <View key={index} style={styles.instructionStep}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.instructionText}>{instruction}</Text>
                  </View>
                )) || null}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pro Tips</Text>
                {exercise.tips?.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Text style={styles.tipText}>• {tip}</Text>
                  </View>
                )) || null}
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <AlertTriangle size={20} color={COLORS.error} />
                  <Text style={[styles.sectionTitle, { color: COLORS.error }]}>
                    Common Mistakes
                  </Text>
                </View>
                {exercise.commonMistakes?.map((mistake, index) => (
                  <View key={index} style={styles.mistakeItem}>
                    <Text style={styles.mistakeText}>• {mistake}</Text>
                  </View>
                )) || null}
              </View>

              <View style={[styles.section, styles.lastSection]}>
                <Text style={styles.sectionTitle}>Variations</Text>
                {exercise.variations?.map((variation, index) => (
                  <View key={index} style={styles.variationItem}>
                    <Text style={styles.variationText}>• {variation}</Text>
                  </View>
                )) || null}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  category: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  difficultyText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.white,
  },
  equipment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  equipmentText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  viewDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  viewDetailsText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: Platform.OS === 'ios' ? 0 : 40,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  modalImage: {
    width: '100%',
    height: 250,
  },
  section: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    marginTop: SPACING.md,
  },
  lastSection: {
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.headingSmall,
    marginLeft: SPACING.xs,
  },
  muscles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  muscleBadge: {
    backgroundColor: COLORS.primaryLight + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  muscleText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.primary,
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  stepNumberText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.white,
  },
  instructionText: {
    ...TYPOGRAPHY.bodyMedium,
    flex: 1,
  },
  tipItem: {
    marginBottom: SPACING.xs,
  },
  tipText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },
  mistakeItem: {
    marginBottom: SPACING.xs,
  },
  mistakeText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.error,
  },
  variationItem: {
    marginBottom: SPACING.xs,
  },
  variationText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },
});