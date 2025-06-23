import { useState } from 'react';

import {
   useConfirmedBookings,
   usePendingBookings,
   useServedBookings,
} from '../api/client-bookings-hooks';

export type AppointmentType = 'confirmed' | 'pending' | 'served';

export const useAppointments = () => {
   const [confirmedPage, setConfirmedPage] = useState(1);
   const [pendingPage, setPendingPage] = useState(1);
   const [servedPage, setServedPage] = useState(1);

   const {
      data: confirmedData,
      isLoading: confirmedLoading,
      refetch: refetchConfirmed,
   } = useConfirmedBookings(confirmedPage);

   const {
      data: pendingData,
      isLoading: pendingLoading,
      refetch: refetchPending,
   } = usePendingBookings(pendingPage);

   const {
      data: servedData,
      isLoading: servedLoading,
      refetch: refetchServed,
   } = useServedBookings(servedPage);

   const handlePageChange = (type: AppointmentType, page: number) => {
      if (type === 'confirmed') setConfirmedPage(page);
      else if (type === 'pending') setPendingPage(page);
      else setServedPage(page);
   };

   const handleRefreshAllBookings = () => {
      refetchPending();
      refetchConfirmed();
      refetchServed();
   };

   const getDataByType = (type: AppointmentType) => {
      switch (type) {
         case 'confirmed':
            return {
               data: confirmedData,
               isLoading: confirmedLoading,
               currentPage: confirmedPage,
            };
         case 'pending':
            return {
               data: pendingData,
               isLoading: pendingLoading,
               currentPage: pendingPage,
            };
         case 'served':
            return {
               data: servedData,
               isLoading: servedLoading,
               currentPage: servedPage,
            };
      }
   };

   return {
      handlePageChange,
      handleRefreshAllBookings,
      getDataByType,
   };
};
