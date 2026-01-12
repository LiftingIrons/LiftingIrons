import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Modal,
  Image,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Dumbbell, Apple, Pill, ChevronDown, X as Close, Target } from 'lucide-react-native';
import Card from '@/components/Card';
import ExerciseCard from '@/components/ExerciseCard';
import MealCard from '@/components/MealCard';
import Button from '@/components/Button';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { exerciseLibrary, meals } from '@/data/mockData';
import WebSafeTouchableOpacity from '@/components/WebSafeTouchableOpacity';

// Exercise Detail Modal Component
function ExerciseDetailModal({
  exercise,
  visible,
  onClose,
}: {
  exercise: any;
  visible: boolean;
  onClose: () => void;
}) {
  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={modalStyles.modalContainer}>
        <SafeAreaView style={modalStyles.modalContent}>
          <View style={modalStyles.modalHeader}>
            {/* ✅ FIX: constrain long titles so X never gets pushed off-screen */}
            <Text
              style={[TYPOGRAPHY.headingMedium, modalStyles.modalTitle]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {exercise.name}
            </Text>

            <WebSafeTouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
              <Close size={24} color={COLORS.text} />
            </WebSafeTouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{ uri: exercise.imageUrl }} style={modalStyles.modalImage} />

            <View style={modalStyles.sectionCard}>
              <View style={modalStyles.cardAccent} />
              <View style={modalStyles.sectionHeader}>
                <Target size={20} color={COLORS.primary} />
                <Text style={modalStyles.sectionTitle}>Target Muscles</Text>
              </View>
              <View style={modalStyles.muscles}>
                {exercise.muscles?.map((muscle: string, index: number) => (
                  <View key={index} style={modalStyles.muscleBadge}>
                    <Text style={modalStyles.muscleText}>{muscle}</Text>
                  </View>
                )) || null}
              </View>
            </View>

            <View style={modalStyles.sectionCard}>
              <View style={modalStyles.cardAccent} />
              <Text style={modalStyles.sectionTitle}>Instructions</Text>
              {exercise.instructions?.map((instruction: string, index: number) => (
                <View key={index} style={modalStyles.instructionStep}>
                  <View style={modalStyles.stepNumber}>
                    <Text style={modalStyles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={modalStyles.instructionText}>{instruction}</Text>
                </View>
              )) || null}
            </View>

            <View style={modalStyles.sectionCard}>
              <View style={modalStyles.cardAccent} />
              <Text style={modalStyles.sectionTitle}>Pro Tips</Text>
              {exercise.tips?.map((tip: string, index: number) => (
                <View key={index} style={modalStyles.tipItem}>
                  <Text style={modalStyles.tipText}>• {tip}</Text>
                </View>
              )) || null}
            </View>

            <View style={[modalStyles.sectionCard, modalStyles.lastSection]}>
              <View style={modalStyles.cardAccent} />
              <Text style={modalStyles.sectionTitle}>Variations</Text>
              {exercise.variations?.map((variation: string, index: number) => (
                <View key={index} style={modalStyles.variationItem}>
                  <Text style={modalStyles.variationText}>• {variation}</Text>
                </View>
              )) || null}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

type LibrarySection = 'exercises' | 'meals' | 'supplements';

const supplements = [
  {
    id: 'creatine',
    name: 'Creatine Monohydrate',
    category: 'Performance',
    description: 'Increases muscle strength and power output during high-intensity exercise.',
    benefits: ['Increased strength', 'Better performance', 'Muscle growth support'],
    dosage: '5g daily',
  },
  {
    id: 'whey_protein',
    name: 'Whey Protein',
    category: 'Muscle Growth & Strength',
    description: 'Fast-digesting protein that supports muscle repair and growth.',
    benefits: ['Muscle growth', 'Faster recovery', 'High-quality protein source'],
    dosage: '20-40g post-workout',
  },
  {
    id: 'casein_protein',
    name: 'Casein Protein',
    category: 'Muscle Growth & Strength',
    description: 'Slow-digesting protein ideal for overnight muscle recovery.',
    benefits: ['Muscle preservation', 'Sustained protein release', 'Supports recovery'],
    dosage: '20-40g before bed',
  },
  {
    id: 'creatine_hcl',
    name: 'Creatine HCL',
    category: 'Muscle Growth & Strength',
    description: 'Highly soluble form of creatine that supports strength and muscle gains.',
    benefits: ['Improved strength', 'Enhanced endurance', 'Muscle growth'],
    dosage: '1-2g daily',
  },
  {
    id: 'bcaas',
    name: 'Branched-Chain Amino Acids (BCAAs)',
    category: 'Muscle Growth & Strength',
    description: 'Essential amino acids that support muscle protein synthesis and recovery.',
    benefits: ['Reduced muscle soreness', 'Supports recovery', 'Muscle growth'],
    dosage: '5-10g during or after workouts',
  },
  {
    id: 'eaas',
    name: 'Essential Amino Acids (EAAs)',
    category: 'Muscle Growth & Strength',
    description: 'All essential amino acids that help stimulate muscle protein synthesis.',
    benefits: ['Muscle growth', 'Enhanced recovery', 'Supports lean mass'],
    dosage: '10g daily',
  },
  {
    id: 'beta_alanine',
    name: 'Beta-Alanine',
    category: 'Muscle Growth & Strength',
    description: 'Increases muscle carnosine levels to buffer fatigue during high-intensity exercise.',
    benefits: ['Improved endurance', 'Delay fatigue', 'Supports strength gains'],
    dosage: '3-6g daily',
  },
  {
    id: 'l_glutamine',
    name: 'L-Glutamine',
    category: 'Muscle Growth & Strength',
    description: 'Amino acid that supports recovery and immune function after intense training.',
    benefits: ['Faster recovery', 'Supports immune health', 'Reduces muscle soreness'],
    dosage: '5-10g daily',
  },
  {
    id: 'mass_gainer',
    name: 'Mass Gainer Powder',
    category: 'Muscle Growth & Strength',
    description: 'High-calorie protein and carbohydrate blend for muscle mass and weight gain.',
    benefits: ['Increased calorie intake', 'Muscle growth', 'Convenient nutrition'],
    dosage: '1-2 servings per day',
  },
  {
    id: 'hmb',
    name: 'HMB (Beta-Hydroxy Beta-Methylbutyrate)',
    category: 'Muscle Growth & Strength',
    description: 'Metabolite of leucine that helps reduce muscle breakdown and support growth.',
    benefits: ['Reduce muscle breakdown', 'Support lean mass', 'Enhance recovery'],
    dosage: '3g daily',
  },
  {
    id: 'vitamin-d',
    name: 'Vitamin D3',
    category: 'Vitamins',
    description: 'Essential for bone health, immune function, and muscle strength.',
    benefits: ['Bone health', 'Immune support', 'Muscle function'],
    dosage: '2000-4000 IU daily',
  },
  {
    id: 'caffeine',
    name: 'Caffeine',
    category: 'Energy & Performance',
    description: 'A stimulant that increases alertness, focus, and exercise performance.',
    benefits: ['Boosts energy', 'Enhances focus', 'Improves endurance'],
    dosage: '200-400mg 30-60 minutes before workouts',
  },
  {
    id: 'beta_alanine_performance',
    name: 'Beta-Alanine',
    category: 'Energy & Performance',
    description: 'Buffers acid in muscles to reduce fatigue during high-intensity exercise.',
    benefits: ['Delays fatigue', 'Improves endurance', 'Supports high-intensity performance'],
    dosage: '3-6g daily',
  },
  {
    id: 'citrulline_malate',
    name: 'Citrulline Malate',
    category: 'Energy & Performance',
    description: 'Enhances nitric oxide production for better blood flow and endurance.',
    benefits: ['Improves pumps', 'Reduces fatigue', 'Boosts endurance'],
    dosage: '6-8g 30-60 minutes before workouts',
  },
  {
    id: 'nitric_oxide_boosters',
    name: 'Nitric Oxide (NO) Boosters',
    category: 'Energy & Performance',
    description: 'Supports blood flow and nutrient delivery to muscles during exercise.',
    benefits: ['Enhanced blood flow', 'Better nutrient delivery', 'Improved performance'],
    dosage: 'Follow product instructions',
  },
  {
    id: 'l_citrulline',
    name: 'L-Citrulline',
    category: 'Energy & Performance',
    description: 'Amino acid that improves nitric oxide levels and endurance.',
    benefits: ['Boosts pumps', 'Reduces fatigue', 'Supports stamina'],
    dosage: '6-8g daily before workouts',
  },
  {
    id: 'taurine',
    name: 'Taurine',
    category: 'Energy & Performance',
    description: 'Amino acid that supports endurance, hydration, and muscle function.',
    benefits: ['Enhances endurance', 'Supports hydration', 'Reduces muscle fatigue'],
    dosage: '1-3g daily',
  },
  {
    id: 'beetroot_juice',
    name: 'Beetroot Juice / Beetroot Extract',
    category: 'Energy & Performance',
    description: 'Rich in nitrates to improve blood flow and endurance performance.',
    benefits: ['Improves stamina', 'Enhances oxygen delivery', 'Supports endurance'],
    dosage: '250-500ml juice or 500-1000mg extract 1 hour before workouts',
  },
  {
    id: 'l_arginine',
    name: 'L-Arginine',
    category: 'Energy & Performance',
    description: 'Amino acid that boosts nitric oxide levels for better pumps and performance.',
    benefits: ['Improved blood flow', 'Enhanced endurance', 'Supports muscle performance'],
    dosage: '3-6g 30-60 minutes before workouts',
  },
  {
    id: 'pre_workout_blend',
    name: 'Pre-Workout Blends',
    category: 'Energy & Performance',
    description: 'Formulated mixes of stimulants, amino acids, and vasodilators to boost performance.',
    benefits: ['Increased energy', 'Enhanced focus', 'Improved strength & endurance'],
    dosage: 'Follow product instructions',
  },
  {
    id: 'electrolytes',
    name: 'Electrolytes',
    category: 'Energy & Performance',
    description: 'Minerals that maintain fluid balance, muscle function, and prevent cramps.',
    benefits: ['Supports hydration', 'Prevents cramps', 'Improves endurance'],
    dosage: 'Follow product instructions or as needed during workouts',
  },
  {
    id: 'tart_cherry_extract',
    name: 'Tart Cherry Extract',
    category: 'Recovery & Repair',
    description: 'Natural antioxidant that helps reduce post-workout soreness.',
    benefits: ['Reduces muscle soreness', 'Supports recovery', 'Anti-inflammatory'],
    dosage: '500-1000mg daily',
  },
  {
    id: 'collagen',
    name: 'Collagen',
    category: 'Recovery & Repair',
    description: 'Supports connective tissue and joint recovery post-exercise.',
    benefits: ['Joint support', 'Connective tissue repair', 'Reduces injury risk'],
    dosage: '10-20g daily',
  },
  {
    id: 'carbohydrate_powder',
    name: 'Carbohydrate Powder',
    category: 'Recovery & Repair',
    description: 'Fast-digesting carbs to replenish glycogen after workouts.',
    benefits: ['Replenishes glycogen', 'Supports recovery', 'Reduces fatigue'],
    dosage: '30-60g post-workout',
  },
  {
    id: 'protein_carbohydrate_combo',
    name: 'Protein + Carb Recovery Blend',
    category: 'Recovery & Repair',
    description: 'Combined protein and carbs to maximize post-workout muscle recovery.',
    benefits: ['Muscle repair', 'Glycogen replenishment', 'Enhanced recovery'],
    dosage: '1 serving post-workout',
  },
  {
    id: 'green_tea_extract',
    name: 'Green Tea Extract',
    category: 'Fat Loss & Metabolism Support',
    description: 'Rich in catechins and caffeine to support fat burning and metabolism.',
    benefits: ['Boosts metabolism', 'Supports fat loss', 'Provides antioxidants'],
    dosage: '250-500mg daily',
  },
  {
    id: 'l_carnitine',
    name: 'L-Carnitine',
    category: 'Fat Loss & Metabolism Support',
    description: 'Aids in transporting fatty acids into cells to be used as energy.',
    benefits: ['Supports fat burning', 'Improves energy use', 'May enhance endurance'],
    dosage: '1-3g daily',
  },
  {
    id: 'cla',
    name: 'CLA (Conjugated Linoleic Acid)',
    category: 'Fat Loss & Metabolism Support',
    description: 'A fatty acid that may support fat loss and lean muscle preservation.',
    benefits: ['Supports fat loss', 'Helps preserve lean mass', 'Promotes body composition'],
    dosage: '3-6g daily',
  },
  {
    id: 'yohimbine',
    name: 'Yohimbine',
    category: 'Fat Loss & Metabolism Support',
    description: 'Plant extract that may increase fat breakdown, especially stubborn fat areas.',
    benefits: ['Supports fat burning', 'Increases energy expenditure', 'Targets stubborn fat'],
    dosage: '5-15mg before fasted exercise',
  },
  {
    id: 'capsaicin',
    name: 'Capsaicin',
    category: 'Fat Loss & Metabolism Support',
    description: 'Compound from chili peppers that boosts thermogenesis and fat oxidation.',
    benefits: ['Increases calorie burn', 'Supports fat loss', 'Boosts metabolism'],
    dosage: '2-10mg daily',
  },
  {
    id: 'garcinia_cambogia',
    name: 'Garcinia Cambogia',
    category: 'Fat Loss & Metabolism Support',
    description: 'Fruit extract that may help reduce appetite and inhibit fat storage.',
    benefits: ['Appetite control', 'Supports fat loss', 'May reduce fat storage'],
    dosage: '500-1000mg before meals',
  },
  {
    id: 'chromium_picolinate',
    name: 'Chromium Picolinate',
    category: 'Fat Loss & Metabolism Support',
    description: 'Mineral that helps regulate blood sugar and may reduce cravings.',
    benefits: ['Supports appetite control', 'Helps regulate blood sugar', 'May aid fat loss'],
    dosage: '200-1000mcg daily',
  },
  {
    id: 'glucosamine',
    name: 'Glucosamine',
    category: 'Joint, Bone & Tissue Health',
    description: 'A natural compound that supports joint cartilage and mobility.',
    benefits: ['Supports joint health', 'Reduces stiffness', 'Improves mobility'],
    dosage: '1500mg daily',
  },
  {
    id: 'chondroitin',
    name: 'Chondroitin',
    category: 'Joint, Bone & Tissue Health',
    description: 'Often paired with glucosamine to help maintain healthy cartilage.',
    benefits: ['Supports cartilage', 'Improves joint function', 'Reduces discomfort'],
    dosage: '800-1200mg daily',
  },
  {
    id: 'msm',
    name: 'MSM (Methylsulfonylmethane)',
    category: 'Joint, Bone & Tissue Health',
    description: 'An organic sulfur compound that supports joint function and reduces inflammation.',
    benefits: ['Supports joint mobility', 'Reduces inflammation', 'Improves flexibility'],
    dosage: '2-6g daily',
  },
  {
    id: 'calcium',
    name: 'Calcium',
    category: 'Joint, Bone & Tissue Health',
    description: 'Essential mineral for strong bones and teeth, crucial for bone density.',
    benefits: ['Supports bone strength', 'Prevents bone loss', 'Essential mineral'],
    dosage: '1000-1200mg daily',
  },
  {
    id: 'vitamin_d',
    name: 'Vitamin D',
    category: 'Joint, Bone & Tissue Health',
    description: 'Supports calcium absorption and overall bone health.',
    benefits: ['Stronger bones', 'Supports calcium absorption', 'Improves immunity'],
    dosage: '1000-4000 IU daily',
  },
  {
    id: 'vitamin_k2',
    name: 'Vitamin K2',
    category: 'Joint, Bone & Tissue Health',
    description: 'Works with vitamin D to regulate calcium and support bone strength.',
    benefits: ['Supports bone health', 'Helps calcium absorption', 'Prevents bone weakening'],
    dosage: '90-200mcg daily',
  },
  {
    id: 'hyaluronic_acid',
    name: 'Hyaluronic Acid',
    category: 'Joint, Bone & Tissue Health',
    description: 'Naturally found in joints to lubricate and cushion cartilage.',
    benefits: ['Improves joint lubrication', 'Reduces stiffness', 'Supports cartilage health'],
    dosage: '50-200mg daily',
  },
  {
    id: 'multivitamin',
    name: 'Multivitamin',
    category: 'Everyday Essentials / Micronutrients',
    description: 'A blend of essential vitamins and minerals to cover daily nutritional needs.',
    benefits: ['Fills nutrient gaps', 'Supports overall health', 'Boosts energy levels'],
    dosage: '1 serving daily (per product instructions)',
  },
  {
    id: 'vitamin_c',
    name: 'Vitamin C',
    category: 'Everyday Essentials / Micronutrients',
    description: 'An antioxidant vitamin that supports immunity, recovery, and collagen production.',
    benefits: ['Boosts immune system', 'Supports recovery', 'Promotes skin and tissue health'],
    dosage: '500-2000mg daily',
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    category: 'Everyday Essentials / Micronutrients',
    description: 'Essential mineral for muscle function, recovery, and energy production.',
    benefits: ['Supports muscle function', 'Improves sleep quality', 'Aids recovery'],
    dosage: '300-400mg daily',
  },
  {
    id: 'zinc',
    name: 'Zinc',
    category: 'Everyday Essentials / Micronutrients',
    description: 'Mineral important for immunity, hormone health, and recovery.',
    benefits: ['Supports immunity', 'Boosts testosterone health', 'Aids healing'],
    dosage: '15-30mg daily',
  },
  {
    id: 'iron',
    name: 'Iron',
    category: 'Everyday Essentials / Micronutrients',
    description: 'Essential mineral for oxygen transport and energy production.',
    benefits: ['Prevents fatigue', 'Supports oxygen delivery', 'Boosts energy'],
    dosage: '8-18mg daily (higher for some individuals)',
  },
  {
    id: 'omega_3',
    name: 'Omega-3 Fatty Acids',
    category: 'Everyday Essentials / Micronutrients',
    description: 'Essential fatty acids that support heart, brain, and joint health.',
    benefits: ['Supports heart health', 'Improves brain function', 'Reduces inflammation'],
    dosage: '1-3g daily',
  },
  {
    id: 'probiotics',
    name: 'Probiotics',
    category: 'Everyday Essentials / Micronutrients',
    description: 'Live bacteria that support gut health, digestion, and immunity.',
    benefits: ['Supports digestion', 'Boosts immunity', 'Improves gut balance'],
    dosage: '1 serving daily (per product instructions)',
  },
];

function niceDateLabel() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

export default function LibraryScreen() {
  const params = useLocalSearchParams();
  const [activeSection, setActiveSection] = useState<LibrarySection>('exercises');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('all');
  const [selectedMealType, setSelectedMealType] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [selectedBulkCut, setSelectedBulkCut] = useState<string>('all');
  const [selectedSupplementCategory, setSelectedSupplementCategory] = useState<string>('all');
  const [showExerciseModal, setShowExerciseModal] = useState<any>(null);

  // Handle navigation from exercise plan
  React.useEffect(() => {
    if (params.section) {
      setActiveSection(params.section as LibrarySection);
    }

    // If navigating to a specific exercise, scroll to it or highlight it
    if (params.exerciseName) {
      // Find and auto-open the specific exercise
      const exercise = exerciseLibrary.exercises.find(
        (ex) => ex.name.toLowerCase() === String(params.exerciseName).toLowerCase()
      );

      if (exercise) {
        // Small delay to ensure the library has rendered
        setTimeout(() => {
          // Auto-open the exercise modal
          setShowExerciseModal(exercise);
        }, 100);
      }
    }
  }, [params]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]));
  };

  const sections = [
    { id: 'exercises' as LibrarySection, label: 'Exercises', icon: Dumbbell },
    { id: 'meals' as LibrarySection, label: 'Meals', icon: Apple },
    { id: 'supplements' as LibrarySection, label: 'Supplements', icon: Pill },
  ];

  const bodyParts = [
    { id: 'all', label: 'All Body Parts' },
    { id: 'chest', label: 'Chest' },
    { id: 'upper-chest', label: 'Upper Chest' },
    { id: 'middle-chest', label: 'Middle Chest' },
    { id: 'lower-chest', label: 'Lower Chest' },
    { id: 'back', label: 'Back' },
    { id: 'upper-back', label: 'Upper Back' },
    { id: 'middle-back', label: 'Middle Back' },
    { id: 'lower-back', label: 'Lower Back' },
    { id: 'lats', label: 'Lats' },
    { id: 'rhomboids', label: 'Rhomboids' },
    { id: 'traps', label: 'Traps' },
    { id: 'shoulders', label: 'Shoulders' },
    { id: 'front-deltoids', label: 'Front Deltoids' },
    { id: 'side-deltoids', label: 'Side Deltoids' },
    { id: 'rear-deltoids', label: 'Rear Deltoids' },
    { id: 'anterior-deltoid', label: 'Anterior Deltoid' },
    { id: 'medial-deltoid', label: 'Medial Deltoid' },
    { id: 'posterior-deltoid', label: 'Posterior Deltoid' },
    { id: 'arms', label: 'Arms' },
    { id: 'biceps', label: 'Biceps' },
    { id: 'triceps', label: 'Triceps' },
    { id: 'forearms', label: 'Forearms' },
    { id: 'legs', label: 'Legs' },
    { id: 'quadriceps', label: 'Quadriceps' },
    { id: 'hamstrings', label: 'Hamstrings' },
    { id: 'glutes', label: 'Glutes' },
    { id: 'calves', label: 'Calves' },
    { id: 'core', label: 'Core' },
    { id: 'abs', label: 'Abs' },
    { id: 'obliques', label: 'Obliques' },
    { id: 'lower-abs', label: 'Lower Abs' },
    { id: 'cardio', label: 'Cardio' },
  ];

  const mealTypes = [
    { id: 'all', label: 'All Meal Types' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snack', label: 'Snacks' },
  ];

  const dietaryOptions = [
    { id: 'all', label: 'All Dietary Options' },
    { id: 'low-calorie', label: 'Low Calorie' },
    { id: 'high-protein', label: 'High Protein' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'keto', label: 'Keto' },
    { id: 'gluten-free', label: 'Gluten Free' },
  ];

  const bulkCutOptions = [
    { id: 'all', label: 'All Meals' },
    { id: 'bulk', label: 'Bulk Meals' },
    { id: 'cut', label: 'Cut Meals' },
  ];

  const supplementCategories = [
    { id: 'all', label: 'All Categories' },
    { id: 'muscle-growth', label: 'Muscle Growth & Strength' },
    { id: 'energy-performance', label: 'Energy & Performance' },
    { id: 'recovery-repair', label: 'Recovery & Repair' },
    { id: 'fat-loss', label: 'Fat Loss & Metabolism Support' },
    { id: 'joint-health', label: 'Joint, Bone & Tissue Health' },
    { id: 'micronutrients', label: 'Everyday Essentials / Micronutrients' },
  ];

  const filterExercises = () => {
    if (selectedBodyPart === 'all') {
      return exerciseLibrary.exercises;
    }

    return exerciseLibrary.exercises.filter((exercise) => {
      // Handle main category filters
      switch (selectedBodyPart) {
        case 'chest':
          return exercise.category && exercise.category.toLowerCase() === 'chest';
        case 'shoulders':
          return exercise.category && exercise.category.toLowerCase() === 'shoulders';
        case 'back':
          return exercise.category && exercise.category.toLowerCase() === 'back';
        case 'arms':
          return exercise.category && exercise.category.toLowerCase() === 'arms';
        case 'legs':
          return exercise.category && exercise.category.toLowerCase() === 'legs';
        case 'core':
          return exercise.category && exercise.category.toLowerCase() === 'core';
        case 'cardio':
          return exercise.category && exercise.category.toLowerCase() === 'cardio';

        // Handle chest subcategories
        case 'upper-chest':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'chest' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase() === 'upper'
          );
        case 'middle-chest':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'chest' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase() === 'middle'
          );
        case 'lower-chest':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'chest' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase() === 'lower'
          );

        // Handle shoulder subcategories
        case 'front-deltoids':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'shoulders' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase() === 'front'
          );
        case 'side-deltoids':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'shoulders' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase() === 'side'
          );
        case 'rear-deltoids':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'shoulders' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase() === 'rear'
          );

        // Handle other specific filters
        case 'biceps':
          return exercise.subCategory && exercise.subCategory.toLowerCase().includes('bicep');
        case 'triceps':
          return exercise.subCategory && exercise.subCategory.toLowerCase().includes('tricep');
        case 'forearm':
          return exercise.subCategory && exercise.subCategory.toLowerCase().includes('forearm');

        case 'quadriceps':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'legs' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase().includes('quadricep')
          );
        case 'hamstrings':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'legs' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase().includes('hamstring')
          );
        case 'glutes':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'legs' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase().includes('glute')
          );
        case 'calves':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'legs' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase().includes('calve')
          );

        // Handle abs subcategories
        case 'abs':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'core' &&
            exercise.subCategory &&
            (exercise.subCategory.toLowerCase() === 'abs' ||
              exercise.subCategory.toLowerCase() === 'lower abs')
          );
        case 'obliques':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'core' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase() === 'obliques'
          );
        case 'lower-abs':
          return (
            exercise.category &&
            exercise.category.toLowerCase() === 'core' &&
            exercise.subCategory &&
            exercise.subCategory.toLowerCase() === 'lower abs'
          );

        default:
          return false;
      }
    });
  };

  const filterMeals = () => {
    let filteredMeals = meals;

    if (!meals || meals.length === 0) {
      return [];
    }

    if (selectedMealType !== 'all') {
      filteredMeals = filteredMeals.filter(
        (meal) =>
          meal.title?.toLowerCase().includes(selectedMealType) ||
          meal.category?.toLowerCase() === selectedMealType
      );
    }

    if (selectedDietary !== 'all') {
      filteredMeals = filteredMeals.filter((meal) => {
        switch (selectedDietary) {
          case 'low-calorie':
            return meal.calories < 400;
          case 'high-protein':
            return meal.protein > 20;
          case 'vegan':
          case 'vegetarian':
          case 'keto':
          case 'gluten-free':
            return meal.tags?.includes(selectedDietary) || false;
          default:
            return true;
        }
      });
    }

    if (selectedBulkCut !== 'all') {
      filteredMeals = filteredMeals.filter((meal) => {
        // Check if meal has tags and if the selected tag is included
        return meal.tags && Array.isArray(meal.tags) && meal.tags.includes(selectedBulkCut);
      });
    }

    return filteredMeals;
  };

  const filterSupplements = () => {
    if (selectedSupplementCategory === 'all') {
      return supplements;
    }

    return supplements.filter((supplement) => {
      const categoryMap: any = {
        'muscle-growth': 'Muscle Growth & Strength',
        'energy-performance': 'Energy & Performance',
        'recovery-repair': 'Recovery & Repair',
        'fat-loss': 'Fat Loss & Metabolism Support',
        'joint-health': 'Joint, Bone & Tissue Health',
        micronutrients: 'Everyday Essentials / Micronutrients',
      };

      const targetCategory = categoryMap[selectedSupplementCategory];
      return targetCategory ? supplement.category === targetCategory : true;
    });
  };

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const resetFilters = () => {
    setSelectedBodyPart('all');
    setSelectedMealType('all');
    setSelectedDietary('all');
    setSelectedBulkCut('all');
    setSelectedSupplementCategory('all');
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  const renderExercises = () => (
    <View style={styles.sectionContent}>
      {filterExercises().map((exercise, index) => (
        <ExerciseCard
          key={`${exercise.id}-${index}`}
          exercise={{ ...exercise, variations: exercise.variations ?? [] }}
          onPress={() => setShowExerciseModal({ ...exercise, variations: exercise.variations ?? [] })}
        />
      ))}

      {/* Exercise Detail Modal */}
      {showExerciseModal && (
        <ExerciseDetailModal exercise={showExerciseModal} visible={true} onClose={() => setShowExerciseModal(null)} />
      )}
    </View>
  );

  const renderMeals = () => (
    <View style={styles.sectionContent}>
      {filterMeals().map((meal, index) => (
        <MealCard
          key={`${meal.id}-${index}`}
          id={meal.id}
          title={meal.title}
          prepTime={meal.prepTime}
          servings={meal.servings}
          calories={meal.calories}
          protein={meal.protein}
          carbs={meal.carbs}
          fat={meal.fat}
          imageUrl={meal.imageUrl}
          ingredients={meal.ingredients}
          instructions={meal.instructions}
          nutritionalInfo={{
            calories: meal.calories,
            protein: meal.protein,
            carbs: meal.carbs,
            fat: meal.fat,
          }}
          isFavorite={favorites.includes(meal.id)}
          onToggleFavorite={toggleFavorite}
          onPress={() => {}}
        />
      ))}
    </View>
  );

  const renderSupplements = () => (
    <View style={styles.sectionContent}>
      {filterSupplements().map((supplement) => (
        <View key={supplement.id} style={styles.homeCard}>
          <View style={styles.cardAccent} />
          <Text style={TYPOGRAPHY.headingSmall}>{supplement.name}</Text>
          <Text style={styles.supplementCategory}>{supplement.category}</Text>
          <Text style={styles.supplementDescription} numberOfLines={2}>
            {supplement.description}
          </Text>

          <View style={styles.supplementBenefits}>
            {supplement.benefits.slice(0, 2).map((benefit, index) => (
              <View key={index} style={styles.benefitTag}>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.supplementDosage}>Dosage: {supplement.dosage}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Home-style banner header */}
      <View style={styles.bannerWrap}>
        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.brand}>LiftingIrons</Text>
            <Text style={styles.hello}>Library 📚</Text>
            <Text style={styles.date}>{niceDateLabel()}</Text>
          </View>
          <View style={styles.streakPill}>
            <Text style={styles.streakEmoji}>📚</Text>
            <Text style={styles.streakValue}>
              {activeSection === 'exercises' ? 'EXERCISES' : activeSection === 'meals' ? 'MEALS' : 'SUPPS'}
            </Text>
            <Text style={styles.streakSmall}>browse</Text>
          </View>
        </View>
      </View>

      {/* Section Tabs (Home-style chips) */}
      <View style={styles.tabsWrap}>
        <View style={styles.tabsCard}>
          <View style={styles.cardAccent} />
          <View style={styles.sectionTabs}>
            {sections.map((section) => (
              <WebSafeTouchableOpacity
                key={section.id}
                style={[styles.sectionTab, activeSection === section.id && styles.activeSectionTab]}
                onPress={() => setActiveSection(section.id)}
              >
                <section.icon
                  size={18}
                  color={activeSection === section.id ? COLORS.white : COLORS.textSecondary}
                />
                <Text style={[styles.sectionTabText, activeSection === section.id && styles.activeSectionTabText]}>
                  {section.label}
                </Text>
              </WebSafeTouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Filter Button */}
      {(activeSection === 'exercises' || activeSection === 'meals' || activeSection === 'supplements') && (
        <View style={styles.filterWrap}>
          <View style={styles.filterCard}>
            <View style={styles.cardAccent} />

            <View style={styles.filterRow}>
              <WebSafeTouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
                <Text style={styles.filterButtonText}>
                  {activeSection === 'exercises'
                    ? 'Filter by Body Part'
                    : activeSection === 'meals'
                      ? 'Filter Meals'
                      : 'Filter Supplements'}
                </Text>
                <ChevronDown size={16} color={COLORS.primary} />
              </WebSafeTouchableOpacity>

              <WebSafeTouchableOpacity style={styles.resetButton} onPress={resetFilters}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </WebSafeTouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {activeSection === 'exercises' && renderExercises()}
        {activeSection === 'meals' && renderMeals()}
        {activeSection === 'supplements' && renderSupplements()}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              {/* ✅ FIX: constrain long titles so X never gets pushed off-screen */}
              <Text
                style={[TYPOGRAPHY.headingMedium, styles.modalTitle]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {activeSection === 'exercises'
                  ? 'Filter Exercises'
                  : activeSection === 'meals'
                    ? 'Filter Meals'
                    : 'Filter Supplements'}
              </Text>

              <WebSafeTouchableOpacity onPress={() => setShowFilterModal(false)} style={styles.closeButton}>
                <Close size={24} color={COLORS.text} />
              </WebSafeTouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              {activeSection === 'exercises' && (
                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>Body Part</Text>
                  {bodyParts.map((bodyPart) => (
                    <WebSafeTouchableOpacity
                      key={bodyPart.id}
                      style={[
                        styles.filterOption,
                        selectedBodyPart === bodyPart.id && styles.selectedFilterOption,
                      ]}
                      onPress={() => setSelectedBodyPart(bodyPart.id)}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          selectedBodyPart === bodyPart.id && styles.selectedFilterText,
                        ]}
                      >
                        {bodyPart.label}
                      </Text>
                    </WebSafeTouchableOpacity>
                  ))}
                </View>
              )}

              {activeSection === 'meals' && (
                <>
                  <View style={styles.bulkCutSection}>
                    <Text style={styles.filterSectionTitle}>Meal Goals</Text>
                    <View style={styles.bulkCutButtons}>
                      {bulkCutOptions.map((option) => (
                        <WebSafeTouchableOpacity
                          key={option.id}
                          style={[
                            styles.bulkCutButton,
                            selectedBulkCut === option.id && styles.selectedBulkCutButton,
                          ]}
                          onPress={() => setSelectedBulkCut(option.id)}
                        >
                          <Text
                            style={[
                              styles.bulkCutButtonText,
                              selectedBulkCut === option.id && styles.selectedBulkCutText,
                            ]}
                          >
                            {option.label}
                          </Text>
                        </WebSafeTouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.filterSection}>
                    <Text style={styles.filterSectionTitle}>Meal Type</Text>
                    {mealTypes.map((mealType) => (
                      <WebSafeTouchableOpacity
                        key={mealType.id}
                        style={[
                          styles.filterOption,
                          selectedMealType === mealType.id && styles.selectedFilterOption,
                        ]}
                        onPress={() => setSelectedMealType(mealType.id)}
                      >
                        <Text
                          style={[
                            styles.filterOptionText,
                            selectedMealType === mealType.id && styles.selectedFilterText,
                          ]}
                        >
                          {mealType.label}
                        </Text>
                      </WebSafeTouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.filterSection}>
                    <Text style={styles.filterSectionTitle}>Dietary Options</Text>
                    {dietaryOptions.map((dietary) => (
                      <WebSafeTouchableOpacity
                        key={dietary.id}
                        style={[
                          styles.filterOption,
                          selectedDietary === dietary.id && styles.selectedFilterOption,
                        ]}
                        onPress={() => setSelectedDietary(dietary.id)}
                      >
                        <Text
                          style={[
                            styles.filterOptionText,
                            selectedDietary === dietary.id && styles.selectedFilterText,
                          ]}
                        >
                          {dietary.label}
                        </Text>
                      </WebSafeTouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              {activeSection === 'supplements' && (
                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>Supplement Category</Text>
                  {supplementCategories.map((category) => (
                    <WebSafeTouchableOpacity
                      key={category.id}
                      style={[
                        styles.filterOption,
                        selectedSupplementCategory === category.id && styles.selectedFilterOption,
                      ]}
                      onPress={() => setSelectedSupplementCategory(category.id)}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          selectedSupplementCategory === category.id && styles.selectedFilterText,
                        ]}
                      >
                        {category.label}
                      </Text>
                    </WebSafeTouchableOpacity>
                  ))}
                </View>
              )}

              <View style={styles.modalButtons}>
                <Button
                  title="Reset Filters"
                  onPress={resetFilters}
                  variant="outline"
                  size="medium"
                  style={styles.modalButton}
                />
                <Button
                  title="Apply Filters"
                  onPress={applyFilters}
                  variant="primary"
                  size="medium"
                  style={styles.modalButton}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Home-style banner
  bannerWrap: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  banner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 24,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  brand: {
    ...TYPOGRAPHY.headingLarge,
    color: 'white',
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  hello: {
    ...TYPOGRAPHY.headingMedium,
    color: 'white',
    marginTop: 6,
  },
  date: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.92)',
    marginTop: 6,
  },
  streakPill: {
    width: 92,
    borderRadius: 18,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakEmoji: { color: 'white', fontSize: 16, marginBottom: 2 },
  streakValue: { color: 'white', fontSize: 12, fontWeight: '900' },
  streakSmall: { color: 'rgba(255,255,255,0.9)', fontSize: 12, marginTop: 2 },

  // Home-style card wrappers for tabs/filter
  tabsWrap: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  filterWrap: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  tabsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },
  filterCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },
  homeCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.9,
  },

  // Tabs (chip style)
  sectionTabs: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  sectionTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeSectionTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sectionTabText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  activeSectionTabText: {
    color: COLORS.white,
  },

  content: {
    paddingBottom: SPACING.xxxl,
  },
  sectionContent: {
    padding: SPACING.md,
  },

  // Filter row
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    paddingHorizontal: SPACING.md,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterButtonText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: SPACING.md,
    backgroundColor: 'transparent',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  resetButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.error,
  },

  // Supplements (inside homeCard)
  supplementCategory: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  supplementDescription: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  supplementBenefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  benefitTag: {
    backgroundColor: COLORS.primaryLight + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
  },
  benefitText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.primary,
  },
  supplementDosage: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    marginTop: SPACING.sm,
    fontWeight: '500',
  },

  // Modal
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
    gap: SPACING.sm, // ✅ tiny improvement so things don’t collide
  },

  // ✅ NEW: title can shrink + wrap instead of pushing the X off-screen
  modalTitle: {
    flex: 1,
    minWidth: 0,
  },

  closeButton: {
    padding: SPACING.sm,
    flexShrink: 0, // ✅ keeps X visible
  },
  modalScroll: {
    flex: 1,
    padding: SPACING.md,
  },
  filterSection: {
    marginBottom: SPACING.xl,
  },
  filterSectionTitle: {
    ...TYPOGRAPHY.headingSmall,
    marginBottom: SPACING.md,
    color: COLORS.primary,
  },
  filterOption: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedFilterOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterOptionText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },
  selectedFilterText: {
    color: COLORS.white,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  modalButton: {
    flex: 1,
  },
  bulkCutSection: {
    marginBottom: SPACING.xl,
  },
  bulkCutButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  bulkCutButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  selectedBulkCutButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  bulkCutButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.text,
  },
  selectedBulkCutText: {
    color: COLORS.white,
  },
});

const modalStyles = StyleSheet.create({
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
    gap: SPACING.sm, // ✅ tiny improvement so things don’t collide
  },

  // ✅ NEW: title can shrink + wrap instead of pushing the X off-screen
  modalTitle: {
    flex: 1,
    minWidth: 0,
  },

  closeButton: {
    padding: SPACING.sm,
    flexShrink: 0, // ✅ keeps X visible
  },
  modalImage: {
    width: '100%',
    height: 250,
  },

  // Home-style card for sections inside the modal
  sectionCard: {
    backgroundColor: COLORS.card,
    marginTop: SPACING.md,
    marginHorizontal: SPACING.md,
    borderRadius: 22,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.9,
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
    borderRadius: 999,
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
  variationItem: {
    marginBottom: SPACING.xs,
  },
  variationText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },
});
