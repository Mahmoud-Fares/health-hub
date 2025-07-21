import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authService, useAuth } from '@/features/auth';

import settingsService, {
   ClientUpdatePayload,
   DoctorUpdatePayload,
} from './service';

export const useUpdateProfile = () => {
   const { currentUser, setCurrentUser } = useAuth();
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: DoctorUpdatePayload | ClientUpdatePayload) => {
         return settingsService.updateProfile(payload);
      },
      onSuccess: async () => {
         const res = await authService.getCurrentUserData({
            role: currentUser!.role,
            slug: currentUser!.slug,
            token: currentUser!.token,
         });

         setCurrentUser(res);

         if (currentUser?.role === 'doctor') {
            queryClient.invalidateQueries({
               queryKey: ['doctor', currentUser.slug] as const,
            });
         } else if (currentUser?.role === 'client') {
            queryClient.invalidateQueries({
               queryKey: ['client', currentUser.slug] as const,
            });
         }

         toast.success('Profile updated successfully');
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message ||
               'Failed to update profile. Please try again.'
         );
      },
   });
};

export const useDeleteProfile = () => {
   const { setCurrentUser } = useAuth();
   return useMutation({
      mutationFn: () => settingsService.deleteProfile(),
      onSuccess: () => {
         setCurrentUser(null);
         toast.success('Account deleted successfully');
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message ||
               'Failed to delete account. Please try again.'
         );
      },
   });
};

export const useChangePassword = () => {
   return useMutation({
      mutationFn: (payload: {
         oldPassword: string;
         newPassword: string;
         newPassword_confirmation: string;
      }) => settingsService.changePassword(payload),
      onSuccess: () => {
         toast.success('Password changed successfully');
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message ||
               'Failed to change password. Please try again.'
         );
      },
   });
};

export const useUploadProfileImage = () => {
   const { currentUser, setCurrentUser } = useAuth();
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (formData: FormData) =>
         settingsService.uploadProfileImage(formData),
      onSuccess: async () => {
         const res = await authService.getCurrentUserData({
            role: currentUser!.role,
            slug: currentUser!.slug,
            token: currentUser!.token,
         });
         setCurrentUser(res);
         if (currentUser?.role === 'doctor') {
            queryClient.invalidateQueries({
               queryKey: ['doctor', currentUser.slug] as const,
            });
         } else if (currentUser?.role === 'client') {
            queryClient.invalidateQueries({
               queryKey: ['client', currentUser.slug] as const,
            });
         }
         toast.success('Profile image updated successfully');
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message ||
               'Failed to update profile image. Please try again.'
         );
      },
   });
};

export const useDeleteProfileImage = () => {
   const { currentUser, setCurrentUser } = useAuth();
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: () => settingsService.deleteProfileImage(),
      onSuccess: async () => {
         const res = await authService.getCurrentUserData({
            role: currentUser!.role,
            slug: currentUser!.slug,
            token: currentUser!.token,
         });
         setCurrentUser(res);
         if (currentUser?.role === 'doctor') {
            queryClient.invalidateQueries({
               queryKey: ['doctor', currentUser.slug] as const,
            });
         } else if (currentUser?.role === 'client') {
            queryClient.invalidateQueries({
               queryKey: ['client', currentUser.slug] as const,
            });
         }
         toast.success('Profile image deleted successfully');
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message ||
               'Failed to delete profile image. Please try again.'
         );
      },
   });
};
