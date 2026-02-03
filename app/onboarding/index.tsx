import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../stores/userStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { StepIndicator } from '../../components/ui/ProgressBar';

export default function OnboardingNickname() {
  const router = useRouter();
  const { onboardingData, setOnboardingField } = useUserStore();
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!onboardingData.nickname.trim()) {
      setError('닉네임을 입력해주세요');
      return;
    }
    if (onboardingData.nickname.length < 2) {
      setError('닉네임은 2자 이상이어야 해요');
      return;
    }
    setError('');
    router.push('/onboarding/birth');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-6 pt-8">
          <StepIndicator currentStep={0} totalSteps={5} />

          <View className="flex-1 justify-center">
            <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
              반가워요! 👋
            </Text>
            <Text className="text-gray-500 text-center mb-8">
              무엇이라고 불러드릴까요?
            </Text>

            <Input
              placeholder="닉네임을 입력하세요"
              value={onboardingData.nickname}
              onChangeText={(text) => setOnboardingField('nickname', text)}
              error={error}
              maxLength={10}
              autoFocus
            />
          </View>

          <View className="pb-8">
            <Button
              title="다음"
              onPress={handleNext}
              fullWidth
              size="lg"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
