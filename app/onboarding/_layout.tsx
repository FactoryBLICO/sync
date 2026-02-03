import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useUserStore } from '../../stores/userStore';

export default function OnboardingLayout() {
  const isOnboardingComplete = useUserStore((state) => state.isOnboardingComplete);

  // Redirect to tabs if onboarding is already completed
  if (isOnboardingComplete) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="birth" />
      <Stack.Screen name="gender" />
      <Stack.Screen name="mbti" />
      <Stack.Screen name="constitution" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
