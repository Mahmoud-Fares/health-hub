import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthUser } from '@/shared/types';

interface AuthState {
   currentUser: AuthUser | null;
   setCurrentUser: (user: AuthUser | null) => void;
   logout: () => void;
   isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
   persist(
      (set) => ({
         currentUser: null,
         isAuthenticated: false,
         setCurrentUser: (user) =>
            set({ currentUser: user, isAuthenticated: !!user }),
         logout: () => set({ currentUser: null, isAuthenticated: false }),
      }),
      {
         name: 'health-hub-auth',
      }
   )
);
