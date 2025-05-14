import { GameState } from '@/app/types';
import { initialGameState } from '@/lib/gameState';
import { create, StateCreator, StoreApi } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the store type
interface GameStore {
  gameState: GameState;
  setGameState: (newState: GameState) => void;
  updateGameState: (patch: Partial<GameState>) => void;
  saveGame: () => string;
  loadGame: (saveKey: string) => void;
  resetGame: () => void;
}

// Fun random save key generator
function generateSaveKey(): string {
  const adjectives = ['Mighty', 'Brave', 'Wise', 'Swift', 'Bold', 'Fierce', 'Noble', 'Valiant'];
  const nouns = ['Viking', 'Warrior', 'Saga', 'Quest', 'Journey', 'Voyage', 'Tale', 'Legend'];
  const randomNum = Math.floor(Math.random() * 1000);
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}${randomNum}`;
}

const storeImpl: StateCreator<GameStore, [], [], GameStore> = (set, get) => ({
  gameState: initialGameState,
  setGameState: (newState: GameState) => set({ gameState: newState }),
  updateGameState: (patch: Partial<GameState>) =>
    set((state) => ({
      gameState: { ...state.gameState, ...patch } as GameState,
    })),
  saveGame: () => {
    // Only works in browser
    if (typeof window === 'undefined') return '';
    const saveKey = generateSaveKey();
    const saveData = {
      gameState: get().gameState,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(`viking-save-${saveKey}`, JSON.stringify(saveData));
    return saveKey;
  },
  loadGame: (saveKey: string) => {
    if (typeof window === 'undefined') return;
    const saveData = localStorage.getItem(`viking-save-${saveKey}`);
    if (saveData) {
      const { gameState } = JSON.parse(saveData);
      set({ gameState });
    }
  },
  resetGame: () => set({ gameState: initialGameState }),
});

export const createGameStore = (persisted = true) =>
  persisted
    ? create(
        persist(storeImpl, {
          name: 'viking-cyoa-save',
          storage: createJSONStorage(() => localStorage),
          partialize: (state) => ({ gameState: state.gameState }),
        })
      )
    : create(storeImpl);

export const useGameStore = createGameStore(true);

