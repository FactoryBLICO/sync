import { ConstitutionType, MBTIType } from '../types';

interface CompatibilityResult {
  constitutionScore: number;
  mbtiScore: number;
  constitutionDescription: string;
  mbtiDescription: string;
}

const CONSTITUTION_COMPATIBILITY: Record<ConstitutionType, Record<ConstitutionType, { score: number; description: string }>> = {
  '소양인': {
    '소양인': { score: 70, description: '비슷한 에너지로 활발하지만, 둘 다 급해서 충돌 가능성 있어요.' },
    '소음인': { score: 95, description: '열+한의 완벽한 조화! 서로 부족한 부분을 채워줘요.' },
    '태양인': { score: 75, description: '둘 다 활동적이지만 서로 이해하기 어려울 수 있어요.' },
    '태음인': { score: 85, description: '소양인의 활발함을 태음인이 안정시켜줘요.' },
  },
  '소음인': {
    '소양인': { score: 95, description: '한+열의 완벽한 조화! 서로 부족한 부분을 채워줘요.' },
    '소음인': { score: 65, description: '서로 이해하지만, 둘 다 에너지가 낮아 침체될 수 있어요.' },
    '태양인': { score: 80, description: '태양인의 에너지가 소음인에게 활력을 줘요.' },
    '태음인': { score: 75, description: '안정적이지만 변화가 적을 수 있어요.' },
  },
  '태양인': {
    '소양인': { score: 75, description: '둘 다 활동적이지만 서로 이해하기 어려울 수 있어요.' },
    '소음인': { score: 80, description: '태양인의 에너지가 소음인에게 활력을 줘요.' },
    '태양인': { score: 60, description: '강한 에너지끼리 충돌할 수 있어요.' },
    '태음인': { score: 90, description: '태양인의 추진력과 태음인의 안정감이 조화로워요.' },
  },
  '태음인': {
    '소양인': { score: 85, description: '소양인의 활발함을 태음인이 안정시켜줘요.' },
    '소음인': { score: 75, description: '안정적이지만 변화가 적을 수 있어요.' },
    '태양인': { score: 90, description: '태양인의 추진력과 태음인의 안정감이 조화로워요.' },
    '태음인': { score: 70, description: '안정적이지만 서로 자극이 부족할 수 있어요.' },
  },
};

const MBTI_COMPATIBILITY: Record<string, { score: number; description: string }> = {
  // 이상적인 조합
  'ENTP-INFJ': { score: 95, description: '창의성과 통찰력의 환상적인 조합!' },
  'INFJ-ENTP': { score: 95, description: '창의성과 통찰력의 환상적인 조합!' },
  'ENFP-INTJ': { score: 92, description: '열정과 전략의 완벽한 밸런스!' },
  'INTJ-ENFP': { score: 92, description: '열정과 전략의 완벽한 밸런스!' },
  'INTP-ENTJ': { score: 90, description: '논리와 실행력의 강력한 팀!' },
  'ENTJ-INTP': { score: 90, description: '논리와 실행력의 강력한 팀!' },
  'INFP-ENFJ': { score: 93, description: '감성과 리더십의 따뜻한 조화!' },
  'ENFJ-INFP': { score: 93, description: '감성과 리더십의 따뜻한 조화!' },
  'ISFJ-ESFP': { score: 88, description: '안정과 활력의 좋은 균형!' },
  'ESFP-ISFJ': { score: 88, description: '안정과 활력의 좋은 균형!' },
  'ISTJ-ESTP': { score: 85, description: '원칙과 유연함의 실용적 조합!' },
  'ESTP-ISTJ': { score: 85, description: '원칙과 유연함의 실용적 조합!' },
};

const getMBTICompatibility = (mbti1: MBTIType, mbti2: MBTIType): { score: number; description: string } => {
  const key1 = `${mbti1}-${mbti2}`;
  const key2 = `${mbti2}-${mbti1}`;
  
  if (MBTI_COMPATIBILITY[key1]) return MBTI_COMPATIBILITY[key1];
  if (MBTI_COMPATIBILITY[key2]) return MBTI_COMPATIBILITY[key2];
  
  // 같은 타입
  if (mbti1 === mbti2) {
    return { score: 75, description: '서로를 잘 이해하지만, 비슷해서 성장 자극이 적을 수 있어요.' };
  }
  
  // 기본값
  const sharedLetters = mbti1.split('').filter((letter, i) => letter === mbti2[i]).length;
  const baseScore = 60 + sharedLetters * 8;
  
  return {
    score: baseScore,
    description: sharedLetters >= 2 
      ? '공통점이 있어 이해하기 쉬워요.' 
      : '다른 점이 많아 서로에게 배울 점이 많아요.',
  };
};

export const calculateCompatibility = (
  constitution1: ConstitutionType,
  constitution2: ConstitutionType,
  mbti1: MBTIType,
  mbti2: MBTIType
): CompatibilityResult => {
  const constitutionResult = CONSTITUTION_COMPATIBILITY[constitution1][constitution2];
  const mbtiResult = getMBTICompatibility(mbti1, mbti2);

  return {
    constitutionScore: constitutionResult.score,
    mbtiScore: mbtiResult.score,
    constitutionDescription: constitutionResult.description,
    mbtiDescription: mbtiResult.description,
  };
};
