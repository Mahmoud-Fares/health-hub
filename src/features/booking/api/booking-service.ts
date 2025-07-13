import { api } from '@/shared/lib';
import {
   AvailableSlot,
   BookAppointmentPayload,
   BookingResponse,
} from '@/shared/types';
import { ApiResponse } from '@/shared/types/api';

const bookingService = {
   getAvailableSlots: async (
      appointmentId: number
   ): Promise<ApiResponse<AvailableSlot[]>> => {
      const response = await api.get(`Booking/availableSlots/${appointmentId}`);
      return response.data;
   },

   bookAppointment: async (
      payload: BookAppointmentPayload
   ): Promise<ApiResponse<BookingResponse>> => {
      const response = await api.post('Booking/bookAppointment', payload);
      return response.data;
   },

   confirmBooking: async (
      bookingId: number
   ): Promise<ApiResponse<BookingResponse>> => {
      const response = await api.patch(
         `Booking/bookAppointment/confirm/${bookingId}`
      );
      return response.data;
   },

   cancelBooking: async (bookingId: number): Promise<ApiResponse<any>> => {
      const response = await api.delete(
         `Booking/bookAppointment/cancel/${bookingId}`
      );
      return response.data;
   },

   getBookingFees: async (
      bookingId: number
   ): Promise<ApiResponse<{ fees: string }>> => {
      const response = await api.get(
         `/Booking/bookingFeesByBookingId/${bookingId}`
      );
      return response.data;
   },

   payWithStripe: async (
      amount: number,
      currency: string = 'USD'
   ): Promise<{ success: boolean; url: string }> => {
      const response = await api.post('/payment/process', {
         amount,
         currency,
      });
      return response.data;
   },
};

export default bookingService;
