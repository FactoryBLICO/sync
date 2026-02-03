import { ConstitutionType } from '../types';

interface FoodRecommendation {
  good: string[];
  bad: string[];
  description: string;
}

export const FOODS_BY_CONSTITUTION: Record<ConstitutionType, FoodRecommendation> = {
  '소양인': {
    good: ['수박', '오이', '참외', '배', '돼지고기', '굴', '전복', '해삼', '녹두', '메밀'],
    bad: ['인삼', '꿀', '닭고기', '마늘', '고추', '생강', '후추', '파', '양파'],
    description: '열이 많아 시원한 성질의 음식이 좋습니다.',
  },
  '소음인': {
    good: ['인삼', '꿀', '닭고기', '양고기', '개고기', '마늘', '생강', '고추', '파', '후추'],
    bad: ['수박', '참외', '돼지고기', '보리', '밀', '녹두', '메밀', '찬 음식'],
    description: '몸이 차가워 따뜻한 성질의 음식이 좋습니다.',
  },
  '태양인': {
    good: ['메밀', '냉면', '해삼', '붕어', '조개', '새우', '오징어', '포도', '앵두', '다래'],
    bad: ['맵고 뜨거운 음식', '기름진 음식', '쇠고기', '설탕', '버터'],
    description: '기가 위로 올라가니 담백하고 시원한 음식이 좋습니다.',
  },
  '태음인': {
    good: ['쇠고기', '무', '당근', '도라지', '콩', '우유', '치즈', '버터', '밤', '잣', '호두'],
    bad: ['닭고기', '개고기', '돼지고기', '커피', '술', '기름진 음식 과다섭취'],
    description: '소화력이 좋으나 과식을 주의하고 담백한 음식이 좋습니다.',
  },
};

interface CompatibilityFood {
  safe: string[];
  avoid: string[];
}

export const getCompatibilityFoods = (
  constitution1: ConstitutionType,
  constitution2: ConstitutionType
): CompatibilityFood => {
  const foods1 = FOODS_BY_CONSTITUTION[constitution1];
  const foods2 = FOODS_BY_CONSTITUTION[constitution2];

  // 둘 다 좋은 음식 찾기
  const safe = foods1.good.filter((food) => 
    !foods2.bad.includes(food) && !foods1.bad.includes(food)
  );

  // 둘 중 하나라도 피해야 할 음식
  const avoid = [...new Set([...foods1.bad, ...foods2.bad])];

  return {
    safe: safe.length > 0 ? safe.slice(0, 5) : ['균형 잡힌 한식', '가벼운 샐러드'],
    avoid: avoid.slice(0, 5),
  };
};
