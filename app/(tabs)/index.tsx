import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../stores/userStore';
import { useCheckInStore } from '../../stores/checkInStore';
import { useRoutineStore } from '../../stores/routineStore';
import { FOODS_BY_CONSTITUTION } from '../../constants/foods';
import { getMBTITone } from '../../constants/mbtiTones';
import { ProgressBar } from '../../components/ui/ProgressBar';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const { getTodayCheckIn, getStreak } = useCheckInStore();

  if (!user) return null;

  const todayCheckIn = getTodayCheckIn(user.id);
  const streak = getStreak(user.id);
  const routine = useRoutineStore((state) =>
    state.ensureTodayRoutine(user.id, user.constitution)
  );
  const tone = getMBTITone(user.mbti as any);
  const foodInfo = FOODS_BY_CONSTITUTION[user.constitution];

  const handleStartCheckIn = () => {
    router.push('/checkin');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="py-4">
          <Text className="text-2xl font-bold text-gray-800">
            안녕하세요, {user.nickname}님 👋
          </Text>
          <Text className="text-gray-500 mt-1">
            {user.constitution} · {user.mbti}
          </Text>
        </View>

        {/* Today's Check-in Card */}
        <TouchableOpacity
          onPress={handleStartCheckIn}
          className={`rounded-3xl p-5 mb-4 ${
            todayCheckIn ? 'bg-green-50 border border-green-200' : 'bg-indigo-600'
          }`}
          activeOpacity={0.8}
        >
          {todayCheckIn ? (
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
                <Ionicons name="checkmark-circle" size={28} color="#22C55E" />
              </View>
              <View className="flex-1">
                <Text className="text-green-800 font-bold text-lg">
                  오늘의 체크인 완료!
                </Text>
                <Text className="text-green-600 text-sm">
                  {streak}일 연속 체크인 중 🔥
                </Text>
              </View>
            </View>
          ) : (
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4">
                <Ionicons name="sunny-outline" size={28} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-lg">
                  오늘의 컨디션 체크
                </Text>
                <Text className="text-white/80 text-sm">
                  탭하여 AI 피드백 받기
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>
          )}
        </TouchableOpacity>

        {/* Today's Routine Summary */}
        <View className="bg-white rounded-3xl p-5 mb-4 border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-800">오늘의 루틴</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/routine')}>
              <Text className="text-indigo-600 font-medium">전체보기</Text>
            </TouchableOpacity>
          </View>
          <ProgressBar progress={routine.completionRate} showLabel />
          <Text className="text-gray-500 text-sm mt-2">
            {routine.tasks.filter((t) => t.done).length}/{routine.tasks.length} 완료
          </Text>
        </View>

        {/* AI Greeting */}
        <View className="bg-gradient-to-br bg-indigo-50 rounded-3xl p-5 mb-4 border border-indigo-100">
          <View className="flex-row items-start">
            <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center mr-3">
              <Text className="text-xl">🌟</Text>
            </View>
            <View className="flex-1">
              <Text className="text-indigo-900 font-medium text-sm mb-1">
                오늘의 메시지
              </Text>
              <Text className="text-gray-700 leading-6">
                {tone.greeting}
              </Text>
            </View>
          </View>
        </View>

        {/* Constitution Food Tips */}
        <View className="bg-white rounded-3xl p-5 mb-6 border border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            {user.constitution} 맞춤 음식
          </Text>
          <Text className="text-gray-600 text-sm mb-4">
            {foodInfo.description}
          </Text>

          <View className="flex-row gap-3">
            <View className="flex-1 bg-green-50 rounded-xl p-3">
              <Text className="text-green-800 font-medium text-sm mb-2">
                👍 좋은 음식
              </Text>
              <Text className="text-green-700 text-sm">
                {foodInfo.good.slice(0, 4).join(', ')}
              </Text>
            </View>
            <View className="flex-1 bg-red-50 rounded-xl p-3">
              <Text className="text-red-800 font-medium text-sm mb-2">
                👎 피할 음식
              </Text>
              <Text className="text-red-700 text-sm">
                {foodInfo.bad.slice(0, 4).join(', ')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
