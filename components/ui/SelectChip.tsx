import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';

interface SelectChipOption {
  value: string;
  label: string;
  emoji?: string;
}

interface SelectChipProps {
  options: SelectChipOption[];
  value: string | null;
  onChange: (value: string) => void;
  label?: string;
  columns?: number;
}

export const SelectChip: React.FC<SelectChipProps> = ({
  options,
  value,
  onChange,
  label,
  columns = 2,
}) => {
  return (
    <View className="w-full">
      {label && (
        <Text className="text-gray-700 font-medium mb-3 text-base">{label}</Text>
      )}
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onChange(option.value)}
              className={`px-4 py-3 rounded-xl border-2 ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-600'
                  : 'bg-white border-gray-200'
              }`}
              style={{ width: `${100 / columns - 2}%` }}
            >
              <View className="items-center">
                {option.emoji && (
                  <Text className="text-2xl mb-1">{option.emoji}</Text>
                )}
                <Text
                  className={`text-center font-medium ${
                    isSelected ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {option.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

interface SelectChipGridProps {
  options: SelectChipOption[];
  value: string | null;
  onChange: (value: string) => void;
  label?: string;
}

export const SelectChipGrid: React.FC<SelectChipGridProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  return (
    <View className="w-full">
      {label && (
        <Text className="text-gray-700 font-medium mb-3 text-base">{label}</Text>
      )}
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onChange(option.value)}
              className={`px-4 py-2 rounded-full border-2 ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-600'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text
                className={`font-medium ${
                  isSelected ? 'text-white' : 'text-gray-800'
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
