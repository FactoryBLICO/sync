import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../stores/userStore';
import { ConstitutionQuiz } from '../../components/forms/ConstitutionQuiz';
import { SelectChipGrid } from '../../components/ui/SelectChip';
import { Button } from '../../components/ui/Button';
import { StepIndicator } from '../../components/ui/ProgressBar';
import { ConstitutionType } from '../../types';

const CONSTITUTION_OPTIONS = [
  { value: '소양인', label: '소양인' },
  { value: '소음인', label: '소음인' },
  { value: '태양인', label: '태양인' },
  { value: '태음인', label: '태음인' },
];

export default function OnboardingConstitution() {
  const router = useRouter();
  const { onboardingData, setOnboardingField } = useUserStore();
  const [showQuiz, setShowQuiz] = useState(false);
  const [knowsConstitution, setKnowsConstitution] = useState<boolean | null>(null);

  const handleQuizComplete = (constitution: ConstitutionType) => {
    setOnboardingField('constitution', constitution);
    router.push('/onboarding/complete');
  };

  const handleManualSelect = () => {
    if (onboardingData.constitution) {
      router.push('/onboarding/complete');
    }
  };

  if (showQuiz) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 pt-8">
          <Text className="text-xl font-bold text-gray-800 text-center mb-6">
            체질 테스트 🌿
          </Text>
          <ConstitutionQuiz
            onComplete={handleQuizComplete}
            onSkip={() => setShowQuiz(false)}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (knowsConstitution === true) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 pt-8">
          <StepIndicator currentStep={4} totalSteps={5} />

          <View className="flex-1 justify-center">
            <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
              체질 선택 🌿
            </Text>
            <Text className="text-gray-500 text-center mb-8">
              알고 계신 체질을 선택해주세요
            </Text>

            <SelectChipGrid
              options={CONSTITUTION_OPTIONS}
              value={onboardingData.constitution}
              onChange={(value) =>
                setOnboardingField('constitution', value as ConstitutionType)
              }
            />
          </View>

          <View className="flex-row gap-3 pb-8">
            <View className="flex-1">
              <Button
                title="이전"
                variant="outline"
                onPress={() => setKnowsConstitution(null)}
                fullWidth
                size="lg"
              />
            </View>
            <View className="flex-1">
              <Button
                title="완료"
                onPress={handleManualSelect}
                disabled={!onboardingData.constitution}
                fullWidth
                size="lg"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-8">
        <StepIndicator currentStep={4} totalSteps={5} />

        <View className="flex-1 justify-center">
          <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
            사상체질 🌿
          </Text>
          <Text className="text-gray-500 text-center mb-8">
            사상체질을 알고 계신가요?
          </Text>

          <View className="gap-4">
            <Button
              title="네, 알고 있어요"
              onPress={() => setKnowsConstitution(true)}
              fullWidth
              size="lg"
            />
            <Button
              title="아니요, 테스트할래요"
              variant="outline"
              onPress={() => setShowQuiz(true)}
              fullWidth
              size="lg"
            />
          </View>
        </View>

        <View className="pb-8">
          <Button
            title="이전"
            variant="ghost"
            onPress={() => router.back()}
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
