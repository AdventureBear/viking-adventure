import { GameState } from '@/app/types';
import { initialGameState } from '@/lib/gameState';
import {create} from 'zustand';


interface GameStore {
  gameState: GameState;
  setGameState: (newState: GameState) => void;
}

type GameStatePatch = Partial<GameState>;




export const useGameStore = create<GameStore>((set) => ({
  gameState: initialGameState,
  
  setGameState: (newState: GameState) => set({ gameState: newState }),

  updateGameState: (patch: GameStatePatch) =>
    set((state) => ({ gameState: { ...state.gameState, ...patch } }))

}));

