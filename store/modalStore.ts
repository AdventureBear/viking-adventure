'use client';
import { create } from 'zustand';

export interface ModalChoice {
  text: string;
  nextAction?: string;        // optional follow‑up action id
}

export interface ModalData {
  id: string;                 // "gift_from_elder/outcome0"
  description: string;
  choices?: ModalChoice[];    // if undefined → simple "Dismiss"
}

interface ModalStore {
  queue: ModalData[];
  push: (m: ModalData) => void;
  pop: () => void;
  current: () => ModalData | undefined;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  queue: [],
  push: (m) => {
    if (typeof window === 'undefined') return; // Skip during SSR
    set((s) => ({ queue: [...s.queue, m] }));
  },
  pop: () => {
    if (typeof window === 'undefined') return; // Skip during SSR
    set({ queue: [] });
  },
  current: () => {
    if (typeof window === 'undefined') return undefined; // Return undefined during SSR
    return get().queue[0];
  },
}));
