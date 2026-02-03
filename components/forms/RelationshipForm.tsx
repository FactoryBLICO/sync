import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ConstitutionType, MBTIType } from '../../types';
import { Input } from '../ui/Input';
import { SelectChipGrid } from '../ui/SelectChip';
import { Button } from '../ui/Button';

const MBTI_OPTIONS = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
].map((type) => ({ value: type, label: type }));

const CONSTITUTION_OPTIONS = [
  { value: '소양인', label: '소양인' },
  { value: '소음인', label: '소음인' },
  { value: '태양인', label: '태양인' },
  { value: '태음인', label: '태음인' },
];

interface RelationshipFormData {
  partnerName: string;
  partnerBirthDate: string;
  partnerMbti: MBTIType | null;
  partnerConstitution: ConstitutionType | null;
}

interface RelationshipFormProps {
  onSubmit: (data: RelationshipFormData) => void;
  onCancel?: () => void;
}

export const RelationshipForm: React.FC<RelationshipFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<RelationshipFormData>({
    partnerName: '',
    partnerBirthDate: '',
    partnerMbti: null,
    partnerConstitution: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RelationshipFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.partnerName.trim()) {
      newErrors.partnerName = '이름을 입력해주세요';
    }
    if (!formData.partnerMbti) {
      newErrors.partnerMbti = 'MBTI를 선택해주세요';
    }
    if (!formData.partnerConstitution) {
      newErrors.partnerConstitution = '체질을 선택해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="gap-6 pb-6">
        <Input
          label="상대방 이름"
          placeholder="이름을 입력하세요"
          value={formData.partnerName}
          onChangeText={(text) =>
            setFormData({ ...formData, partnerName: text })
          }
          error={errors.partnerName}
        />

        <Input
          label="생년월일 (선택)"
          placeholder="YYYY-MM-DD"
          value={formData.partnerBirthDate}
          onChangeText={(text) =>
            setFormData({ ...formData, partnerBirthDate: text })
          }
          keyboardType="numbers-and-punctuation"
        />

        <View>
          <Text className="text-gray-700 font-medium mb-3 text-base">
            상대방 MBTI
          </Text>
          <SelectChipGrid
            options={MBTI_OPTIONS}
            value={formData.partnerMbti}
            onChange={(value) =>
              setFormData({ ...formData, partnerMbti: value as MBTIType })
            }
          />
          {errors.partnerMbti && (
            <Text className="text-red-500 text-sm mt-1">{errors.partnerMbti}</Text>
          )}
        </View>

        <View>
          <Text className="text-gray-700 font-medium mb-3 text-base">
            상대방 체질
          </Text>
          <SelectChipGrid
            options={CONSTITUTION_OPTIONS}
            value={formData.partnerConstitution}
            onChange={(value) =>
              setFormData({
                ...formData,
                partnerConstitution: value as ConstitutionType,
              })
            }
          />
          {errors.partnerConstitution && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.partnerConstitution}
            </Text>
          )}
        </View>

        <View className="gap-3 mt-4">
          <Button title="궁합 확인하기" onPress={handleSubmit} fullWidth />
          {onCancel && (
            <Button
              title="취소"
              variant="outline"
              onPress={onCancel}
              fullWidth
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};
