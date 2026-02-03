import { ConstitutionType } from '../types';

interface ConstitutionQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    scores: Record<ConstitutionType, number>;
  }[];
}

export const CONSTITUTION_QUESTIONS: ConstitutionQuestion[] = [
  {
    id: 1,
    question: '더위와 추위 중 어느 것이 더 힘든가요?',
    options: [
      { text: '더위가 더 힘들어요', scores: { 소양인: 2, 태음인: 1, 소음인: 0, 태양인: 1 } },
      { text: '추위가 더 힘들어요', scores: { 소양인: 0, 태음인: 0, 소음인: 2, 태양인: 0 } },
      { text: '둘 다 비슷해요', scores: { 소양인: 1, 태음인: 1, 소음인: 1, 태양인: 1 } },
    ],
  },
  {
    id: 2,
    question: '평소 땀이 많이 나는 편인가요?',
    options: [
      { text: '네, 조금만 움직여도 땀이 나요', scores: { 소양인: 2, 태음인: 2, 소음인: 0, 태양인: 1 } },
      { text: '아니요, 거의 안 나요', scores: { 소양인: 0, 태음인: 0, 소음인: 2, 태양인: 1 } },
      { text: '보통이에요', scores: { 소양인: 1, 태음인: 1, 소음인: 1, 태양인: 1 } },
    ],
  },
  {
    id: 3,
    question: '소화력은 어떤가요?',
    options: [
      { text: '뭘 먹어도 잘 소화돼요', scores: { 소양인: 1, 태음인: 2, 소음인: 0, 태양인: 1 } },
      { text: '소화가 잘 안 되는 편이에요', scores: { 소양인: 0, 태음인: 0, 소음인: 2, 태양인: 2 } },
      { text: '보통이에요', scores: { 소양인: 1, 태음인: 1, 소음인: 1, 태양인: 1 } },
    ],
  },
  {
    id: 4,
    question: '체형은 어떤 편인가요?',
    options: [
      { text: '상체가 발달하고 하체가 약해요', scores: { 소양인: 2, 태음인: 0, 소음인: 0, 태양인: 2 } },
      { text: '하체가 발달하고 상체가 약해요', scores: { 소양인: 0, 태음인: 2, 소음인: 2, 태양인: 0 } },
      { text: '균형잡힌 편이에요', scores: { 소양인: 1, 태음인: 1, 소음인: 1, 태양인: 1 } },
    ],
  },
  {
    id: 5,
    question: '성격은 어떤 편인가요?',
    options: [
      { text: '급하고 활발해요', scores: { 소양인: 2, 태음인: 0, 소음인: 0, 태양인: 2 } },
      { text: '차분하고 신중해요', scores: { 소양인: 0, 태음인: 2, 소음인: 2, 태양인: 0 } },
      { text: '상황에 따라 달라요', scores: { 소양인: 1, 태음인: 1, 소음인: 1, 태양인: 1 } },
    ],
  },
  {
    id: 6,
    question: '손발이 차가운 편인가요?',
    options: [
      { text: '네, 항상 차가워요', scores: { 소양인: 0, 태음인: 0, 소음인: 2, 태양인: 0 } },
      { text: '아니요, 따뜻한 편이에요', scores: { 소양인: 2, 태음인: 1, 소음인: 0, 태양인: 1 } },
      { text: '보통이에요', scores: { 소양인: 1, 태음인: 1, 소음인: 1, 태양인: 1 } },
    ],
  },
  {
    id: 7,
    question: '대변은 어떤 편인가요?',
    options: [
      { text: '변비가 있는 편이에요', scores: { 소양인: 0, 태음인: 2, 소음인: 1, 태양인: 1 } },
      { text: '설사를 자주 해요', scores: { 소양인: 2, 태음인: 0, 소음인: 1, 태양인: 1 } },
      { text: '규칙적이에요', scores: { 소양인: 1, 태음인: 1, 소음인: 1, 태양인: 1 } },
    ],
  },
  {
    id: 8,
    question: '스트레스를 받으면 어떤가요?',
    options: [
      { text: '화가 나고 답답해요', scores: { 소양인: 2, 태음인: 1, 소음인: 0, 태양인: 2 } },
      { text: '우울하고 기운이 없어요', scores: { 소양인: 0, 태음인: 1, 소음인: 2, 태양인: 0 } },
      { text: '별로 영향 안 받아요', scores: { 소양인: 1, 태음인: 1, 소음인: 1, 태양인: 1 } },
    ],
  },
  {
    id: 9,
    question: '음식 취향은 어떤가요?',
    options: [
      { text: '시원하고 차가운 음식을 좋아해요', scores: { 소양인: 2, 태음인: 0, 소음인: 0, 태양인: 1 } },
      { text: '따뜻하고 뜨거운 음식을 좋아해요', scores: { 소양인: 0, 태음인: 1, 소음인: 2, 태양인: 0 } },
      { text: '상관없어요', scores: { 소양인: 1, 태음인: 1, 소음인: 1, 태양인: 1 } },
    ],
  },
  {
    id: 10,
    question: '피부는 어떤 편인가요?',
    options: [
      { text: '기름지고 트러블이 잘 나요', scores: { 소양인: 2, 태음인: 2, 소음인: 0, 태양인: 1 } },
      { text: '건조하고 예민해요', scores: { 소양인: 0, 태음인: 0, 소음인: 2, 태양인: 1 } },
      { text: '보통이에요', scores: { 소양인: 1, 태음인: 1, 소음인: 1, 태양인: 1 } },
    ],
  },
];

export const calculateConstitution = (answers: number[]): ConstitutionType => {
  const scores: Record<ConstitutionType, number> = {
    소양인: 0,
    소음인: 0,
    태양인: 0,
    태음인: 0,
  };

  answers.forEach((answerIndex, questionIndex) => {
    const question = CONSTITUTION_QUESTIONS[questionIndex];
    if (question && question.options[answerIndex]) {
      const selectedScores = question.options[answerIndex].scores;
      Object.keys(selectedScores).forEach((key) => {
        scores[key as ConstitutionType] += selectedScores[key as ConstitutionType];
      });
    }
  });

  const maxScore = Math.max(...Object.values(scores));
  const result = Object.entries(scores).find(([, score]) => score === maxScore);
  
  return (result?.[0] as ConstitutionType) || '태음인';
};
