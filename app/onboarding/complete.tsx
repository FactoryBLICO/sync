import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../stores/userStore';
import { Button } from '../../components/ui/Button';
import { FOODS_BY_CONSTITUTION } from '../../constants/foods';

export default function OnboardingComplete() {
  const router = useRouter();
  const { onboardingData, completeOnboarding } = useUserStore();

  const foodInfo = onboardingData.constitution
    ? FOODS_BY_CONSTITUTION[onboardingData.constitution]
    : null;

  const handleComplete = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-center">
        <View className="items-center mb-8">
          <Text className="text-6xl mb-4">🎉</Text>
          <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
            환영합니다!
          </Text>
          <Text className="text-gray-500 text-center">
            {onboardingData.nickname}님의 맞춤 분석이 준비되었어요
          </Text>
        </View>

        {/* Summary Card */}
        <View className="bg-indigo-50 rounded-3xl p-6 mb-8">
          <Text className="text-lg font-bold text-indigo-900 mb-4 text-center">
            내 프로필
          </Text>

          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text className="text-indigo-700">닉네임</Text>
              <Text className="text-indigo-900 font-semibold">
                {onboardingData.nickname}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-indigo-700">생년월일</Text>
              <Text className="text-indigo-900 font-semibold">
                {onboardingData.birthDate}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-indigo-700">MBTI</Text>
              <Text className="text-indigo-900 font-semibold">
                {onboardingData.mbti}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-indigo-700">체질</Text>
              <Text className="text-indigo-900 font-semibold">
                {onboardingData.constitution}
              </Text>
            </View>
          </View>
        </View>

        {/* Constitution Info */}
        {foodInfo && (
          <View className="bg-gray-50 rounded-3xl p-5 mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              {onboardingData.constitution} 특징
            </Text>
            <Text className="text-gray-600 leading-6">
              {foodInfo.description}
            </Text>
          </View>
        )}
      </View>

      <View className="px-6 pb-8">
        <Button
          title="시작하기"
          onPress={handleComplete}
          fullWidth
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}
