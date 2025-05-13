import { GameState } from '@/app/types';
import { initialGameState } from '@/lib/gameState';
import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


interface GameStore {
  gameState: GameState;
  setGameState: (newState: GameState) => void;
}

type GameStatePatch = Partial<GameState>;





  export const useGameStore = create<GameStore>()(
    persist(
      (set) => ({
        /* ---------- STATE ---------- */
        gameState: initialGameState,
  
        /* ---------- ACTIONS ---------- */
        setGameState: (newState) =>
          set({ gameState: newState }),
  
        updateGameState: (patch: GameStatePatch) =>
          set((state) => ({
            gameState: { ...state.gameState, ...patch } as GameState,
          })),
      }),
      {
        name: 'viking-cyoa-save',                     // localStorage key
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ gameState: state.gameState }), // save just gameState
      }
    )
  );

