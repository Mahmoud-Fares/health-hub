import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authService, useAuth } from '@/features/auth';

import settingsService, {
   ClientUpdatePayload,
   DoctorUpdatePayload,
} from './service';

export const useUpdateProfile = () => {
   const { currentUser, setCurrentUser } = useAuth();
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
