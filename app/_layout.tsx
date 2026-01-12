import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { UserProvider, useUser } from '@/context/UserContext';

function AppContent() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const group = segments[0]; 
    const inAuth = segments[0] === '(auth)';
    const inTabs = segments[0] === '(tabs)';
    const inOnboarding = group === '(onboarding)'

    if (!user && !inAuth) {
      router.replace('/(auth)/sign-up');
      return;
    }

    if (user && !(inTabs || inOnboarding)) {
      router.replace('/(tabs)/home');
    }
  }, [user, isLoading, segments]);

  if (isLoading) return null; // wait for user session

  return <Slot />;
}

export default function RootLayout() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
