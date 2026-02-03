import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckIn, ChatMessage } from '../types';
import { generateId } from '../utils/generateId';

interface CheckInState {
  checkIns: CheckIn[];
  currentCheckIn: CheckIn | null;

  // Actions
  startCheckIn: (userId: string, mood: 'good' | 'neutral' | 'bad') => void;
  addMessage: (role: 'ai' | 'user', content: string) => void;
  setFeedback: (feedback: CheckIn['feedback']) => void;
  completeCheckIn: () => void;
  getTodayCheckIn: (userId: string) => CheckIn | undefined;
  getCheckInHistory: (userId: string) => CheckIn[];
  getStreak: (userId: string) => number;
}

export const useCheckInStore = create<CheckInState>()(
  persist(
    (set, get) => ({
      checkIns: [],
      currentCheckIn: null,

      startCheckIn: (userId, mood) => {
        const today = new Date().toISOString().split('T')[0];
        const newCheckIn: CheckIn = {
          id: generateId(),
          userId,
          date: today,
          mood,
          messages: [],
          feedback: {
            constitution: '',
            saju: '',
            mbti: '',
          },
        };

        set({ currentCheckIn: newCheckIn });
      },

      addMessage: (role, content) => {
        const message: ChatMessage = {
          id: generateId(),
          role,
          content,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          currentCheckIn: state.currentCheckIn
            ? {
                ...state.currentCheckIn,
                messages: [...state.currentCheckIn.messages, message],
              }
            : null,
        }));
      },

      setFeedback: (feedback) => {
        set((state) => ({
          currentCheckIn: state.currentCheckIn
            ? { ...state.currentCheckIn, feedback }
            : null,
        }));
      },

      completeCheckIn: () => {
        const { currentCheckIn, checkIns } = get();
        if (currentCheckIn) {
          // Remove any existing check-in for today
          const filteredCheckIns = checkIns.filter(
            (c) => !(c.userId === currentCheckIn.userId && c.date === currentCheckIn.date)
          );

          set({
            checkIns: [...filteredCheckIns, currentCheckIn],
            currentCheckIn: null,
          });
        }
      },

      getTodayCheckIn: (userId) => {
        const today = new Date().toISOString().split('T')[0];
        return get().checkIns.find((c) => c.userId === userId && c.date === today);
      },

      getCheckInHistory: (userId) => {
        return get()
          .checkIns.filter((c) => c.userId === userId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },

      getStreak: (userId) => {
        const history = get().getCheckInHistory(userId);
        if (history.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < history.length; i++) {
          const checkInDate = new Date(history[i].date);
          checkInDate.setHours(0, 0, 0, 0);

          const expectedDate = new Date(today);
          expectedDate.setDate(expectedDate.getDate() - i);

          if (checkInDate.getTime() === expectedDate.getTime()) {
            streak++;
          } else {
            break;
          }
        }

        return streak;
      },
    }),
    {
      name: 'sync-checkin-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
