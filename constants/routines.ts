import { ConstitutionType, RoutineTask } from '../types';

export const ROUTINE_BY_CONSTITUTION: Record<ConstitutionType, RoutineTask[]> = {
  '소양인': [
    { id: 1, text: '따뜻한 물 3잔 마시기', done: false },
    { id: 2, text: '차가운 과일 먹기 (수박, 오이)', done: false },
    { id: 3, text: '가벼운 산책 10분', done: false },
    { id: 4, text: '매운 음식 피하기', done: false },
    { id: 5, text: '충분한 휴식 취하기', done: false },
  ],
  '소음인': [
    { id: 1, text: '식물 가까이하기 (화분 보기)', done: false },
    { id: 2, text: '산책 20분', done: false },
    { id: 3, text: '따뜻한 음식 먹기 (국, 죽)', done: false },
    { id: 4, text: '찬 음식 피하기', done: false },
    { id: 5, text: '스트레칭 하기', done: false },
  ],
  '태양인': [
    { id: 1, text: '가벼운 채소 위주 식사', done: false },
    { id: 2, text: '명상 또는 심호흡 10분', done: false },
    { id: 3, text: '기름진 음식 피하기', done: false },
    { id: 4, text: '가벼운 운동 15분', done: false },
    { id: 5, text: '충분한 수분 섭취', done: false },
  ],
  '태음인': [
    { id: 1, text: '활동적인 운동 30분', done: false },
    { id: 2, text: '채소 위주 식사', done: false },
    { id: 3, text: '과식 피하기', done: false },
    { id: 4, text: '땀 흘리는 활동하기', done: false },
    { id: 5, text: '규칙적인 식사 시간 지키기', done: false },
  ],
};

export const BADGES = [
  { id: 'start', name: '시작', description: '3일 연속 루틴 달성', daysRequired: 3 },
  { id: 'habit', name: '습관', description: '7일 연속 루틴 달성', daysRequired: 7 },
  { id: 'master', name: '마스터', description: '30일 연속 루틴 달성', daysRequired: 30 },
];
