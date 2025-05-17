import { create } from 'zustand';

interface UIState {
   showSidebar: boolean;
   setShowSidebar: (showSidebar: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
   showSidebar: false,
   setShowSidebar: (showSidebar: boolean) =>
      set({
         showSidebar,
      }),
}));
