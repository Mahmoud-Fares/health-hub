import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '@/features/auth';
import authService, {
   LoginPayload,
   RegisterPayload,
} from '@/features/auth/api/auth-service';

export const useRegister = () => {
   const navigate = useNavigate();
   const { setCurrentUser } = useAuth();

   return useMutation({
      mutationFn: (userData: RegisterPayload) => authService.register(userData),
      onSuccess: (response) => {
         if (response && response.data) {
            const { token, name, email, role, slug } = response.data;
            setCurrentUser({ token, name, email, role, slug });
            toast.success('Registration successful!');
            navigate('/');
         } else {
            toast.error('Invalid registration response');
         }
      },
      meta: {
         onError: (error: any) => {
            console.error('Registration error:', error);
            toast.error(
               error.response?.data?.msg ||
                  'Registration failed. Please try again.'
            );
         },
      },
   });
};

export const useLogin = () => {
   const navigate = useNavigate();
   const { setCurrentUser } = useAuth();

   return useMutation({
      mutationFn: (credentials: LoginPayload) => authService.login(credentials),
      onSuccess: (response) => {
         if (response && response.data) {
            const { token, name, email, role, slug } = response.data;
            setCurrentUser({ token, name, email, role, slug });
            toast.success('Login successful!');
            navigate('/');
         } else {
            toast.error('Invalid login response');
         }
      },
      meta: {
         onError: (error: any) => {
            console.error('Login error:', error);
            toast.error(
               error.response?.data?.msg ||
                  'Login failed. Please check your credentials.'
            );
         },
      },
   });
};

export const useLogout = () => {
   const { logout } = useAuth();

   return useMutation({
      mutationFn: () => authService.logout(),
      onSuccess: () => {
         logout();
         toast.success('Logged out successfully');
      },
      meta: {
         onError: (error: any) => {
            console.error('Logout error:', error);
            toast.error(
               error.response?.data?.msg || 'Logout failed. Please try again.'
            );
         },
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
      meta: {
         onError: (error: any) => {
            console.error('Delete account error:', error);
            toast.error(
               error.response?.data?.msg ||
                  'Failed to delete account. Please try again.'
            );
         },
      },
   });
};
