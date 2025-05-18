import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import clientBookingsService from './client-bookings-service';

export const useConfirmedBookings = (page: number = 1) => {
   return useQuery({
      queryKey: ['confirmedBookings', page],
      queryFn: () => clientBookingsService.getConfirmedBookings(page),
      meta: {
         onError: (error: Error) => {
            toast.error(error.message || 'Failed to load confirmed bookings');
         },
      },
   });
};

export const usePendingBookings = (page: number = 1) => {
   return useQuery({
      queryKey: ['pendingBookings', page],
      queryFn: () => clientBookingsService.getPendingBookings(page),
      meta: {
         onError: (error: Error) => {
            toast.error(error.message || 'Failed to load pending bookings');
         },
      },
   });
};

export const useServedBookings = (page: number = 1) => {
   return useQuery({
      queryKey: ['servedBookings', page],
      queryFn: () => clientBookingsService.getServedBookings(page),
      meta: {
         onError: (error: Error) => {
            toast.error(error.message || 'Failed to load served bookings');
         },
      },
   });
};
