import { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUser } from '@/context/UserContext';
import { supabase } from '@/lib/supabase';
import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/Typography';
import { SPACING } from '@/constants/Spacing';

const NOTES_KEY = '@user_notes';

type ProfileRow = {
  id?: string; // DB row id (optional)
  user_id: string; // auth user id
  weight: number | null;
  height: number | null;
  activity_level: 'sedentary' | 'light' | 'moderate' | 'very' | null;
  avatar_url: string | null;
};

type GoalsRow = {
  primary_goal: 'weight-loss' | 'muscle-gain' | 'general-fitness' | 'athletic' | null;
};

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number | null;
};

type DayPlan = {
  dayIndex: number;
  label: string;
  focus: string;
  exercises: Exercise[];
};

type PlanRow = {
  id: string;
  title: string | null;
  plan_week_start: string | null;
  days: DayPlan[] | null;
  exercises: Exercise[] | null;
};

function prettyGoal(goal: GoalsRow['primary_goal']) {
  if (!goal) return 'Not set';
  if (goal === 'weight-loss') return 'Weight Loss';
  if (goal === 'muscle-gain') return 'Muscle Gain';
  if (goal === 'general-fitness') return 'General Fitness';
  return 'Athletic Performance';
}

function prettyActivity(a: ProfileRow['activity_level']) {
  if (!a) return 'Not set';
  if (a === 'sedentary') return 'Sedentary';
  if (a === 'light') return 'Lightly Active';
  if (a === 'moderate') return 'Moderately Active';
  return 'Very Active';
}

// ✅ RN-safe file bytes
async function uriToUint8Array(uri: string): Promise<Uint8Array> {
  const b64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' as any });
  return Uint8Array.from(Buffer.from(b64, 'base64'));
}

export default function Profile() {
  const { user, isLoading } = useUser();
  const insets = useSafeAreaInsets();

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [goals, setGoals] = useState<GoalsRow | null>(null);

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [notes, setNotes] = useState('');

  // ✅ REAL progress based on workouts/logs
  const [weekStart, setWeekStart] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(NOTES_KEY).then((saved) => {
      if (saved) setNotes(saved);
    });
  }, []);

  const saveNotes = async (text: string) => {
    setNotes(text);
    await AsyncStorage.setItem(NOTES_KEY, text);
  };

  const progressPct = useMemo(() => {
    if (!totalExercises) return 0;
    return Math.round((completedExercises / totalExercises) * 100);
  }, [completedExercises, totalExercises]);

  const rank = useMemo(() => {
    if (progressPct >= 80) return 'Pro';
    if (progressPct >= 50) return 'Intermediate';
    return 'Beginner';
  }, [progressPct]);

  const loadWorkoutProgress = async () => {
    if (!user?.id) return;

    const { data: planData, error: planErr } = await supabase
      .from('workout_plans')
      .select('id, title, plan_week_start, days, exercises')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (planErr) {
      console.error('plan load error:', planErr);
      setCompletedExercises(0);
      setTotalExercises(0);
      setWeekStart(null);
      return;
    }

    if (!planData?.id) {
      setCompletedExercises(0);
      setTotalExercises(0);
      setWeekStart(null);
      return;
    }

    const plan = planData as PlanRow;
    setWeekStart(plan.plan_week_start ?? null);

    let total = 0;
    if (Array.isArray(plan.days) && plan.days.length > 0) {
      for (const d of plan.days) total += (d.exercises ?? []).length;
    } else {
      total = (plan.exercises ?? []).length;
    }

    const { data: logsData, error: logsErr } = await supabase
      .from('workout_exercise_logs')
      .select('exercise_id, completed')
      .eq('user_id', user.id)
      .eq('plan_id', plan.id);

    if (logsErr) {
      console.error('logs load error:', logsErr);
      setCompletedExercises(0);
      setTotalExercises(total);
      return;
    }

    const completed = (logsData ?? []).filter((r: any) => r.completed === true).length;
    setCompletedExercises(completed);
    setTotalExercises(total);
  };

  const loadFromSupabase = async () => {
    if (!user?.id) return;
    setLoadingProfile(true);

    const { data: profileData, error: profileErr } = await supabase
      .from('user_profiles')
      .select('id, user_id, weight, height, activity_level, avatar_url')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profileErr) {
      console.error('profile load error:', profileErr);
      setLoadingProfile(false);
      return;
    }

    let goalsData: any = null;

    const { data: g1, error: e1 } = await supabase
      .from('fitness_goals')
      .select('primary_goal')
      .eq('user_id', user.id)
      .maybeSingle();

    if (e1) console.error('goals load error (user_id):', e1);
    goalsData = g1;

    if (!goalsData) {
      const { data: g2, error: e2 } = await supabase
        .from('fitness_goals')
        .select('primary_goal')
        .eq('id', user.id)
        .maybeSingle();

      if (e2) console.error('goals load error (id):', e2);
      goalsData = g2;
    }

    setGoals((goalsData ?? { primary_goal: null }) as GoalsRow);

    const p: ProfileRow = (profileData ?? {
      user_id: user.id,
      weight: null,
      height: null,
      activity_level: null,
      avatar_url: null,
    }) as ProfileRow;

    setProfile(p);

    setHeight(p.height != null ? String(p.height) : '');
    setWeight(p.weight != null ? String(p.weight) : '');

    await loadWorkoutProgress();

    setLoadingProfile(false);
  };

  useEffect(() => {
    if (!user?.id) return;
    loadFromSupabase();
  }, [user?.id]);

  const saveBody = async () => {
    if (!user?.id) return;

    const h = height.trim() === '' ? null : Number(height);
    const w = weight.trim() === '' ? null : Number(weight);

    if (h != null && (!Number.isFinite(h) || h <= 0 || h > 260)) {
      Alert.alert('Height looks wrong', 'Enter height in cm (e.g. 178).');
      return;
    }
    if (w != null && (!Number.isFinite(w) || w <= 0 || w > 400)) {
      Alert.alert('Weight looks wrong', 'Enter weight in kg (e.g. 82).');
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from('user_profiles')
      .upsert(
        {
          user_id: user.id,
          height: h,
          weight: w,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

    if (error) {
      console.error('save profile error:', error);
      Alert.alert('Save failed', error.message ?? 'Unknown error');
      setSaving(false);
      return;
    }

    await loadFromSupabase();
    setSaving(false);
    Alert.alert('Saved', 'Your profile has been updated.');
  };

  const pickAndUploadAvatar = async () => {
    if (!user?.id) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow photo library access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (result.canceled) return;

    try {
      setSaving(true);

      const uri = result.assets[0].uri;

      const extGuess = (uri.split('.').pop() ?? 'jpg').toLowerCase();
      const ext = ['jpg', 'jpeg', 'png', 'webp'].includes(extGuess) ? extGuess : 'jpg';

      const path = `${user.id}/avatar.${ext}`;
      const fileBody = await uriToUint8Array(uri);

      const { error: uploadErr } = await supabase.storage
        .from('avatars')
        .upload(path, fileBody, {
          contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
          upsert: true,
        });

      if (uploadErr) {
        console.error('uploadErr:', uploadErr);
        Alert.alert('Upload failed', uploadErr.message);
        setSaving(false);
        return;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(path);
      const publicUrl = data.publicUrl;

      let saveErr: any = null;

      const { error: updateErr } = await supabase
        .from('user_profiles')
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (updateErr) {
        saveErr = updateErr;
      } else {
        const { data: existing } = await supabase
          .from('user_profiles')
          .select('user_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!existing) {
          const fallbackName = (user.name ?? 'User');

          const { error: insertErr } = await supabase
            .from('user_profiles')
            .insert({
              user_id: user.id,
              name: fallbackName,
              avatar_url: publicUrl,
              updated_at: new Date().toISOString(),
              created_at: new Date().toISOString(),
            });

          if (insertErr) saveErr = insertErr;
        }
      }

      if (saveErr) {
        console.error('save avatar_url error:', saveErr);
        Alert.alert('Save failed', saveErr.message ?? 'Unknown error');
        setSaving(false);
        return;
      }

      await loadFromSupabase();
      setSaving(false);
    } catch (e: any) {
      console.error(e);
      Alert.alert('Avatar error', e?.message ?? 'Unknown error');
      setSaving(false);
    }
  };

  if (isLoading || !user) return null;

  if (loadingProfile) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.mutedCenter}>Loading profile…</Text>
      </View>
    );
  }

  const avatarUri = profile?.avatar_url ?? 'https://placekitten.com/200/200';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: SPACING.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        {/* ✅ Clean, lower header (safe area + no business name) */}
        <View style={[styles.bannerWrap, { paddingTop: insets.top + SPACING.sm }]}>
          <View style={styles.banner}>
            <View style={styles.bannerLeft}>
              <Image source={{ uri: avatarUri }} style={styles.bannerAvatar} />
              <View style={styles.nameBlock}>
                <Text style={styles.userName} numberOfLines={2}>
                  {user.name ?? 'Athlete'}
                </Text>

                <TouchableOpacity
                  style={[styles.avatarBtn, saving && { opacity: 0.7 }]}
                  onPress={pickAndUploadAvatar}
                  disabled={saving}
                >
                  <Text style={styles.avatarBtnText}>{saving ? 'Saving…' : 'Change photo'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rankPill}>
              <Text style={styles.rankLabel}>RANK</Text>
              <Text style={styles.rankValue}>{rank}</Text>
            </View>
          </View>
        </View>

        {/* Goal */}
        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>🎯 Goal</Text>
            <Text style={styles.cardMeta}>Current</Text>
          </View>
          <Text style={styles.cardValue}>{prettyGoal(goals?.primary_goal ?? null)}</Text>
        </View>

        {/* Activity */}
        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>⚡ Activity Level</Text>
            <Text style={styles.cardMeta}>Lifestyle</Text>
          </View>
          <Text style={styles.cardValue}>{prettyActivity(profile?.activity_level ?? null)}</Text>
        </View>

        {/* Height */}
        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <Text style={styles.cardTitle}>📏 Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="e.g. 178"
            keyboardType="number-pad"
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        {/* Weight */}
        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <Text style={styles.cardTitle}>⚖️ Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="e.g. 82"
            keyboardType="decimal-pad"
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, saving && { opacity: 0.7 }]}
          onPress={saveBody}
          disabled={saving}
        >
          <Text style={styles.primaryBtnText}>{saving ? 'Saving…' : 'Save changes'}</Text>
        </TouchableOpacity>

        {/* Weekly progress */}
        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>📊 Weekly workout progress</Text>
            <Text style={styles.cardMeta}>{progressPct}%</Text>
          </View>

          {!!weekStart && <Text style={styles.smallMuted}>Week of {weekStart}</Text>}

          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
          </View>

          <Text style={styles.cardValue}>
            {completedExercises}/{totalExercises} exercises completed ({progressPct}%)
          </Text>
        </View>

        {/* Notes */}
        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <Text style={styles.cardTitle}>📝 Notes</Text>
          <TextInput
            style={[styles.input, { height: 110, textAlignVertical: 'top' }]}
            value={notes}
            onChangeText={saveNotes}
            placeholder="Write your notes..."
            multiline
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },

  center: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  mutedCenter: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginTop: SPACING.sm },

  // ✅ Clean header
  bannerWrap: {
    paddingHorizontal: SPACING.lg,
  },
  banner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 24,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  bannerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    minWidth: 0, // ✅ important for text wrapping in flex rows
  },
  bannerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: COLORS.background,
  },

  nameBlock: {
    flex: 1,
    minWidth: 0, // ✅ important for text wrapping
    paddingRight: SPACING.sm,
  },

  userName: {
    ...TYPOGRAPHY.headingSmall,
    color: 'white',
    flexShrink: 1, // ✅ prevents cutting off
  },

  avatarBtn: {
    marginTop: SPACING.sm,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    alignSelf: 'flex-start',
  },
  avatarBtnText: { color: 'white', fontWeight: '800' },

  rankPill: {
    width: 92,
    borderRadius: 18,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
  },
  rankLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '800' },
  rankValue: { color: 'white', fontSize: 14, fontWeight: '900', marginTop: 2 },

  // Home-style cards
  card: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: SPACING.sm,
  },
  cardTitle: { ...TYPOGRAPHY.headingSmall, color: COLORS.text },
  cardMeta: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary },

  cardValue: { ...TYPOGRAPHY.bodyMedium, marginTop: 6, color: COLORS.text },
  smallMuted: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginTop: 4 },

  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: SPACING.sm,
    marginTop: SPACING.sm,
    color: COLORS.text,
  },

  primaryBtn: {
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  primaryBtnText: { color: '#fff', fontWeight: '800' },

  progressBarBackground: {
    height: 12,
    backgroundColor: COLORS.background,
    borderRadius: 999,
    marginTop: SPACING.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  progressBarFill: { height: 12, backgroundColor: COLORS.primaryLight, borderRadius: 999 },
});
