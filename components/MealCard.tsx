import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, ScrollView, SafeAreaView, Platform } from 'react-native';
import Card from './Card';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { Clock, Scale, ChevronRight, X as Close, Heart, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import WebSafeTouchableOpacity from '@/components/WebSafeTouchableOpacity';

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  allergens?: string[];
}

interface Step {
  number: number;
  instruction: string;
}

interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}

interface MealCardProps {
  id: string;
  title: string;
  prepTime: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
  ingredients: Ingredient[];
  instructions: Step[];
  nutritionalInfo: NutritionalInfo;
  allergens?: string[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPress: () => void;
}

export default function MealCard({
  id,
  title,
  prepTime,
  servings,
  calories,
  protein,
  carbs,
  fat,
  imageUrl,
  ingredients = [],
  instructions = [],
  nutritionalInfo,
  allergens = [],
  isFavorite,
  onToggleFavorite,
  onPress,
}: MealCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    onToggleFavorite(id);
  };

  const getAllergens = () => {
    const allAllergens = new Set([
      ...allergens,
      ...ingredients
        .filter(ingredient => ingredient.allergens)
        .flatMap(ingredient => ingredient.allergens || [])
    ]);
    return Array.from(allAllergens);
  };

  const mealAllergens = getAllergens();

  const renderModal = () => {
    return (
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={TYPOGRAPHY.headingMedium}>{title}</Text>
              <WebSafeTouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Close size={24} color={COLORS.text} />
              </WebSafeTouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.modalImage}
              />

              {mealAllergens.length > 0 && (
                <View style={styles.allergenWarning}>
                  <AlertTriangle size={20} color={COLORS.warning} />
                  <Text style={styles.allergenWarningText}>
                    Contains: {mealAllergens.join(', ')}
                  </Text>
                </View>
              )}

              <View style={styles.mealStats}>
                <View style={styles.statItem}>
                  <Clock size={20} color={COLORS.primary} />
                  <Text style={styles.statValue}>{prepTime}</Text>
                  <Text style={styles.statLabel}>Prep Time</Text>
                </View>
                <View style={styles.statItem}>
                  <Scale size={20} color={COLORS.primary} />
                  <Text style={styles.statValue}>{servings}</Text>
                  <Text style={styles.statLabel}>Servings</Text>
                </View>
              </View>

              {/* Nutritional Information */}
              <Card style={styles.nutritionCard}>
                <Text style={[TYPOGRAPHY.labelMedium, styles.sectionTitle]}>
                  Nutritional Information
                </Text>
                <View style={styles.nutritionGrid}>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{nutritionalInfo.calories}</Text>
                    <Text style={styles.nutritionLabel}>Calories</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{nutritionalInfo.protein}g</Text>
                    <Text style={styles.nutritionLabel}>Protein</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{nutritionalInfo.carbs}g</Text>
                    <Text style={styles.nutritionLabel}>Carbs</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{nutritionalInfo.fat}g</Text>
                    <Text style={styles.nutritionLabel}>Fat</Text>
                  </View>
                </View>
              </Card>

              {/* Ingredients */}
              <Card style={styles.sectionCard}>
                <Text style={[TYPOGRAPHY.labelMedium, styles.sectionTitle]}>
                  Ingredients
                </Text>
                {ingredients.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientItem}>
                    <Text style={styles.ingredientAmount}>
                      {ingredient.amount} {ingredient.unit}
                    </Text>
                    <View style={styles.ingredientDetails}>
                      <Text style={styles.ingredientName}>{ingredient.name}</Text>
                      {ingredient.allergens && ingredient.allergens.length > 0 && (
                        <Text style={styles.ingredientAllergen}>
                          Contains: {ingredient.allergens.join(', ')}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </Card>

              {/* Instructions */}
              <Card style={[styles.sectionCard, styles.lastSection]}>
                <Text style={[TYPOGRAPHY.labelMedium, styles.sectionTitle]}>
                  Cooking Instructions
                </Text>
                {instructions.map((step) => (
                  <View key={step.number} style={styles.instructionStep}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{step.number}</Text>
                    </View>
                    <Text style={styles.instructionText}>
                      {step.instruction}
                    </Text>
                  </View>
                ))}
              </Card>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <Card 
        onPress={() => setShowModal(true)} 
        style={styles.card}
      >
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <WebSafeTouchableOpacity 
              style={styles.favoriteButton}
              onPress={handleFavoritePress}
            >
              <Heart 
                size={24} 
                color={COLORS.white}
                fill={isFavorite ? COLORS.white : 'none'}
              />
            </WebSafeTouchableOpacity>
            {mealAllergens.length > 0 && (
              <View style={styles.allergenBadge}>
                <AlertTriangle size={16} color={COLORS.warning} />
              </View>
            )}
          </View>
          
          <View style={styles.details}>
            <Text style={TYPOGRAPHY.headingSmall} numberOfLines={1}>
              {title}
            </Text>
            
            <Text style={[TYPOGRAPHY.bodyMedium, styles.calories]}>
              {calories} calories
            </Text>
            
            <View style={styles.macros}>
              <View style={styles.macroItem}>
                <View style={[styles.macroIndicator, { backgroundColor: COLORS.error }]} />
                <Text style={TYPOGRAPHY.bodySmall}>{protein}g protein</Text>
              </View>
              
              <View style={styles.macroItem}>
                <View style={[styles.macroIndicator, { backgroundColor: COLORS.primary }]} />
                <Text style={TYPOGRAPHY.bodySmall}>{carbs}g carbs</Text>
              </View>
              
              <View style={styles.macroItem}>
                <View style={[styles.macroIndicator, { backgroundColor: COLORS.warning }]} />
                <Text style={TYPOGRAPHY.bodySmall}>{fat}g fat</Text>
              </View>
            </View>

            <View style={styles.viewRecipe}>
              <Text style={styles.viewRecipeText}>View Recipe</Text>
              <ChevronRight size={16} color={COLORS.primary} />
            </View>
          </View>
        </View>
      </Card>
      {renderModal()}
    </>
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
    height: 160,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allergenBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    padding: SPACING.md,
  },
  calories: {
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  macros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginBottom: SPACING.xs,
  },
  macroIndicator: {
    width: 8,
    height: 8,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.xs,
  },
  viewRecipe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  viewRecipeText: {
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
    height: 200,
    borderRadius: BORDER_RADIUS.md,
  },
  allergenWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warning + '20',
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  allergenWarningText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.warning,
    marginLeft: SPACING.sm,
  },
  mealStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.md,
    marginHorizontal: SPACING.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...TYPOGRAPHY.labelMedium,
    marginTop: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  nutritionCard: {
    margin: SPACING.md,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    ...TYPOGRAPHY.headingSmall,
    color: COLORS.primary,
  },
  nutritionLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  sectionCard: {
    margin: SPACING.md,
  },
  lastSection: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  ingredientItem: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  ingredientAmount: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primary,
    width: 80,
  },
  ingredientDetails: {
    flex: 1,
  },
  ingredientName: {
    ...TYPOGRAPHY.bodyMedium,
  },
  ingredientAllergen: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.warning,
    marginTop: 2,
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
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
});