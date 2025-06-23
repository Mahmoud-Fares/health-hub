import Spinner from '@/shared/components/spinner';

import { AppointmentType } from '../hooks/use-appointments';
import { AppointmentEmptyState } from './appointment-empty-state';
import { AppointmentPagination } from './appointment-pagination';
import { BookingCard } from './booking-card';

interface AppointmentListProps {
   type: AppointmentType;
   isLoading: boolean;
   data: any;
   currentPage: number;
   onPageChange: (type: AppointmentType, page: number) => void;
}

export const AppointmentList = ({
   type,
   isLoading,
   data,
   currentPage,
   onPageChange,
}: AppointmentListProps) => {
   if (isLoading) {
      return (
         <div className='flex justify-center py-8'>
            <Spinner className='size-8' />
         </div>
      );
   }

   const bookings = data?.data?.data || [];

   if (bookings.length === 0) {
      return <AppointmentEmptyState type={type} />;
   }

   return (
      <div className='space-y-4'>
         {bookings.map((booking: any) => (
            <BookingCard key={booking.id} booking={booking} />
         ))}
         <AppointmentPagination
            totalPages={data?.meta?.total_pages || 0}
            currentPage={currentPage}
            type={type}
            onPageChange={onPageChange}
         />
      </div>
   );
};
