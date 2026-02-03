export interface User {
  id: string;
  nickname: string;
  birthDate: string;
  birthTime?: string;
  gender: 'M' | 'F';
  mbti: string;
  constitution: '소양인' | '소음인' | '태양인' | '태음인';
  toneStyle: 'formal' | 'casual';
  createdAt: string;
}

export interface CheckIn {
  id: string;
  userId: string;
  date: string;
  mood: 'good' | 'neutral' | 'bad';
  messages: ChatMessage[];
  feedback: {
    constitution: string;
    saju: string;
    mbti: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}

export interface Routine {
  id: string;
  userId: string;
  date: string;
  tasks: RoutineTask[];
  completionRate: number;
}

export interface RoutineTask {
  id: number;
  text: string;
  done: boolean;
}

export interface Relationship {
  id: string;
  userId: string;
  partnerName: string;
  partnerBirthDate: string;
  partnerMbti: string;
  partnerConstitution: '소양인' | '소음인' | '태양인' | '태음인';
  compatibility: {
    constitution: number;
    mbti: number;
  };
  foodRecommendations: {
    safe: string[];
    avoid: string[];
  };
}

export interface DailyPrediction {
  energy: number;
  mood: 'positive' | 'neutral' | 'negative';
  fortune: string;
  recommendation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedAt?: string;
}

export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type ConstitutionType = '소양인' | '소음인' | '태양인' | '태음인';

export interface OnboardingData {
  nickname: string;
  birthDate: string;
  birthTime?: string;
  gender: 'M' | 'F' | null;
  mbti: MBTIType | null;
  constitution: ConstitutionType | null;
}
