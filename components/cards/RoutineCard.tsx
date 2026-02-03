import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RoutineTask } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';

interface RoutineCardProps {
  tasks: RoutineTask[];
  completionRate: number;
  onToggleTask: (taskId: number) => void;
}

export const RoutineCard: React.FC<RoutineCardProps> = ({
  tasks,
  completionRate,
  onToggleTask,
}) => {
  return (
    <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold text-gray-800">오늘의 루틴</Text>
        <View className="bg-indigo-100 px-3 py-1 rounded-full">
          <Text className="text-indigo-700 font-semibold">
            {tasks.filter((t) => t.done).length}/{tasks.length}
          </Text>
        </View>
      </View>

      <ProgressBar progress={completionRate} color="indigo" height={6} />

      <View className="mt-4 gap-2">
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            onPress={() => onToggleTask(task.id)}
            className={`flex-row items-center p-3 rounded-xl ${
              task.done ? 'bg-green-50' : 'bg-gray-50'
            }`}
          >
            <View
              className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${
                task.done ? 'bg-green-500' : 'border-2 border-gray-300'
              }`}
            >
              {task.done && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
            <Text
              className={`flex-1 ${
                task.done
                  ? 'text-gray-500 line-through'
                  : 'text-gray-800'
              }`}
            >
              {task.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
