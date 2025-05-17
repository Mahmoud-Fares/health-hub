import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import settingsService, {
   ClientUpdatePayload,
   DoctorUpdatePayload,
} from './service';

export const useUpdateProfile = () => {
   return useMutation({
      mutationFn: (payload: DoctorUpdatePayload | ClientUpdatePayload) => {
         return settingsService.updateProfile(payload);
      },
      onSuccess: () => {
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
