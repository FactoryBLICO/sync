import { MBTIType } from '../types';

interface MBTITone {
  greeting: string;
  sympathy: string;
  encouragement: string;
  advice: string;
  closing: string;
}

export const MBTI_TONES: Record<MBTIType, MBTITone> = {
  ENTP: {
    greeting: '오! 왔어? 오늘 뭔가 재밌는 일 있을 것 같은데?',
    sympathy: '뭐야, 힘드네? 그래도 괜찮아, 금방 나아질 거야!',
    encouragement: '에이, 넌 할 수 있어! 한번 해봐!',
    advice: '이렇게 해보는 건 어때? 새로운 시도야!',
    closing: '오늘도 재밌게 보내! 내일 또 봐~',
  },
  INFP: {
    greeting: '안녕하세요... 오늘 하루는 어떠셨나요?',
    sympathy: '많이 힘드셨나 봐요... 괜찮아요, 천천히 쉬어도 돼요.',
    encouragement: '당신은 충분히 잘하고 있어요. 스스로를 믿어주세요.',
    advice: '마음이 편해지는 방향으로 결정하셔도 괜찮아요.',
    closing: '오늘도 수고하셨어요. 푹 쉬세요.',
  },
  ESTJ: {
    greeting: '안녕하세요. 오늘 할 일은 계획되어 있나요?',
    sympathy: '힘든 상황이네요. 해결책을 찾아봅시다.',
    encouragement: '목표를 세우고 하나씩 해결해 나가면 됩니다.',
    advice: '이렇게 하면 효율적입니다: 우선순위를 정하세요.',
    closing: '오늘 계획한 일, 잘 마무리하세요!',
  },
  ISFP: {
    greeting: '안녕~ 오늘 기분 어때?',
    sympathy: '그랬구나... 힘들었겠다. 괜찮아, 네 곁에 있을게.',
    encouragement: '네가 느끼는 대로 해도 돼. 넌 충분히 멋져.',
    advice: '마음 가는 대로 해봐. 네 감각을 믿어.',
    closing: '오늘 하루도 예쁜 하루였길 바라.',
  },
  INTJ: {
    greeting: '오늘의 목표는 무엇인가요?',
    sympathy: '상황을 분석해 보죠. 원인을 파악하면 해결책이 보일 겁니다.',
    encouragement: '전략적으로 접근하면 반드시 성공할 수 있습니다.',
    advice: '장기적인 관점에서 이 방법이 효과적입니다.',
    closing: '오늘의 성과를 정리하고 내일을 준비하세요.',
  },
  INTP: {
    greeting: '흥미로운 하루였나요? 새로운 발견이 있었나요?',
    sympathy: '음... 그 상황을 다르게 생각해 볼 수도 있어요.',
    encouragement: '논리적으로 접근하면 해결할 수 있을 거예요.',
    advice: '여러 가능성을 검토해 보는 건 어떨까요?',
    closing: '오늘 배운 것들을 정리해 보세요.',
  },
  ENTJ: {
    greeting: '오늘의 미션은 뭐죠? 함께 달성해 봅시다!',
    sympathy: '문제가 있군요. 해결 계획을 세워봅시다.',
    encouragement: '당신의 리더십을 믿어요. 해낼 수 있습니다!',
    advice: '효율적인 방법은 이겁니다. 실행해 보세요.',
    closing: '오늘도 성공적인 하루였기를!',
  },
  INFJ: {
    greeting: '오늘 마음은 어떠세요? 진심으로 궁금해요.',
    sympathy: '그런 감정을 느끼셨군요... 충분히 이해해요.',
    encouragement: '당신의 가치를 알아요. 스스로를 믿으세요.',
    advice: '마음의 소리에 귀 기울여 보세요.',
    closing: '오늘도 의미 있는 하루가 되었기를 바라요.',
  },
  ENFJ: {
    greeting: '안녕하세요! 오늘 기분이 어떠세요?',
    sympathy: '정말 힘드셨겠어요. 제가 도와드릴게요.',
    encouragement: '당신은 정말 대단한 사람이에요!',
    advice: '함께라면 해낼 수 있어요. 저를 믿으세요.',
    closing: '오늘도 빛나는 하루 보내세요!',
  },
  ENFP: {
    greeting: '하이~! 오늘 어떤 재미있는 일이 있었어?!',
    sympathy: '아... 속상했겠다ㅠㅠ 괜찮아, 곧 좋아질 거야!',
    encouragement: '넌 정말 특별해! 뭐든 할 수 있어!',
    advice: '새로운 시도를 해봐! 분명 좋은 일이 생길 거야!',
    closing: '오늘도 행복한 하루! 내일 또 만나자~!',
  },
  ISTJ: {
    greeting: '안녕하세요. 계획대로 하루가 진행되고 있나요?',
    sympathy: '힘든 상황이시군요. 차근차근 해결해 나갑시다.',
    encouragement: '꾸준히 하시면 반드시 결과가 있을 겁니다.',
    advice: '검증된 방법을 따르는 것이 가장 확실합니다.',
    closing: '오늘 할 일을 마무리하고 쉬세요.',
  },
  ISFJ: {
    greeting: '안녕하세요. 오늘 하루는 어떠셨어요?',
    sympathy: '많이 힘드셨겠어요. 제가 옆에 있을게요.',
    encouragement: '당신은 정말 성실하고 따뜻한 사람이에요.',
    advice: '무리하지 마시고, 할 수 있는 것부터 해보세요.',
    closing: '오늘도 고생 많으셨어요. 푹 쉬세요.',
  },
  ESFJ: {
    greeting: '안녕하세요~! 오늘 기분 좋은 일 있었어요?',
    sympathy: '어머, 힘드셨겠어요! 제가 도와드릴게요!',
    encouragement: '당신은 정말 멋진 사람이에요! 화이팅!',
    advice: '주변 사람들과 함께하면 더 좋은 결과가 있을 거예요.',
    closing: '오늘도 행복한 하루 되세요~!',
  },
  ISTP: {
    greeting: '오늘 뭐 했어?',
    sympathy: '그래? 일단 상황 파악부터 하자.',
    encouragement: '직접 해보면 알게 될 거야.',
    advice: '실용적인 방법은 이거야.',
    closing: '잘 해결될 거야. 나중에 봐.',
  },
  ESTP: {
    greeting: '요! 오늘 뭔가 재밌는 거 했어?',
    sympathy: '에이, 그런 일도 있지 뭐. 금방 잊어버려!',
    encouragement: '일단 부딪혀봐! 해보면 알게 돼!',
    advice: '지금 당장 이거 해봐. 효과 확실해.',
    closing: '오늘도 즐겁게 보내! 내일 봐~',
  },
  ESFP: {
    greeting: '하이~!! 오늘 뭐 재밌는 일 있었어?!',
    sympathy: '에구ㅠㅠ 힘들었겠다! 같이 놀러 갈까?!',
    encouragement: '넌 진짜 멋져! 뭐든 즐기면서 해봐!',
    advice: '일단 즐겨! 재미있으면 다 잘 될 거야!',
    closing: '오늘도 신나게! 내일 또 놀자~!!',
  },
};

export const getMBTITone = (mbti: MBTIType) => {
  return MBTI_TONES[mbti] || MBTI_TONES.INFP;
};
