import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Relationship } from '../../types';

interface CompatibilityCardProps {
  relationship: Relationship;
  onPress?: () => void;
  onDelete?: () => void;
}

export const CompatibilityCard: React.FC<CompatibilityCardProps> = ({
  relationship,
  onPress,
  onDelete,
}) => {
  const avgScore = Math.round(
    (relationship.compatibility.constitution + relationship.compatibility.mbti) / 2
  );

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-blue-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center mr-3">
            <Text className="text-2xl">💑</Text>
          </View>
          <View>
            <Text className="text-lg font-bold text-gray-800">
              {relationship.partnerName}
            </Text>
            <Text className="text-sm text-gray-500">
              {relationship.partnerMbti} · {relationship.partnerConstitution}
            </Text>
          </View>
        </View>
        {onDelete && (
          <TouchableOpacity onPress={onDelete} className="p-2">
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row gap-3 mb-4">
        <View className={`flex-1 ${getScoreBg(relationship.compatibility.constitution)} rounded-xl p-3`}>
          <Text className="text-xs text-gray-600 mb-1">체질 궁합</Text>
          <Text className={`text-2xl font-bold ${getScoreColor(relationship.compatibility.constitution)}`}>
            {relationship.compatibility.constitution}%
          </Text>
        </View>
        <View className={`flex-1 ${getScoreBg(relationship.compatibility.mbti)} rounded-xl p-3`}>
          <Text className="text-xs text-gray-600 mb-1">MBTI 궁합</Text>
          <Text className={`text-2xl font-bold ${getScoreColor(relationship.compatibility.mbti)}`}>
            {relationship.compatibility.mbti}%
          </Text>
        </View>
      </View>

      <View className="bg-gray-50 rounded-xl p-3">
        <View className="flex-row items-center mb-2">
          <Ionicons name="restaurant-outline" size={16} color="#6B7280" />
          <Text className="text-sm font-medium text-gray-600 ml-1">
            함께 먹으면 좋은 음식
          </Text>
        </View>
        <Text className="text-gray-800">
          {relationship.foodRecommendations.safe.slice(0, 3).join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
