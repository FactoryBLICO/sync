import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CONSTITUTION_QUESTIONS, calculateConstitution } from '../../utils/constitution';
import { ConstitutionType } from '../../types';
import { Button } from '../ui/Button';
import { StepIndicator } from '../ui/ProgressBar';

interface ConstitutionQuizProps {
  onComplete: (constitution: ConstitutionType) => void;
  onSkip?: () => void;
}

export const ConstitutionQuiz: React.FC<ConstitutionQuizProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = CONSTITUTION_QUESTIONS[currentQuestion];
  const totalQuestions = CONSTITUTION_QUESTIONS.length;

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateConstitution(newAnswers);
      onComplete(result);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
      setAnswers(answers.slice(0, -1));
    }
  };

  return (
    <View className="flex-1">
      <View className="mb-6">
        <StepIndicator currentStep={currentQuestion} totalSteps={totalQuestions} />
        <Text className="text-center text-gray-500 mt-2">
          {currentQuestion + 1} / {totalQuestions}
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="text-xl font-bold text-gray-800 text-center mb-8">
          {question.question}
        </Text>

        <View className="gap-3">
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedOption(index)}
              className={`p-4 rounded-2xl border-2 ${
                selectedOption === index
                  ? 'bg-indigo-50 border-indigo-600'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text
                className={`text-center text-base ${
                  selectedOption === index
                    ? 'text-indigo-700 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="mt-6 gap-3">
        <View className="flex-row gap-3">
          {currentQuestion > 0 && (
            <View className="flex-1">
              <Button
                title="이전"
                variant="outline"
                onPress={handlePrevious}
                fullWidth
              />
            </View>
          )}
          <View className="flex-1">
            <Button
              title={currentQuestion === totalQuestions - 1 ? '완료' : '다음'}
              onPress={handleNext}
              disabled={selectedOption === null}
              fullWidth
            />
          </View>
        </View>

        {onSkip && currentQuestion === 0 && (
          <Button
            title="체질 테스트 건너뛰기"
            variant="ghost"
            onPress={onSkip}
            fullWidth
          />
        )}
      </View>
    </View>
  );
};
