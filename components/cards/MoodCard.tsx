import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MoodOption {
  value: 'good' | 'neutral' | 'bad';
  emoji: string;
  label: string;
  color: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  { value: 'good', emoji: '😊', label: '좋아요', color: 'bg-green-100 border-green-400' },
  { value: 'neutral', emoji: '😐', label: '보통이에요', color: 'bg-yellow-100 border-yellow-400' },
  { value: 'bad', emoji: '😔', label: '안 좋아요', color: 'bg-red-100 border-red-400' },
];

interface MoodCardProps {
  selectedMood: 'good' | 'neutral' | 'bad' | null;
  onSelect: (mood: 'good' | 'neutral' | 'bad') => void;
}

export const MoodCard: React.FC<MoodCardProps> = ({ selectedMood, onSelect }) => {
  return (
    <View className="w-full">
      <Text className="text-xl font-bold text-gray-800 text-center mb-6">
        오늘 기분이 어떠세요?
      </Text>
      <View className="flex-row justify-center gap-4">
        {MOOD_OPTIONS.map((option) => {
          const isSelected = selectedMood === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onSelect(option.value)}
              className={`flex-1 items-center py-6 rounded-2xl border-2 ${
                isSelected ? option.color : 'bg-gray-50 border-gray-200'
              }`}
            >
              <Text className="text-4xl mb-2">{option.emoji}</Text>
              <Text
                className={`font-medium ${
                  isSelected ? 'text-gray-800' : 'text-gray-600'
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
