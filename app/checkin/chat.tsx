import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../stores/userStore';
import { useCheckInStore } from '../../stores/checkInStore';
import { ChatBubble } from '../../components/cards/ChatBubble';
import { getMBTITone } from '../../constants/mbtiTones';
import { FOODS_BY_CONSTITUTION } from '../../constants/foods';
import { MBTIType } from '../../types';

export default function CheckInChat() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const { user } = useUserStore();
  const { currentCheckIn, addMessage, setFeedback } = useCheckInStore();
  const [inputText, setInputText] = useState('');
  const [chatStep, setChatStep] = useState(0);

  const tone = user ? getMBTITone(user.mbti as MBTIType) : null;
  const foodInfo = user ? FOODS_BY_CONSTITUTION[user.constitution] : null;

  const getAIResponse = (step: number, userMessage?: string) => {
    if (!user || !currentCheckIn || !tone || !foodInfo) return '';

    const moodText = {
      good: '좋다니',
      neutral: '보통이군요',
      bad: '힘드셨군요',
    }[currentCheckIn.mood];

    switch (step) {
      case 0:
        return `${tone.greeting}\n\n오늘 기분이 ${moodText}! ${
          currentCheckIn.mood === 'good'
            ? tone.encouragement
            : currentCheckIn.mood === 'bad'
            ? tone.sympathy
            : '오늘 하루 어떠셨어요?'
        }`;
      case 1:
        return `${
          currentCheckIn.mood === 'bad'
            ? tone.sympathy
            : '그랬군요!'
        }\n\n${user.constitution}인 ${user.nickname}님께 오늘의 팁을 드릴게요:\n\n${tone.advice}\n\n${foodInfo.description}`;
      case 2:
        return `오늘의 추천 음식: ${foodInfo.good.slice(0, 3).join(', ')}\n피할 음식: ${foodInfo.bad.slice(0, 2).join(', ')}\n\n${tone.closing}`;
      default:
        return tone.closing;
    }
  };

  useEffect(() => {
    // Initial AI message
    if (currentCheckIn && currentCheckIn.messages.length === 0) {
      setTimeout(() => {
        addMessage('ai', getAIResponse(0));
      }, 500);
    }
  }, [currentCheckIn]);

  useEffect(() => {
    if (currentCheckIn) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [currentCheckIn?.messages]);

  // Redirect if no user or check-in (must be in useEffect, not during render)
  useEffect(() => {
    if (!user || !currentCheckIn) {
      router.replace('/checkin');
    }
  }, [user, currentCheckIn, router]);

  // Early return AFTER all hooks
  if (!user || !currentCheckIn) {
    return null;
  }

  const handleSend = () => {
    if (!inputText.trim()) return;

    addMessage('user', inputText.trim());
    setInputText('');

    const nextStep = chatStep + 1;
    setChatStep(nextStep);

    setTimeout(() => {
      addMessage('ai', getAIResponse(nextStep, inputText.trim()));

      if (nextStep >= 2 && tone && foodInfo) {
        // Set feedback and go to result
        setFeedback({
          constitution: `${user.constitution} 체질에 맞는 조언: ${foodInfo.description}`,
          saju: `오늘의 운세: ${currentCheckIn.mood === 'good' ? '에너지가 좋은 날' : currentCheckIn.mood === 'bad' ? '휴식이 필요한 날' : '안정적인 하루'}`,
          mbti: `${user.mbti} 성향에 맞는 메시지: ${tone.encouragement}`,
        });

        setTimeout(() => {
          router.push('/checkin/result');
        }, 2000);
      }
    }, 1000);
  };

  const handleSkip = () => {
    if (!tone || !foodInfo) return;
    setFeedback({
      constitution: `${user.constitution} 체질 조언: ${foodInfo.description}`,
      saju: '오늘 하루도 건강하세요!',
      mbti: tone.encouragement,
    });
    router.push('/checkin/result');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">AI 피드백</Text>
          <TouchableOpacity onPress={handleSkip} className="p-2">
            <Text className="text-indigo-600 font-medium">건너뛰기</Text>
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
        >
          {currentCheckIn.messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </ScrollView>

        {/* Input */}
        <View className="px-4 py-3 bg-white border-t border-gray-100">
          <View className="flex-row items-center gap-2">
            <View className="flex-1 bg-gray-100 rounded-full px-4 py-2">
              <TextInput
                className="text-base text-gray-800"
                placeholder="메시지를 입력하세요..."
                placeholderTextColor="#9CA3AF"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={200}
              />
            </View>
            <TouchableOpacity
              onPress={handleSend}
              className={`w-10 h-10 rounded-full items-center justify-center ${
                inputText.trim() ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
              disabled={!inputText.trim()}
            >
              <Ionicons
                name="send"
                size={18}
                color={inputText.trim() ? 'white' : '#9CA3AF'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
