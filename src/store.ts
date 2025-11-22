import { create } from 'zustand';
import type { PlanetData } from './data/planets';

interface AppState {
  language: 'en' | 'id';
  selectedPlanet: PlanetData | null;
  isPaused: boolean;
  speedFactor: number;
  isTourActive: boolean;
  tourStep: number;
  
  setLanguage: (lang: 'en' | 'id') => void;
  setSelectedPlanet: (planet: PlanetData | null) => void;
  togglePause: () => void;
  setSpeedFactor: (speed: number) => void;
  startTour: () => void;
  stopTour: () => void;
  setTourStep: (step: number) => void;
}

export const useStore = create<AppState>((set) => ({
  language: 'en',
  selectedPlanet: null,
  isPaused: false,
  speedFactor: 1,
  isTourActive: false,
  tourStep: 0,

  setLanguage: (lang) => set({ language: lang }),
  setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  setSpeedFactor: (speed) => set({ speedFactor: speed }),
  startTour: () => set({ isTourActive: true, tourStep: 0 }),
  stopTour: () => set({ isTourActive: false, tourStep: 0, selectedPlanet: null }),
  setTourStep: (step) => set({ tourStep: step }),
}));
