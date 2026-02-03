import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Relationship, ConstitutionType, MBTIType } from '../types';
import { calculateCompatibility } from '../utils/compatibility';
import { getCompatibilityFoods } from '../constants/foods';
import { v4 as uuidv4 } from 'uuid';

interface RelationshipState {
  relationships: Relationship[];

  // Actions
  addRelationship: (
    userId: string,
    userConstitution: ConstitutionType,
    userMbti: MBTIType,
    partnerName: string,
    partnerBirthDate: string,
    partnerMbti: MBTIType,
    partnerConstitution: ConstitutionType
  ) => Relationship;
  removeRelationship: (relationshipId: string) => void;
  getRelationships: (userId: string) => Relationship[];
  getRelationship: (relationshipId: string) => Relationship | undefined;
}

export const useRelationshipStore = create<RelationshipState>()(
  persist(
    (set, get) => ({
      relationships: [],

      addRelationship: (
        userId,
        userConstitution,
        userMbti,
        partnerName,
        partnerBirthDate,
        partnerMbti,
        partnerConstitution
      ) => {
        const compatibility = calculateCompatibility(
          userConstitution,
          partnerConstitution,
          userMbti,
          partnerMbti
        );

        const foodRecommendations = getCompatibilityFoods(
          userConstitution,
          partnerConstitution
        );

        const newRelationship: Relationship = {
          id: uuidv4(),
          userId,
          partnerName,
          partnerBirthDate,
          partnerMbti,
          partnerConstitution,
          compatibility: {
            constitution: compatibility.constitutionScore,
            mbti: compatibility.mbtiScore,
          },
          foodRecommendations,
        };

        set((state) => ({
          relationships: [...state.relationships, newRelationship],
        }));

        return newRelationship;
      },

      removeRelationship: (relationshipId) => {
        set((state) => ({
          relationships: state.relationships.filter((r) => r.id !== relationshipId),
        }));
      },

      getRelationships: (userId) => {
        return get().relationships.filter((r) => r.userId === userId);
      },

      getRelationship: (relationshipId) => {
        return get().relationships.find((r) => r.id === relationshipId);
      },
    }),
    {
      name: 'sync-relationship-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
