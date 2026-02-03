import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUserStore } from '../stores/userStore';
import { useRouter, useSegments } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  const { isOnboardingComplete } = useUserStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inOnboarding = segments[0] === 'onboarding';

    if (!isOnboardingComplete && !inOnboarding) {
      router.replace('/onboarding');
    } else if (isOnboardingComplete && inOnboarding) {
      router.replace('/(tabs)');
    }
  }, [isOnboardingComplete, segments]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen
          name="checkin"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
