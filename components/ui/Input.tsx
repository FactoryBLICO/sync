import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  ...props
}) => {
  return (
    <View className="w-full">
      {label && (
        <Text className="text-gray-700 font-medium mb-2 text-base">{label}</Text>
      )}
      <TextInput
        className={`w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-900 text-base ${
          error ? 'border-2 border-red-500' : 'border border-gray-200'
        }`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
      {helperText && !error && (
        <Text className="text-gray-500 text-sm mt-1">{helperText}</Text>
      )}
    </View>
  );
};
