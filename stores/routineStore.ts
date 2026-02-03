import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routine, RoutineTask, ConstitutionType, Badge } from '../types';
import { ROUTINE_BY_CONSTITUTION, BADGES } from '../constants/routines';
import { generateId } from '../utils/generateId';

interface RoutineState {
  routines: Routine[];
  badges: Badge[];

  // Getters (read-only, no set() calls)
  getTodayRoutine: (userId: string) => Routine | undefined;
  getCompletionRate: (routineId: string) => number;
  getRoutineHistory: (userId: string) => Routine[];

  // Actions (can modify state)
  ensureTodayRoutine: (userId: string, constitution: ConstitutionType) => Routine;
  toggleTask: (routineId: string, taskId: number) => void;
  checkAndAwardBadges: (userId: string) => Badge[];
}

export const useRoutineStore = create<RoutineState>()(
  persist(
    (set, get) => ({
      routines: [],
      badges: [],

      getTodayRoutine: (userId) => {
        const today = new Date().toISOString().split('T')[0];
        return get().routines.find(
          (r) => r.userId === userId && r.date === today
        );
      },

      ensureTodayRoutine: (userId, constitution) => {
        const today = new Date().toISOString().split('T')[0];
        let todayRoutine = get().routines.find(
          (r) => r.userId === userId && r.date === today
        );

        if (!todayRoutine) {
          const tasks = ROUTINE_BY_CONSTITUTION[constitution].map((task) => ({
            ...task,
            done: false,
          }));

          todayRoutine = {
            id: generateId(),
            userId,
            date: today,
            tasks,
            completionRate: 0,
          };

          set((state) => ({
            routines: [...state.routines, todayRoutine!],
          }));
        }

        return todayRoutine;
      },

      toggleTask: (routineId, taskId) => {
        set((state) => {
          const routines = state.routines.map((routine) => {
            if (routine.id === routineId) {
              const tasks = routine.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
              );
              const completionRate = Math.round(
                (tasks.filter((t) => t.done).length / tasks.length) * 100
              );
              return { ...routine, tasks, completionRate };
            }
            return routine;
          });
          return { routines };
        });
      },

      getCompletionRate: (routineId) => {
        const routine = get().routines.find((r) => r.id === routineId);
        return routine?.completionRate || 0;
      },

      getRoutineHistory: (userId) => {
        return get()
          .routines.filter((r) => r.userId === userId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },

      checkAndAwardBadges: (userId) => {
        const history = get().getRoutineHistory(userId);
        const completedDays = history.filter((r) => r.completionRate === 100);

        // Check streak
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < completedDays.length; i++) {
          const routineDate = new Date(completedDays[i].date);
          routineDate.setHours(0, 0, 0, 0);

          const expectedDate = new Date(today);
          expectedDate.setDate(expectedDate.getDate() - i);

          if (routineDate.getTime() === expectedDate.getTime()) {
            streak++;
          } else {
            break;
          }
        }

        const newBadges: Badge[] = [];
        const { badges } = get();

        BADGES.forEach((badgeDef) => {
          const alreadyHas = badges.some((b) => b.id === badgeDef.id);
          if (!alreadyHas && streak >= badgeDef.daysRequired) {
            const newBadge: Badge = {
              id: badgeDef.id,
              name: badgeDef.name,
              description: badgeDef.description,
              earnedAt: new Date().toISOString(),
            };
            newBadges.push(newBadge);
          }
        });

        if (newBadges.length > 0) {
          set((state) => ({
            badges: [...state.badges, ...newBadges],
          }));
        }

        return newBadges;
      },
    }),
    {
      name: 'sync-routine-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
