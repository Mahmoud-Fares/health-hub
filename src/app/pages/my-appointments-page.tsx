import { useState } from 'react';

import { Calendar, Check, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/components/ui/tabs';

import {
   useConfirmedBookings,
   usePendingBookings,
   useServedBookings,
} from '@/features/booking/api/client-bookings-hooks';
import { BookingCard } from '@/features/booking/components/booking-card';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

const MyAppointmentsPage = () => {
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

   const handlePageChange = (
      type: 'confirmed' | 'pending' | 'served',
      page: number
   ) => {
      if (type === 'confirmed') setConfirmedPage(page);
      else if (type === 'pending') setPendingPage(page);
      else setServedPage(page);
   };

   const handleCancelledBooking = () => {
      refetchPending();
      refetchConfirmed();
      refetchServed();
   };

   // Helper function to render pagination controls
   const renderPagination = (type: 'confirmed' | 'pending' | 'served') => {
      const data =
         type === 'confirmed'
            ? confirmedData
            : type === 'pending'
              ? pendingData
              : servedData;

      if (!data || !data.meta || data.meta.total_pages <= 1) return null;

      const currentPage =
         type === 'confirmed'
            ? confirmedPage
            : type === 'pending'
              ? pendingPage
              : servedPage;

      return (
         <div className='mt-6 flex justify-center gap-2'>
            {Array.from({ length: data.meta.total_pages }).map((_, index) => (
               <Button
                  key={index}
                  variant={currentPage === index + 1 ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => handlePageChange(type, index + 1)}
               >
                  {index + 1}
               </Button>
            ))}
         </div>
      );
   };

   // Helper function to render booking list
   const renderBookingList = (
      type: 'confirmed' | 'pending' | 'served',
      isLoading: boolean,
      data: any
   ) => {
      if (isLoading) {
         return (
            <div className='flex justify-center py-8'>
               <Spinner className='size-8' />
            </div>
         );
      }

      const bookings = data?.data?.data || [];

      if (bookings.length === 0) {
         return (
            <div className='py-12 text-center'>
               <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full'>
                  <Calendar size={24} className='text-muted-foreground' />
               </div>
               <h3 className='mb-2 text-lg font-medium'>
                  No appointments found
               </h3>
               <p className='mb-4 text-muted-foreground'>
                  You don't have any {type} appointments yet.
               </p>
               <Link to='/find-doctors'>
                  <Button>Book an Appointment</Button>
               </Link>
            </div>
         );
      }

      return (
         <div className='space-y-4'>
            {bookings.map((booking: any) => (
               <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancelled={handleCancelledBooking}
               />
            ))}
            {renderPagination(type)}
         </div>
      );
   };

   return (
      <PageWithSidebar>
         <div className='min-h-screen p-4 md:p-8'>
            <div className='mx-auto'>
               <Card className='shadow-md'>
                  <CardHeader className='bg-gradient-to-r from-primary/10 to-primary/5 pb-6'>
                     <CardTitle className='flex items-center gap-2 text-2xl'>
                        <Calendar className='h-6 w-6' />
                        My Appointments
                     </CardTitle>
                  </CardHeader>
                  <CardContent className='pt-6'>
                     <Tabs defaultValue='pending' className='w-full'>
                        <TabsList className='mb-6 grid w-full grid-cols-3'>
                           <TabsTrigger value='pending' className='flex gap-2'>
                              <Clock size={16} /> Pending
                           </TabsTrigger>
                           <TabsTrigger
                              value='confirmed'
                              className='flex gap-2'
                           >
                              <Check size={16} /> Confirmed
                           </TabsTrigger>
                           <TabsTrigger value='served' className='flex gap-2'>
                              <Check size={16} className='text-primary' />{' '}
                              Served
                           </TabsTrigger>
                        </TabsList>

                        <TabsContent value='pending' className='pt-2'>
                           {renderBookingList(
                              'pending',
                              pendingLoading,
                              pendingData
                           )}
                        </TabsContent>

                        <TabsContent value='confirmed' className='pt-2'>
                           {renderBookingList(
                              'confirmed',
                              confirmedLoading,
                              confirmedData
                           )}
                        </TabsContent>

                        <TabsContent value='served' className='pt-2'>
                           {renderBookingList(
                              'served',
                              servedLoading,
                              servedData
                           )}
                        </TabsContent>
                     </Tabs>
                  </CardContent>
               </Card>
            </div>
         </div>
      </PageWithSidebar>
   );
};

export default MyAppointmentsPage;
