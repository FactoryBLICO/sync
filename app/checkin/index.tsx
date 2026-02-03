import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../stores/userStore';
import { useCheckInStore } from '../../stores/checkInStore';
import { MoodCard } from '../../components/cards/MoodCard';
import { Button } from '../../components/ui/Button';

export default function CheckInMood() {
  const router = useRouter();
  const { user } = useUserStore();
  const { startCheckIn } = useCheckInStore();
  const [selectedMood, setSelectedMood] = useState<'good' | 'neutral' | 'bad' | null>(null);

  const handleNext = () => {
    if (selectedMood && user) {
      startCheckIn(user.id, selectedMood);
      router.push('/checkin/chat');
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center justify-between py-4">
          <TouchableOpacity onPress={handleClose} className="p-2 -ml-2">
            <Ionicons name="close" size={28} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">오늘의 체크인</Text>
          <View className="w-10" />
        </View>

        {/* Content */}
        <View className="flex-1 justify-center">
          <MoodCard selectedMood={selectedMood} onSelect={setSelectedMood} />
        </View>

        {/* Button */}
        <View className="pb-8">
          <Button
            title="다음"
            onPress={handleNext}
            disabled={!selectedMood}
            fullWidth
            size="lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
