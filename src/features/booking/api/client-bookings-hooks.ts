
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import clientBookingsService from './client-bookings-service';

export const useGetConfirmedBookings = (clientId?: number) => {
  return useQuery({
    queryKey: ['confirmedBookings', clientId],
    queryFn: () => clientBookingsService.getConfirmedBookings(),
    enabled: !!clientId,
    meta: {
      onError: (error: any) => {
        toast.error(error.message || 'Failed to load confirmed bookings');
      }
    }
  });
};

export const useGetPendingBookings = (clientId?: number) => {
  return useQuery({
    queryKey: ['pendingBookings', clientId],
    queryFn: () => clientBookingsService.getPendingBookings(),
    enabled: !!clientId,
    meta: {
      onError: (error: any) => {
        toast.error(error.message || 'Failed to load pending bookings');
      }
    }
  });
};

export const useGetPastBookings = (clientId?: number) => {
  return useQuery({
    queryKey: ['pastBookings', clientId],
    queryFn: () => clientBookingsService.getServedBookings(),
    enabled: !!clientId,
    meta: {
      onError: (error: any) => {
        toast.error(error.message || 'Failed to load past bookings');
      }
    }
  });
};
