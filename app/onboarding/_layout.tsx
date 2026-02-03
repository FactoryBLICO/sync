import React from 'react';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
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
