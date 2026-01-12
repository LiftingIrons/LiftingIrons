import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/Colors';

type TabIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: 'transparent',
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: TabIconProps) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* WORKOUT PLAN */}
      <Tabs.Screen
        name="exercise-plan"
        options={{
          title: 'Workout',
          tabBarIcon: ({ color, size }: TabIconProps) => (
            <MaterialCommunityIcons
              name="dumbbell"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* MEAL PLAN */}
      <Tabs.Screen
        name="meal-plan"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color, size }: TabIconProps) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />

      {/* LIBRARY */}
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }: TabIconProps) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: TabIconProps) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

            {/* HIDDEN: Food logging flow screens (not in tab bar) */}
{/* HIDDEN: Food logging flow screens (not in tab bar) */}
<Tabs.Screen name="food-scan" options={{ href: null }} />
<Tabs.Screen name="food-search" options={{ href: null }} />
<Tabs.Screen name="food-confirm" options={{ href: null }} />


    </Tabs>
  );
}
