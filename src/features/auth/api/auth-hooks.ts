import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { getErrorMessage } from '@/shared/lib/utils';

import { useAuth } from '@/features/auth';
import authService from '@/features/auth/api/auth-service';
import { LoginPayload, RegisterPayload } from '@/features/auth/types';

export const useRegister = () => {
   const navigate = useNavigate();
   const { setCurrentUser } = useAuth();

   return useMutation({
      mutationFn: (userData: RegisterPayload) =>
         authService.completeRegister(userData),

      onSuccess: (response) => {
         if (response && response.userData) {
            window.localStorage.setItem(
               'token-healthUp',
               response.userData.token
            );
            setCurrentUser(response.userData);
            toast.success('Registration successful!');
            navigate('/');
         } else {
            toast.error('Invalid registration response');
         }
      },

      onError: (error: any) => {
         console.error('Registration error:', error);
         toast.error(
            getErrorMessage(error) || 'Registration failed. Please try again.'
         );
      },
   });
};

export const useLogin = () => {
   const navigate = useNavigate();
   const { setCurrentUser } = useAuth();

   return useMutation({
      mutationFn: (credentials: LoginPayload) =>
         authService.completeLogin(credentials),
      onSuccess: (response) => {
         if (response && response.userData) {
            setCurrentUser(response.userData);
            window.localStorage.setItem(
               'token-healthUp',
               response.userData.token
            );
            toast.success('Login successful!');
            navigate('/');
         } else {
            toast.error('Invalid login response');
         }
      },

      onError: (error: any) => {
         console.error('Login error:', error);
         toast.error(
            getErrorMessage(error) ||
               'Login failed. Please check your credentials.'
         );
      },
   });
};

export const useLogout = () => {
   const { logout } = useAuth();

   return useMutation({
      mutationFn: () => authService.logout(),
      onSuccess: () => {
         logout();
         window.localStorage.removeItem('token-healthUp');
         toast.success('Logged out successfully');
      },

      onError: (error: any) => {
         console.error('Logout error:', error);
         toast.error(
            getErrorMessage(error) || 'Logout failed. Please try again.'
         );
      },
   });
};

export const useDeleteAccount = () => {
   const navigate = useNavigate();
   const { logout } = useAuth();

   return useMutation({
      mutationFn: () => authService.deleteAccount(),
      onSuccess: () => {
         logout();
         toast.success('Account deleted successfully');
         navigate('/login');
      },

      onError: (error: any) => {
         console.error('Delete account error:', error);
         toast.error(
            getErrorMessage(error) ||
               'Failed to delete account. Please try again.'
         );
      },
   });
};
