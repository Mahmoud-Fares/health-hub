import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import doctorService from './doctor-service';

// Define the types that were missing
export interface AppointmentPayload {
   date: string;
   start_time: string;
   end_time: string;
   session_duration: number;
   is_available: boolean;
   max_patients: number;
}

export const useDoctors = (page: number = 1, perPage: number = 10) => {
   return useQuery({
      queryKey: ['doctors', page, perPage],
      queryFn: () => doctorService.getAllDoctors(page),
      meta: {
         onError: (error: Error) => {
            toast.error(error.message || 'Failed to load doctors');
         },
      },
   });
};

export const useSearchDoctors = (
   name: string = '',
   specialization: string = '',
   page: number = 1,
   perPage: number = 10
) => {
   return useQuery({
      queryKey: ['search-doctors', name, specialization, page, perPage],
      queryFn: () => doctorService.searchDoctorsByName(name, page),
      meta: {
         onError: (error: Error) => {
            toast.error(error.message || 'Failed to search doctors');
         },
      },
   });
};

export const useFilterDoctorsBySpecialty = (
   specialtyId: string = '',
   page: number = 1,
   perPage: number = 10
) => {
   return useQuery({
      queryKey: ['filter-doctors-by-specialty', specialtyId, page, perPage],
      queryFn: () => doctorService.filterDoctorsBySpecialty(specialtyId, page),
      enabled: !!specialtyId,
      meta: {
         onError: (error: Error) => {
            toast.error(
               error.message || 'Failed to filter doctors by specialty'
            );
         },
      },
   });
};
