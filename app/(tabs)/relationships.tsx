import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../stores/userStore';
import { useRelationshipStore } from '../../stores/relationshipStore';
import { CompatibilityCard } from '../../components/cards/CompatibilityCard';
import { RelationshipForm } from '../../components/forms/RelationshipForm';
import { Button } from '../../components/ui/Button';
import { MBTIType, ConstitutionType } from '../../types';

export default function RelationshipsScreen() {
  const [showForm, setShowForm] = useState(false);
  const { user } = useUserStore();
  const { getRelationships, addRelationship, removeRelationship } =
    useRelationshipStore();

  if (!user) return null;

  const relationships = getRelationships(user.id);

  const handleAddRelationship = (data: {
    partnerName: string;
    partnerBirthDate: string;
    partnerMbti: MBTIType | null;
    partnerConstitution: ConstitutionType | null;
  }) => {
    if (!data.partnerMbti || !data.partnerConstitution) return;

    addRelationship(
      user.id,
      user.constitution,
      user.mbti as MBTIType,
      data.partnerName,
      data.partnerBirthDate,
      data.partnerMbti,
      data.partnerConstitution
    );

    setShowForm(false);
  };

  const handleDeleteRelationship = (id: string, name: string) => {
    Alert.alert(
      '삭제 확인',
      `${name}님과의 궁합 정보를 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => removeRelationship(id),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="py-4">
          <Text className="text-2xl font-bold text-gray-800">
            궁합 보기 💕
          </Text>
          <Text className="text-gray-500 mt-1">
            체질과 MBTI로 보는 우리의 궁합
          </Text>
        </View>

        {/* My Info Card */}
        <View className="bg-indigo-50 rounded-3xl p-5 mb-4 border border-indigo-100">
          <Text className="text-indigo-800 font-bold text-lg mb-2">
            나의 정보
          </Text>
          <View className="flex-row gap-4">
            <View>
              <Text className="text-indigo-600 text-sm">체질</Text>
              <Text className="text-indigo-900 font-semibold">
                {user.constitution}
              </Text>
            </View>
            <View>
              <Text className="text-indigo-600 text-sm">MBTI</Text>
              <Text className="text-indigo-900 font-semibold">{user.mbti}</Text>
            </View>
          </View>
        </View>

        {/* Add Button */}
        <View className="mb-4">
          <Button
            title="+ 새로운 궁합 확인하기"
            onPress={() => setShowForm(true)}
            fullWidth
          />
        </View>

        {/* Relationships List */}
        {relationships.length > 0 ? (
          <View className="gap-4 mb-6">
            {relationships.map((rel) => (
              <CompatibilityCard
                key={rel.id}
                relationship={rel}
                onDelete={() => handleDeleteRelationship(rel.id, rel.partnerName)}
              />
            ))}
          </View>
        ) : (
          <View className="bg-white rounded-3xl p-8 items-center border border-gray-100">
            <Text className="text-5xl mb-4">💑</Text>
            <Text className="text-gray-800 font-bold text-lg mb-2">
              아직 등록된 궁합이 없어요
            </Text>
            <Text className="text-gray-500 text-center">
              상대방의 정보를 입력하고{'\n'}
              체질 + MBTI 궁합을 확인해보세요!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add Relationship Modal */}
      <Modal
        visible={showForm}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowForm(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 px-5 pt-4">
            <Text className="text-2xl font-bold text-gray-800 mb-6">
              궁합 확인하기
            </Text>
            <RelationshipForm
              onSubmit={handleAddRelationship}
              onCancel={() => setShowForm(false)}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
