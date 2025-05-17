import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import specialtyService from './specialty-service';

export const useSpecialties = () => {
   return useQuery({
      queryKey: ['specialties'],
      queryFn: () => specialtyService.getAllSpecialties(),
      meta: {
         onError: (error: any) => {
            toast.error(error.message || 'Failed to load specialties');
         },
      },
   });
};
