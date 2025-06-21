import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import bookingManagementService from './booking-management-service';

export const useConfirmedAppointmentBookings = (
   appointmentId: number | undefined,
   page: number = 1
) => {
   return useQuery({
      queryKey: ['appointmentConfirmedBookings', appointmentId, page],
      queryFn: () => {
         if (!appointmentId) {
            throw new Error('Appointment ID is required');
         }
         return bookingManagementService.getConfirmedBookings(
            appointmentId,
            page
         );
      },
      enabled: !!appointmentId,
      meta: {
         onError: (error: Error) => {
            toast.error('Error', {
               description:
                  error.message || 'Failed to load confirmed bookings',
            });
         },
      },
   });
};

export const useServedAppointmentBookings = (
   appointmentId: number | undefined,
   page: number = 1
) => {
   return useQuery({
      queryKey: ['appointmentServedBookings', appointmentId, page],
      queryFn: () => {
         if (!appointmentId) {
            throw new Error('Appointment ID is required');
         }
         return bookingManagementService.getServedBookings(appointmentId, page);
      },
      enabled: !!appointmentId,
      meta: {
         onError: (error: Error) => {
            toast.error('Error', {
               description: error.message || 'Failed to load served bookings',
            });
         },
      },
   });
};

export const useMarkBookingAsServed = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (bookingId: number) =>
         bookingManagementService.markBookingAsServed(bookingId),
      onSuccess: () => {
         // Perform optimistic cache updates
         queryClient.invalidateQueries({
            queryKey: ['appointmentConfirmedBookings'],
         });
         queryClient.invalidateQueries({
            queryKey: ['appointmentServedBookings'],
         });
      },
      onError: (error: Error) => {
         toast.error('Error', {
            description: error.message || 'Failed to mark booking as served',
         });
      },
   });
};
