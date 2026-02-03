import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../stores/userStore';
import { SelectChipGrid } from '../../components/ui/SelectChip';
import { Button } from '../../components/ui/Button';
import { StepIndicator } from '../../components/ui/ProgressBar';
import { MBTIType } from '../../types';

const MBTI_OPTIONS = [
  { value: 'INTJ', label: 'INTJ' },
  { value: 'INTP', label: 'INTP' },
  { value: 'ENTJ', label: 'ENTJ' },
  { value: 'ENTP', label: 'ENTP' },
  { value: 'INFJ', label: 'INFJ' },
  { value: 'INFP', label: 'INFP' },
  { value: 'ENFJ', label: 'ENFJ' },
  { value: 'ENFP', label: 'ENFP' },
  { value: 'ISTJ', label: 'ISTJ' },
  { value: 'ISFJ', label: 'ISFJ' },
  { value: 'ESTJ', label: 'ESTJ' },
  { value: 'ESFJ', label: 'ESFJ' },
  { value: 'ISTP', label: 'ISTP' },
  { value: 'ISFP', label: 'ISFP' },
  { value: 'ESTP', label: 'ESTP' },
  { value: 'ESFP', label: 'ESFP' },
];

export default function OnboardingMBTI() {
  const router = useRouter();
  const { onboardingData, setOnboardingField } = useUserStore();

  const handleNext = () => {
    if (onboardingData.mbti) {
      router.push('/onboarding/constitution');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-8">
        <StepIndicator currentStep={3} totalSteps={5} />

        <View className="mt-8 mb-6">
          <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
            MBTI 선택 🧠
          </Text>
          <Text className="text-gray-500 text-center">
            성격 유형에 맞는 피드백을 드릴게요
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <SelectChipGrid
            options={MBTI_OPTIONS}
            value={onboardingData.mbti}
            onChange={(value) => setOnboardingField('mbti', value as MBTIType)}
          />
        </ScrollView>

        <View className="flex-row gap-3 pb-8 pt-4">
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
              disabled={!onboardingData.mbti}
              fullWidth
              size="lg"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
