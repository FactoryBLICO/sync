import React, { useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../stores/userStore';
import { useRoutineStore } from '../../stores/routineStore';
import { RoutineCard } from '../../components/cards/RoutineCard';

export default function RoutineScreen() {
  const { user } = useUserStore();

  // Separate actions from state
  const ensureTodayRoutine = useRoutineStore((state) => state.ensureTodayRoutine);
  const routine = useRoutineStore((state) => state.getTodayRoutine(user?.id ?? ''));
  const toggleTask = useRoutineStore((state) => state.toggleTask);
  const checkAndAwardBadges = useRoutineStore((state) => state.checkAndAwardBadges);
  const badges = useRoutineStore((state) => state.badges);

  // Move side effect to useEffect
  useEffect(() => {
    if (user) {
      ensureTodayRoutine(user.id, user.constitution);
    }
  }, [user?.id, user?.constitution, ensureTodayRoutine]);

  if (!user) return null;

  // Show loading state if routine not ready
  if (!routine) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text>로딩 중...</Text>
      </SafeAreaView>
    );
  }

  const handleToggleTask = (taskId: number) => {
    toggleTask(routine.id, taskId);

    // Check for new badges after task completion
    setTimeout(() => {
      const newBadges = checkAndAwardBadges(user.id);
      if (newBadges.length > 0) {
        Alert.alert(
          '🎉 축하합니다!',
          `새로운 뱃지를 획득했습니다: ${newBadges.map((b) => b.name).join(', ')}`,
          [{ text: '확인' }]
        );
      }
    }, 500);
  };

  const completedDays = useRoutineStore
    .getState()
    .getRoutineHistory(user.id)
    .filter((r) => r.completionRate === 100).length;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="py-4">
          <Text className="text-2xl font-bold text-gray-800">
            오늘의 루틴 ✨
          </Text>
          <Text className="text-gray-500 mt-1">
            {user.constitution}에게 맞는 건강 루틴이에요
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-indigo-50 rounded-2xl p-4">
            <Text className="text-indigo-600 text-sm">오늘 달성률</Text>
            <Text className="text-indigo-800 text-2xl font-bold">
              {routine.completionRate}%
            </Text>
          </View>
          <View className="flex-1 bg-green-50 rounded-2xl p-4">
            <Text className="text-green-600 text-sm">완료한 날</Text>
            <Text className="text-green-800 text-2xl font-bold">
              {completedDays}일
            </Text>
          </View>
        </View>

        {/* Routine Card */}
        <RoutineCard
          tasks={routine.tasks}
          completionRate={routine.completionRate}
          onToggleTask={handleToggleTask}
        />

        {/* Badges Section */}
        <View className="mt-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            내 뱃지 🏆
          </Text>
          {badges.length > 0 ? (
            <View className="flex-row flex-wrap gap-2">
              {badges.map((badge) => (
                <View
                  key={badge.id}
                  className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3"
                >
                  <Text className="text-yellow-800 font-bold">{badge.name}</Text>
                  <Text className="text-yellow-600 text-xs">
                    {badge.description}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View className="bg-gray-100 rounded-xl p-4">
              <Text className="text-gray-500 text-center">
                아직 획득한 뱃지가 없어요.{'\n'}
                루틴을 완료하고 뱃지를 모아보세요!
              </Text>
            </View>
          )}
        </View>

        {/* Tips */}
        <View className="bg-white rounded-3xl p-5 mb-6 border border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            💡 {user.constitution} 건강 팁
          </Text>
          <Text className="text-gray-600 leading-6">
            {user.constitution === '소양인' &&
              '열이 많으니 시원한 음식과 충분한 휴식으로 열을 식혀주세요.'}
            {user.constitution === '소음인' &&
              '몸이 차가우니 따뜻한 음식과 가벼운 운동으로 체온을 높여주세요.'}
            {user.constitution === '태양인' &&
              '기가 위로 올라가기 쉬우니 담백한 음식과 명상으로 마음을 가라앉혀주세요.'}
            {user.constitution === '태음인' &&
              '땀을 내는 운동과 과식을 피하는 것이 건강의 핵심이에요.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
