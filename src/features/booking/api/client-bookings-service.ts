import { api } from '@/shared/lib';
import { ClientBookingsResponse } from '@/shared/types';
import { ApiResponse } from '@/shared/types/api';

const clientBookingsService = {
   getConfirmedBookings: async (
      page: number = 1
   ): Promise<ApiResponse<ClientBookingsResponse>> => {
      const response = await api.get(`Client/bookings/confirmed?page=${page}`);
      return response.data;
   },

   getPendingBookings: async (
      page: number = 1
   ): Promise<ApiResponse<ClientBookingsResponse>> => {
      const response = await api.get(`Client/bookings/pending?page=${page}`);
      return response.data;
   },

   getServedBookings: async (
      page: number = 1
   ): Promise<ApiResponse<ClientBookingsResponse>> => {
      const response = await api.get(`Client/bookings/served?page=${page}`);
      return response.data;
   },
};

export default clientBookingsService;
