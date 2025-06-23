import { useQuery } from '@tanstack/react-query';

import profileService from './service';

export const useDoctorProfile = (doctorSlug: string | undefined) => {
   return useQuery({
      queryKey: ['doctor', doctorSlug],
      queryFn: () => {
         if (!doctorSlug) {
            throw new Error('Doctor slug is required');
         }
         return profileService.getDoctorProfile(doctorSlug);
      },
      enabled: !!doctorSlug,
   });
};

export const useClientProfile = (clientSlug: string | undefined) => {
   return useQuery({
      queryKey: ['client', clientSlug],
      queryFn: () => {
         if (!clientSlug) {
            throw new Error('Client slug is required');
         }
         return profileService.getClientProfile(clientSlug);
      },
      enabled: !!clientSlug,
   });
};
