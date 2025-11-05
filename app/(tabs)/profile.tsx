import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  SafeAreaView,
  Modal,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, Trophy, Ruler, Weight, Target, Bell, Shield, LogOut, Calendar, Activity, X as Close, Plus, CreditCard as Edit3, Trash2, Scale } from 'lucide-react-native';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { COLORS } from '@/constants/Colors';
import { SPACING, BORDER_RADIUS } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { useUser } from '@/context/UserContext';
import WebSafeTouchableOpacity from '@/components/WebSafeTouchableOpacity';

interface Note {
  id: string;
  text: string;
  timestamp: Date;
}

interface EditDimensionsForm {
  age: string;
  height: string;
  weight: string;
  gender: string;
}

interface EditGoalsForm {
  primary: string;
  activityLevel: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [showDimensionsModal, setShowDimensionsModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [weightHistory, setWeightHistory] = useState([
    { date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), value: user?.dimensions?.weight || 0 },
    { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), value: (user?.dimensions?.weight || 0) - 0.5 },
    { date: new Date(), value: user?.dimensions?.weight || 0 },
  ]);
  const [dimensionsForm, setDimensionsForm] = useState<EditDimensionsForm>({
    age: user?.dimensions?.age?.toString() || '',
    height: user?.dimensions?.height?.toString() || '',
    weight: user?.dimensions?.weight?.toString() || '',
    gender: user?.dimensions?.gender || '',
  });
  const [goalsForm, setGoalsForm] = useState<EditGoalsForm>({
    primary: user?.goals?.primary || '',
    activityLevel: user?.goals?.activityLevel || '',
  });

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        text: newNote.trim(),
        timestamp: new Date(),
      };
      setNotes([...notes, note]);
      setNewNote('');
      setShowNotesModal(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleAddWeight = () => {
    if (newWeight && !isNaN(Number(newWeight))) {
      const newEntry = {
        date: new Date(),
        value: Number(newWeight)
      };
      setWeightHistory([...weightHistory, newEntry]);
      setNewWeight('');
      setShowWeightModal(false);

      // Update user's current weight
      if (user) {
        setUser({
          ...user,
          dimensions: {
            ...user.dimensions,
            weight: Number(newWeight)
          }
        });
      }
    }
  };

  const handleUpdateDimensions = () => {
    if (user) {
      setUser({
        ...user,
        dimensions: {
          age: parseInt(dimensionsForm.age),
          height: parseInt(dimensionsForm.height),
          weight: parseInt(dimensionsForm.weight),
          gender: dimensionsForm.gender,
        },
      });
      setShowDimensionsModal(false);
    }
  };

  const handleUpdateGoals = () => {
    if (user) {
      setUser({
        ...user,
        goals: {
          primary: goalsForm.primary,
          activityLevel: goalsForm.activityLevel,
        },
      });
      setShowGoalsModal(false);
    }
  };

  if (!user) return null;

  const stats = [
    { 
      icon: <Calendar size={24} color={COLORS.primary} />,
      value: user.dimensions?.age || '-',
      label: 'Age'
    },
    { 
      icon: <Ruler size={24} color={COLORS.primary} />,
      value: user.dimensions?.height ? `${user.dimensions.height}cm` : '-',
      label: 'Height'
    },
    { 
      icon: <Weight size={24} color={COLORS.primary} />,
      value: user.dimensions?.weight ? `${user.dimensions.weight}kg` : '-',
      label: 'Weight'
    },
    { 
      icon: <Activity size={24} color={COLORS.primary} />,
      value: user.goals?.activityLevel || '-',
      label: 'Activity'
    }
  ];

  const menuItems = [
    { 
      icon: <Ruler size={24} color={COLORS.primary} />,
      title: 'Body Measurements',
      subtitle: 'Update your measurements',
      onPress: () => setShowDimensionsModal(true),
    },
    { 
      icon: <Target size={24} color={COLORS.primary} />,
      title: 'Goals',
      subtitle: 'Set and manage your fitness goals',
      onPress: () => setShowGoalsModal(true),
    },
    { 
      icon: <Bell size={24} color={COLORS.primary} />,
      title: 'Notifications',
      subtitle: 'Manage your alerts',
      onPress: () => {},
    },
    { 
      icon: <Shield size={24} color={COLORS.primary} />,
      title: 'Privacy',
      subtitle: 'Control your data',
      onPress: () => {},
    },
  ];

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { id: 'light', label: 'Lightly Active', description: '1-3 days/week' },
    { id: 'moderate', label: 'Moderately Active', description: '3-5 days/week' },
    { id: 'very', label: 'Very Active', description: '6-7 days/week' },
  ];

  const fitnessGoals = [
    {
      id: 'weight-loss',
      title: 'Weight Loss',
      description: 'Burn fat and achieve a leaner physique',
    },
    {
      id: 'muscle-gain',
      title: 'Muscle Gain',
      description: 'Build strength and increase muscle mass',
    },
    {
      id: 'general-fitness',
      title: 'General Fitness',
      description: 'Improve overall health and wellness',
    },
    {
      id: 'athletic',
      title: 'Athletic Performance',
      description: 'Enhance speed, agility, and power',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Your Journey"
        subtitle="Track your progress 🎯"
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg' }} 
              style={styles.profileImage} 
            />
            
            <View style={styles.profileInfo}>
              <Text style={TYPOGRAPHY.headingMedium}>{user.name}</Text>
              <Text style={styles.profileSubtitle}>
                Goal: {user.goals?.primary || 'Not set'}
              </Text>
              
              <View style={styles.statsRow}>
                {stats.map((stat, index) => (
                  <View key={index} style={styles.statItem}>
                    {stat.icon}
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          
          <WebSafeTouchableOpacity style={styles.editButton}>
            <Settings size={16} color={COLORS.textSecondary} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </WebSafeTouchableOpacity>
        </Card>

        {/* Weight Progress */}
        <View style={styles.sectionHeader}>
          <Text style={TYPOGRAPHY.headingMedium}>Weight Progress</Text>
          <WebSafeTouchableOpacity 
            style={styles.addWeightButton}
            onPress={() => setShowWeightModal(true)}
          >
            <Plus size={20} color={COLORS.primary} />
          </WebSafeTouchableOpacity>
        </View>

        <Card style={styles.weightProgressCard}>
          {Platform.OS !== 'web' && (
            <View style={styles.webChartPlaceholder}>
              <Text style={styles.webChartText}>
                Weight tracking chart temporarily disabled for stability
              </Text>
            </View>
          )}

          {Platform.OS === 'web' && (
            <View style={styles.webChartPlaceholder}>
              <Text style={styles.webChartText}>
                Weight tracking visualization is currently optimized for mobile devices
              </Text>
            </View>
          )}

          <View style={styles.weightStats}>
            <View style={styles.weightStatItem}>
              <Text style={styles.weightStatLabel}>Starting</Text>
              <Text style={styles.weightStatValue}>
                {weightHistory[0].value} kg
              </Text>
            </View>
            
            <View style={styles.weightStatItem}>
              <Text style={styles.weightStatLabel}>Current</Text>
              <Text style={styles.weightStatValue}>
                {weightHistory[weightHistory.length - 1].value} kg
              </Text>
            </View>
            
            <View style={styles.weightStatItem}>
              <Text style={styles.weightStatLabel}>Change</Text>
              <Text style={[
                styles.weightStatValue,
                { color: COLORS.success }
              ]}>
                {(weightHistory[weightHistory.length - 1].value - weightHistory[0].value).toFixed(1)} kg
              </Text>
            </View>
          </View>
        </Card>

        {/* Notes Section */}
        <View style={styles.sectionHeader}>
          <Text style={TYPOGRAPHY.headingMedium}>My Notes</Text>
          <WebSafeTouchableOpacity 
            style={styles.addNoteButton}
            onPress={() => setShowNotesModal(true)}
          >
            <Plus size={20} color={COLORS.primary} />
          </WebSafeTouchableOpacity>
        </View>

        <Card style={styles.notesCard}>
          {notes.length === 0 ? (
            <Text style={styles.emptyNotesText}>
              Add notes to track your thoughts and progress
            </Text>
          ) : (
            notes.map((note) => (
              <View key={note.id} style={styles.noteItem}>
                <View style={styles.noteBullet} />
                <Text style={styles.noteText}>{note.text}</Text>
                <WebSafeTouchableOpacity
                  onPress={() => handleDeleteNote(note.id)}
                  style={styles.deleteNote}
                >
                  <Trash2 size={16} color={COLORS.error} />
                </WebSafeTouchableOpacity>
              </View>
            ))
          )}
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={TYPOGRAPHY.headingMedium}>Current Goals</Text>
          <WebSafeTouchableOpacity style={styles.sectionIcon}>
            <Trophy size={20} color={COLORS.primary} />
          </WebSafeTouchableOpacity>
        </View>

        <Button
          title="Talk to AI Coach"
          onPress={() => {}}
          variant="primary"
          size="large"
          fullWidth
          style={styles.aiButton}
        />

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <WebSafeTouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIconContainer}>
                {item.icon}
              </View>
              
              <View style={styles.menuContent}>
                <Text style={TYPOGRAPHY.labelMedium}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </WebSafeTouchableOpacity>
          ))}
        </View>

        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="outline"
          size="large"
          fullWidth
          leftIcon={<LogOut size={18} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />}
          style={styles.logoutButton}
        />

        {/* Edit Dimensions Modal */}
        <Modal
          visible={showDimensionsModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowDimensionsModal(false)}
        >
          <View style={styles.modalContainer}>
            <SafeAreaView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={TYPOGRAPHY.headingMedium}>Update Measurements</Text>
                <WebSafeTouchableOpacity
                  onPress={() => setShowDimensionsModal(false)}
                  style={styles.closeButton}
                >
                  <Close size={24} color={COLORS.text} />
                </WebSafeTouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Age</Text>
                  <TextInput
                    style={styles.input}
                    value={dimensionsForm.age}
                    onChangeText={(text) => setDimensionsForm(prev => ({ ...prev, age: text }))}
                    keyboardType="numeric"
                    placeholder="Enter your age"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Height (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={dimensionsForm.height}
                    onChangeText={(text) => setDimensionsForm(prev => ({ ...prev, height: text }))}
                    keyboardType="numeric"
                    placeholder="Enter your height in centimeters"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    value={dimensionsForm.weight}
                    onChangeText={(text) => setDimensionsForm(prev => ({ ...prev, weight: text }))}
                    keyboardType="numeric"
                    placeholder="Enter your weight in kilograms"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Gender</Text>
                  <TextInput
                    style={styles.input}
                    value={dimensionsForm.gender}
                    onChangeText={(text) => setDimensionsForm(prev => ({ ...prev, gender: text }))}
                    placeholder="Enter your gender"
                  />
                </View>

                <Button
                  title="Save Changes"
                  onPress={handleUpdateDimensions}
                  variant="primary"
                  size="large"
                  fullWidth
                  style={styles.saveButton}
                />
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>

        {/* Edit Goals Modal */}
        <Modal
          visible={showGoalsModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowGoalsModal(false)}
        >
          <View style={styles.modalContainer}>
            <SafeAreaView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={TYPOGRAPHY.headingMedium}>Update Goals</Text>
                <WebSafeTouchableOpacity
                  onPress={() => setShowGoalsModal(false)}
                  style={styles.closeButton}
                >
                  <Close size={24} color={COLORS.text} />
                </WebSafeTouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll}>
                <Text style={styles.sectionTitle}>Primary Goal</Text>
                {fitnessGoals.map((goal) => (
                  <WebSafeTouchableOpacity
                    key={goal.id}
                    style={[
                      styles.goalOption,
                      goalsForm.primary === goal.id && styles.selectedGoalOption
                    ]}
                    onPress={() => setGoalsForm(prev => ({ ...prev, primary: goal.id }))}
                  >
                    <Text style={[
                      styles.goalTitle,
                      goalsForm.primary === goal.id && styles.selectedGoalText
                    ]}>
                      {goal.title}
                    </Text>
                    <Text style={[
                      styles.goalDescription,
                      goalsForm.primary === goal.id && styles.selectedGoalText
                    ]}>
                      {goal.description}
                    </Text>
                  </WebSafeTouchableOpacity>
                ))}

                <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>Activity Level</Text>
                {activityLevels.map((level) => (
                  <WebSafeTouchableOpacity
                    key={level.id}
                    style={[
                      styles.activityOption,
                      goalsForm.activityLevel === level.id && styles.selectedActivityOption
                    ]}
                    onPress={() => setGoalsForm(prev => ({ ...prev, activityLevel: level.id }))}
                  >
                    <Text style={[
                      styles.activityLabel,
                      goalsForm.activityLevel === level.id && styles.selectedActivityText
                    ]}>
                      {level.label}
                    </Text>
                    <Text style={[
                      styles.activityDescription,
                      goalsForm.activityLevel === level.id && styles.selectedActivityText
                    ]}>
                      {level.description}
                    </Text>
                  </WebSafeTouchableOpacity>
                ))}

                <Button
                  title="Save Changes"
                  onPress={handleUpdateGoals}
                  variant="primary"
                  size="large"
                  fullWidth
                  style={styles.saveButton}
                />
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>

        {/* Add Note Modal */}
        <Modal
          visible={showNotesModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowNotesModal(false)}
        >
          <View style={styles.modalContainer}>
            <SafeAreaView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={TYPOGRAPHY.headingMedium}>Add Note</Text>
                <WebSafeTouchableOpacity
                  onPress={() => setShowNotesModal(false)}
                  style={styles.closeButton}
                >
                  <Close size={24} color={COLORS.text} />
                </WebSafeTouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <TextInput
                  style={styles.noteInput}
                  value={newNote}
                  onChangeText={setNewNote}
                  placeholder="Enter your note..."
                  multiline
                  numberOfLines={4}
                />

                <Button
                  title="Add Note"
                  onPress={handleAddNote}
                  variant="primary"
                  size="large"
                  fullWidth
                  style={styles.saveButton}
                />
              </View>
            </SafeAreaView>
          </View>
        </Modal>

        {/* Add Weight Modal */}
        <Modal
          visible={showWeightModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowWeightModal(false)}
        >
          <View style={styles.modalContainer}>
            <SafeAreaView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={TYPOGRAPHY.headingMedium}>Add Weight</Text>
                <WebSafeTouchableOpacity
                  onPress={() => setShowWeightModal(false)}
                  style={styles.closeButton}
                >
                  <Close size={24} color={COLORS.text} />
                </WebSafeTouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <View style={styles.weightInputContainer}>
                  <Scale size={24} color={COLORS.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={newWeight}
                    onChangeText={setNewWeight}
                    keyboardType="numeric"
                    placeholder="Enter your weight in kg"
                  />
                </View>

                <Button
                  title="Save Weight"
                  onPress={handleAddWeight}
                  variant="primary"
                  size="large"
                  fullWidth
                  style={styles.saveButton}
                />
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  profileCard: {
    marginBottom: SPACING.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SPACING.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: 2,
    marginBottom: SPACING.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.text,
  },
  statLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
  },
  editButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addNoteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addWeightButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  weightProgressCard: {
    marginBottom: SPACING.lg,
  },
  webChartPlaceholder: {
    height: 220,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  webChartText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  weightStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  weightStatItem: {
    alignItems: 'center',
  },
  weightStatLabel: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  weightStatValue: {
    ...TYPOGRAPHY.headingSmall,
  },
  notesCard: {
    marginBottom: SPACING.lg,
  },
  emptyNotesText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    padding: SPACING.md,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  noteBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: SPACING.sm,
  },
  noteText: {
    ...TYPOGRAPHY.bodyMedium,
    flex: 1,
  },
  deleteNote: {
    padding: SPACING.sm,
  },
  aiButton: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  menuSection: {
    marginBottom: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  menuContent: {
    flex: 1,
  },
  menuSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    marginBottom: SPACING.lg,
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
  modalScroll: {
    padding: SPACING.md,
  },
  modalBody: {
    padding: SPACING.md,
  },
  formGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.labelMedium,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...TYPOGRAPHY.bodyMedium,
  },
  noteInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...TYPOGRAPHY.bodyMedium,
    height: 120,
    textAlignVertical: 'top',
  },
  weightInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  inputIcon: {
    marginRight: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.headingSmall,
    marginBottom: SPACING.md,
  },
  goalOption: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  selectedGoalOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  goalTitle: {
    ...TYPOGRAPHY.labelMedium,
    marginBottom: SPACING.xs,
  },
  goalDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  selectedGoalText: {
    color: COLORS.white,
  },
  activityOption: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  selectedActivityOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  activityLabel: {
    ...TYPOGRAPHY.labelMedium,
    marginBottom: 2,
  },
  activityDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  selectedActivityText: {
    color: COLORS.white,
  },
  saveButton: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
});