import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
   id?: number;
   name: string;
   email: string;
   role: string;
   token: string;
   slug: string;
   image?: string;
   phone?: string;
   age?: number | null;
   gender?: string;
   specialization?: string[];
   fees?: string;
   bio?: string | null;
   clinicaddress?: string | null;
   clinicgovernate?: string | null;
   clinicname?: string | null;
   notes?: string | null;
   medical_history?: string | null;
   blood_type?: string | null;
   weight?: number | null;
   height?: number | null;
}

interface AuthState {
   currentUser: User | null;
   setCurrentUser: (user: User | null) => void;
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
