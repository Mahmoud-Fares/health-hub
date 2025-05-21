import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import doctorService from './doctor-service';
import scheduleService from './schedule-service';

// Define the types that were missing
export interface AppointmentPayload {
   date: string;
   start_time: string;
   end_time: string;
   session_duration: number;
   is_available: boolean;
   max_patients: number;
}

export interface Schedule {
   id?: number;
   day_of_week: string;
   start_time: string;
   end_time: string;
   is_available: boolean;
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
   page: number = 1,
   perPage: number = 10
) => {
   return useQuery({
      queryKey: ['search-doctors', name, page, perPage],
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

// Doctor Schedule hooks
export const useDoctorSchedule = () => {
   return useQuery({
      queryKey: ['doctor-schedule'],
      queryFn: () => scheduleService.getDoctorAppointments(),

      meta: {
         onError: (error: Error) => {
            toast.error(error.message || 'Failed to load schedule');
         },
      },
   });
};

export const useDoctorAppointments = () => {
   return useQuery({
      queryKey: ['doctor-appointments'],
      queryFn: () => scheduleService.getDoctorAppointments(),

      meta: {
         onError: (error: Error) => {
            toast.error(error.message || 'Failed to load appointments');
         },
      },
   });
};

export const useCreateAppointment = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (payload: AppointmentPayload) =>
         scheduleService.createAppointment(payload),

      onSuccess: (data) => {
         toast.success('Appointment created successfully');
         queryClient.invalidateQueries({ queryKey: ['doctor-appointments'] });
         return data;
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || 'Failed to create appointment'
         );
      },
   });
};

export const useUpdateAppointment = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, data }: { id: number; data: AppointmentPayload }) =>
         scheduleService.updateAppointment(id, data),

      onSuccess: (data) => {
         toast.success('Appointment updated successfully');
         queryClient.invalidateQueries({ queryKey: ['doctor-appointments'] });
         return data;
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || 'Failed to update appointment'
         );
      },
   });
};

export const useDeleteAppointment = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (id: number) => scheduleService.deleteAppointment(id),

      onSuccess: () => {
         toast.success('Appointment deleted successfully');
         queryClient.invalidateQueries({ queryKey: ['doctor-appointments'] });
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || 'Failed to delete appointment'
         );
      },
   });
};
