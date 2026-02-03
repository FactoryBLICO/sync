import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../stores/userStore';
import { useCheckInStore } from '../../stores/checkInStore';
import { useRoutineStore } from '../../stores/routineStore';
import { FOODS_BY_CONSTITUTION } from '../../constants/foods';

export default function ProfileScreen() {
  const { user, resetUser } = useUserStore();
  const { getCheckInHistory, getStreak } = useCheckInStore();
  const { getRoutineHistory, badges } = useRoutineStore();

  if (!user) return null;

  const checkInHistory = getCheckInHistory(user.id);
  const routineHistory = getRoutineHistory(user.id);
  const streak = getStreak(user.id);
  const foodInfo = FOODS_BY_CONSTITUTION[user.constitution];

  const completedRoutines = routineHistory.filter(
    (r) => r.completionRate === 100
  ).length;

  const handleReset = () => {
    Alert.alert(
      '데이터 초기화',
      '모든 데이터가 삭제됩니다. 계속하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '초기화',
          style: 'destructive',
          onPress: () => resetUser(),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="py-4">
          <Text className="text-2xl font-bold text-gray-800">프로필</Text>
        </View>

        {/* Profile Card */}
        <View className="bg-white rounded-3xl p-5 mb-4 border border-gray-100">
          <View className="items-center mb-4">
            <View className="w-20 h-20 bg-indigo-100 rounded-full items-center justify-center mb-3">
              <Text className="text-4xl">
                {user.gender === 'M' ? '👨' : '👩'}
              </Text>
            </View>
            <Text className="text-xl font-bold text-gray-800">
              {user.nickname}
            </Text>
            <Text className="text-gray-500">
              {user.constitution} · {user.mbti}
            </Text>
          </View>

          <View className="flex-row border-t border-gray-100 pt-4">
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-indigo-600">
                {checkInHistory.length}
              </Text>
              <Text className="text-gray-500 text-sm">체크인</Text>
            </View>
            <View className="flex-1 items-center border-x border-gray-100">
              <Text className="text-2xl font-bold text-green-600">{streak}</Text>
              <Text className="text-gray-500 text-sm">연속</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-orange-600">
                {badges.length}
              </Text>
              <Text className="text-gray-500 text-sm">뱃지</Text>
            </View>
          </View>
        </View>

        {/* Constitution Info */}
        <View className="bg-white rounded-3xl p-5 mb-4 border border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            {user.constitution} 체질 정보
          </Text>
          <Text className="text-gray-600 mb-4">{foodInfo.description}</Text>

          <View className="gap-3">
            <View>
              <Text className="text-green-700 font-medium mb-1">
                ✅ 좋은 음식
              </Text>
              <Text className="text-gray-600">
                {foodInfo.good.join(', ')}
              </Text>
            </View>
            <View>
              <Text className="text-red-700 font-medium mb-1">
                ❌ 피할 음식
              </Text>
              <Text className="text-gray-600">
                {foodInfo.bad.join(', ')}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="bg-white rounded-3xl p-5 mb-4 border border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            내 활동 통계
          </Text>
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">총 체크인 횟수</Text>
              <Text className="font-bold text-gray-800">
                {checkInHistory.length}회
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">최장 연속 체크인</Text>
              <Text className="font-bold text-gray-800">{streak}일</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">루틴 100% 달성</Text>
              <Text className="font-bold text-gray-800">
                {completedRoutines}회
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">획득 뱃지</Text>
              <Text className="font-bold text-gray-800">{badges.length}개</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className="bg-white rounded-3xl mb-6 border border-gray-100 overflow-hidden">
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
            <Ionicons name="information-circle-outline" size={24} color="#6B7280" />
            <Text className="flex-1 ml-3 text-gray-800">앱 정보</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center p-4"
            onPress={handleReset}
          >
            <Ionicons name="refresh-outline" size={24} color="#EF4444" />
            <Text className="flex-1 ml-3 text-red-500">데이터 초기화</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
