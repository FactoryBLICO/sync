import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../stores/userStore';
import { useCheckInStore } from '../../stores/checkInStore';
import { Button } from '../../components/ui/Button';

export default function CheckInResult() {
  const router = useRouter();
  const { user } = useUserStore();
  const { currentCheckIn, completeCheckIn, getStreak } = useCheckInStore();

  // Redirect must be in useEffect, not during render
  useEffect(() => {
    if (!user || !currentCheckIn) {
      router.replace('/(tabs)');
    }
  }, [user, currentCheckIn, router]);

  if (!user || !currentCheckIn) {
    return null;
  }

  const handleComplete = () => {
    completeCheckIn();
    router.replace('/(tabs)');
  };

  const moodEmoji = {
    good: '😊',
    neutral: '😐',
    bad: '😔',
  }[currentCheckIn.mood];

  const moodText = {
    good: '좋음',
    neutral: '보통',
    bad: '안 좋음',
  }[currentCheckIn.mood];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 32 }}
      >
        {/* Success Header */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
            <Text className="text-4xl">✨</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            체크인 완료!
          </Text>
          <Text className="text-gray-500 text-center">
            오늘의 컨디션 기록이 저장되었어요
          </Text>
        </View>

        {/* Summary Card */}
        <View className="bg-gray-50 rounded-3xl p-5 mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            오늘의 기록
          </Text>

          <View className="flex-row items-center mb-4">
            <Text className="text-4xl mr-3">{moodEmoji}</Text>
            <View>
              <Text className="text-gray-500 text-sm">오늘 기분</Text>
              <Text className="text-gray-800 font-bold text-lg">{moodText}</Text>
            </View>
          </View>

          <View className="border-t border-gray-200 pt-4">
            <Text className="text-gray-500 text-sm mb-1">날짜</Text>
            <Text className="text-gray-800 font-medium">
              {new Date(currentCheckIn.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </Text>
          </View>
        </View>

        {/* Feedback Cards */}
        {currentCheckIn.feedback.constitution && (
          <View className="bg-indigo-50 rounded-3xl p-5 mb-4">
            <View className="flex-row items-center mb-3">
              <Text className="text-2xl mr-2">🌿</Text>
              <Text className="text-lg font-bold text-indigo-900">
                체질 피드백
              </Text>
            </View>
            <Text className="text-indigo-800 leading-6">
              {currentCheckIn.feedback.constitution}
            </Text>
          </View>
        )}

        {currentCheckIn.feedback.mbti && (
          <View className="bg-purple-50 rounded-3xl p-5 mb-4">
            <View className="flex-row items-center mb-3">
              <Text className="text-2xl mr-2">🧠</Text>
              <Text className="text-lg font-bold text-purple-900">
                MBTI 피드백
              </Text>
            </View>
            <Text className="text-purple-800 leading-6">
              {currentCheckIn.feedback.mbti}
            </Text>
          </View>
        )}

        {currentCheckIn.feedback.saju && (
          <View className="bg-orange-50 rounded-3xl p-5 mb-4">
            <View className="flex-row items-center mb-3">
              <Text className="text-2xl mr-2">🔮</Text>
              <Text className="text-lg font-bold text-orange-900">
                오늘의 운세
              </Text>
            </View>
            <Text className="text-orange-800 leading-6">
              {currentCheckIn.feedback.saju}
            </Text>
          </View>
        )}

        {/* Streak */}
        <View className="bg-yellow-50 rounded-3xl p-5 mb-8">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-yellow-800 font-medium">연속 체크인</Text>
              <Text className="text-yellow-900 text-2xl font-bold">
                {getStreak(user.id) + 1}일 째 🔥
              </Text>
            </View>
            <Text className="text-5xl">🏆</Text>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-8">
        <Button title="완료" onPress={handleComplete} fullWidth size="lg" />
      </View>
    </SafeAreaView>
  );
}
