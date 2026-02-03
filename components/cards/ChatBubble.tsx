import React from 'react';
import { View, Text } from 'react-native';
import { ChatMessage } from '../../types';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isAI = message.role === 'ai';

  return (
    <View
      className={`max-w-[85%] mb-3 ${isAI ? 'self-start' : 'self-end'}`}
    >
      {isAI && (
        <View className="flex-row items-center mb-1">
          <View className="w-6 h-6 bg-indigo-100 rounded-full items-center justify-center mr-2">
            <Text className="text-sm">🌟</Text>
          </View>
          <Text className="text-xs text-gray-500">싱크</Text>
        </View>
      )}
      <View
        className={`px-4 py-3 rounded-2xl ${
          isAI
            ? 'bg-white border border-gray-100 rounded-tl-md'
            : 'bg-indigo-600 rounded-tr-md'
        }`}
      >
        <Text
          className={`text-base leading-6 ${
            isAI ? 'text-gray-800' : 'text-white'
          }`}
        >
          {message.content}
        </Text>
      </View>
      <Text
        className={`text-xs text-gray-400 mt-1 ${
          isAI ? 'text-left' : 'text-right'
        }`}
      >
        {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
};
