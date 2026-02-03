import React from 'react';
import { View, Text } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  showLabel?: boolean;
  height?: number;
  color?: 'indigo' | 'green' | 'orange' | 'red';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = false,
  height = 8,
  color = 'indigo',
}) => {
  const colorStyles = {
    indigo: 'bg-indigo-600',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View className="w-full">
      {showLabel && (
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600 text-sm">진행률</Text>
          <Text className="text-gray-800 font-medium text-sm">
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
      <View
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height }}
      >
        <View
          className={`h-full rounded-full ${colorStyles[color]}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </View>
    </View>
  );
};

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          className={`h-2 rounded-full ${
            index < currentStep
              ? 'bg-indigo-600 w-8'
              : index === currentStep
              ? 'bg-indigo-400 w-8'
              : 'bg-gray-200 w-2'
          }`}
        />
      ))}
    </View>
  );
};
