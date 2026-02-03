import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, OnboardingData, ConstitutionType, MBTIType } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface UserState {
  user: User | null;
  onboardingData: OnboardingData;
  isOnboardingComplete: boolean;
  _hasHydrated: boolean;

  // Actions
  setOnboardingField: <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => void;
  completeOnboarding: () => void;
  updateUser: (updates: Partial<User>) => void;
  resetUser: () => void;
  setHasHydrated: (state: boolean) => void;
}

const initialOnboardingData: OnboardingData = {
  nickname: '',
  birthDate: '',
  birthTime: '',
  gender: null,
  mbti: null,
  constitution: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      onboardingData: initialOnboardingData,
      isOnboardingComplete: false,
      _hasHydrated: false,

      setOnboardingField: (field, value) => {
        set((state) => ({
          onboardingData: {
            ...state.onboardingData,
            [field]: value,
          },
        }));
      },

      completeOnboarding: () => {
        const { onboardingData } = get();
        const newUser: User = {
          id: uuidv4(),
          nickname: onboardingData.nickname,
          birthDate: onboardingData.birthDate,
          birthTime: onboardingData.birthTime,
          gender: onboardingData.gender as 'M' | 'F',
          mbti: onboardingData.mbti as MBTIType,
          constitution: onboardingData.constitution as ConstitutionType,
          toneStyle: 'casual',
          createdAt: new Date().toISOString(),
        };

        set({
          user: newUser,
          isOnboardingComplete: true,
        });
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      resetUser: () => {
        set({
          user: null,
          onboardingData: initialOnboardingData,
          isOnboardingComplete: false,
        });
      },

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: 'sync-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        user: state.user,
        onboardingData: state.onboardingData,
        isOnboardingComplete: state.isOnboardingComplete,
      }),
    }
  )
);
