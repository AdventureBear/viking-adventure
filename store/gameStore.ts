import { GameState } from '@/app/types';
import { initialGameState } from '@/lib/gameState';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GameStore {
  gameState: GameState;
  setGameState: (newState: GameState) => void;
  saveGame: () => string;
  loadGame: (saveKey: string) => void;
  resetGame: () => void;
}

type GameStatePatch = Partial<GameState>;

// Generate a fun random save key
function generateSaveKey(): string {
  const adjectives = ['Mighty', 'Brave', 'Wise', 'Swift', 'Bold', 'Fierce', 'Noble', 'Valiant'];
  const nouns = ['Viking', 'Warrior', 'Saga', 'Quest', 'Journey', 'Voyage', 'Tale', 'Legend'];
  const randomNum = Math.floor(Math.random() * 1000);
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}${randomNum}`;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      /* ---------- STATE ---------- */
      gameState: initialGameState,
  
      /* ---------- ACTIONS ---------- */
      setGameState: (newState) =>
        set({ gameState: newState }),
  
      updateGameState: (patch: GameStatePatch) =>
        set((state) => ({
          gameState: { ...state.gameState, ...patch } as GameState,
        })),
  
      saveGame: () => {
        const saveKey = generateSaveKey();
        const saveData = {
          gameState: get().gameState,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem(`viking-save-${saveKey}`, JSON.stringify(saveData));
        return saveKey;
      },
  
      loadGame: (saveKey: string) => {
        const saveData = localStorage.getItem(`viking-save-${saveKey}`);
        if (saveData) {
          const { gameState } = JSON.parse(saveData);
          set({ gameState });
        }
      },
  
      resetGame: () => set({ gameState: initialGameState }),
    }),
    {
      name: 'viking-cyoa-save',                     // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ gameState: state.gameState }), // save just gameState
    }
  )
);

