import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../stores/userStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { StepIndicator } from '../../components/ui/ProgressBar';

export default function OnboardingBirth() {
  const router = useRouter();
  const { onboardingData, setOnboardingField } = useUserStore();
  const [error, setError] = useState('');

  const validateDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;

    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);

    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day &&
      year >= 1900 &&
      year <= new Date().getFullYear()
    );
  };

  const formatDateInput = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
  };

  const handleNext = () => {
    if (!onboardingData.birthDate) {
      setError('생년월일을 입력해주세요');
      return;
    }
    if (!validateDate(onboardingData.birthDate)) {
      setError('올바른 날짜 형식이 아니에요 (YYYY-MM-DD)');
      return;
    }
    setError('');
    router.push('/onboarding/gender');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-6 pt-8">
          <StepIndicator currentStep={1} totalSteps={5} />

          <View className="flex-1 justify-center">
            <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
              생년월일 📅
            </Text>
            <Text className="text-gray-500 text-center mb-8">
              사주 분석에 필요해요
            </Text>

            <Input
              placeholder="YYYY-MM-DD"
              value={onboardingData.birthDate}
              onChangeText={(text) => {
                const formatted = formatDateInput(text);
                setOnboardingField('birthDate', formatted);
              }}
              error={error}
              keyboardType="number-pad"
              maxLength={10}
            />

            <View className="mt-6">
              <Input
                label="태어난 시간 (선택)"
                placeholder="HH:MM (예: 14:30)"
                value={onboardingData.birthTime || ''}
                onChangeText={(text) => setOnboardingField('birthTime', text)}
                helperText="정확한 시간을 모르면 비워두셔도 돼요"
              />
            </View>
          </View>

          <View className="flex-row gap-3 pb-8">
            <View className="flex-1">
              <Button
                title="이전"
                variant="outline"
                onPress={() => router.back()}
                fullWidth
                size="lg"
              />
            </View>
            <View className="flex-1">
              <Button
                title="다음"
                onPress={handleNext}
                fullWidth
                size="lg"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
