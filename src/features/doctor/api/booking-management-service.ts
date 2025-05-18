import { api } from '@/shared/lib';
import { AppointmentBookingsResponse } from '@/shared/types';
import { ApiResponse } from '@/shared/types/api';

const bookingManagementService = {
   getConfirmedBookings: async (
      appointmentId: number,
      page: number = 1
   ): Promise<ApiResponse<AppointmentBookingsResponse>> => {
      const response = await api.get(
         `BookingMangement/getConfirmedBookings/${appointmentId}?page=${page}`
      );
      return response.data;
   },

   getServedBookings: async (
      appointmentId: number,
      page: number = 1
   ): Promise<ApiResponse<AppointmentBookingsResponse>> => {
      const response = await api.get(
         `BookingMangement/getServedBookings/${appointmentId}?page=${page}`
      );
      return response.data;
   },

   markBookingAsServed: async (
      bookingId: number
   ): Promise<ApiResponse<any>> => {
      const response = await api.patch(
         `BookingMangement/markBookingAsServed/${bookingId}`
      );
      return response.data;
   },
};

export default bookingManagementService;
