import { useAuthStore } from '@/features/auth/store';

export const useAuth = () => {
   const currentUser = useAuthStore((state) => state.currentUser);
   const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
   const logout = useAuthStore((state) => state.logout);

   return {
      currentUser,
      setCurrentUser,
      isAuthenticated,
      logout,
   };
};
