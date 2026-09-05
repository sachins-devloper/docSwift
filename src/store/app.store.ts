import { create } from 'zustand';

interface AppState {
  isOnboarded: boolean;
  searchQuery: string;
  setOnboarded: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnboarded: false,
  searchQuery: '',
  setOnboarded: (value) => set({ isOnboarded: value }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
