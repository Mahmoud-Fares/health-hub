import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { BookAppointmentPayload } from '@/shared/types';

import bookingService from './booking-service';

export const useGetAvailableSlots = (appointmentId: string | undefined) => {
   return useQuery({
      queryKey: ['appointment-slots', appointmentId],
      queryFn: () => {
         if (!appointmentId) {
            throw new Error('Appointment ID is required');
         }
         return bookingService.getAvailableSlots(Number(appointmentId));
      },
      enabled: !!appointmentId,
      meta: {
         onError: (error: Error) => {
            toast.error(error.message || 'Failed to load available slots');
         },
      },
   });
};

export const useBookAppointment = () => {
   const navigate = useNavigate();
   return useMutation({
      mutationFn: (bookingData: BookAppointmentPayload) => {
         return bookingService.bookAppointment(bookingData);
      },
      onSuccess: (data) => {
         toast.success('Appointment booked successfully!');
         navigate(`/payment/${data.data.id}`);
         return data;
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || 'Failed to book appointment'
         );
         throw error;
      },
   });
};

export const useConfirmBooking = () => {
   const navigate = useNavigate();

   return useMutation({
      mutationFn: (bookingId: number) =>
         bookingService.confirmBooking(bookingId),
      onSuccess: () => navigate('/my-appointments'),
      onError: (error: Error) => {
         toast.error('Error', {
            description: error.message || 'Failed to confirm booking',
         });
      },
   });
};

export const useCancelBooking = () => {
   return useMutation({
      mutationFn: (bookingId: number) => {
         return bookingService.cancelBooking(bookingId);
      },
      onSuccess: () => {
         toast.success('Booking cancelled successfully');
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || 'Failed to cancel booking'
         );
      },
   });
};

// This hook was referenced but doesn't exist in the service - need to implement it
export const useConfirmPayment = () => {
   return useMutation({
      mutationFn: ({ bookingId }: { bookingId: string }) => {
         return bookingService.confirmBooking(Number(bookingId));
      },
      onSuccess: () => {
         toast.success('Payment confirmed successfully');
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || 'Failed to confirm payment'
         );
      },
   });
};

export const useBookingFees = (bookingId: string | undefined) => {
   return useQuery({
      queryKey: ['booking-fees', bookingId],
      queryFn: () => {
         if (!bookingId) throw new Error('Booking ID is required');
         return bookingService.getBookingFees(Number(bookingId));
      },
      enabled: !!bookingId,
      meta: {
         onError: (error: Error) => {
            toast.error(error.message || 'Failed to load booking fees');
         },
      },
   });
};

export const useStripePayment = () => {
   return useMutation({
      mutationFn: async ({ amount }: { amount: number }) => {
         return bookingService.payWithStripe(amount, 'USD');
      },
      onError: (error: any) => {
         toast.error(
            error.response?.data?.message || 'Failed to initiate Stripe payment'
         );
      },
   });
};
