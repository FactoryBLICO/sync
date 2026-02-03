import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../stores/userStore';
import { SelectChip } from '../../components/ui/SelectChip';
import { Button } from '../../components/ui/Button';
import { StepIndicator } from '../../components/ui/ProgressBar';

const GENDER_OPTIONS = [
  { value: 'M', label: '남성', emoji: '👨' },
  { value: 'F', label: '여성', emoji: '👩' },
];

export default function OnboardingGender() {
  const router = useRouter();
  const { onboardingData, setOnboardingField } = useUserStore();

  const handleNext = () => {
    if (onboardingData.gender) {
      router.push('/onboarding/mbti');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-8">
        <StepIndicator currentStep={2} totalSteps={5} />

        <View className="flex-1 justify-center">
          <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
            성별 선택 🌟
          </Text>
          <Text className="text-gray-500 text-center mb-8">
            맞춤 분석을 위해 선택해주세요
          </Text>

          <SelectChip
            options={GENDER_OPTIONS}
            value={onboardingData.gender}
            onChange={(value) => setOnboardingField('gender', value as 'M' | 'F')}
          />
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
              disabled={!onboardingData.gender}
              fullWidth
              size="lg"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
