import {create} from 'zustand';
import { GameState, initialGameState } from '@/lib/gameState';

interface GameStore {
  gameState: GameState;
  setGameState: (newState: GameState) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: initialGameState,
  setGameState: (newState: GameState) => set({ gameState: newState }),
}));