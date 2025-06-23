import { useState } from 'react';

import { ArrowLeft, Check, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

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
   useConfirmedAppointmentBookings,
   useServedAppointmentBookings,
} from '@/features/doctor/api/booking-management-hooks';
import { AppointmentBookingCard } from '@/features/doctor/components/appointment-booking-card';

const AppointmentBookingsPage = () => {
   const navigate = useNavigate();
   const { appointmentId, date } = useParams<{
      appointmentId: string;
      date: string;
   }>();
   const [activeTab, setActiveTab] = useState('confirmed');

   const appointmentIdNum = appointmentId ? parseInt(appointmentId) : undefined;
   const appointmentDate = date || 'Unknown date';

   const { data: confirmedResponse, isLoading: isLoadingConfirmed } =
      useConfirmedAppointmentBookings(appointmentIdNum);

   const { data: servedResponse, isLoading: isLoadingServed } =
      useServedAppointmentBookings(appointmentIdNum);

   const confirmedBookings = confirmedResponse?.data?.data || [];
   const servedBookings = servedResponse?.data?.data || [];

   const handleTabChange = (value: string) => {
      setActiveTab(value);
   };

   const renderLoadingState = () => (
      <div className='flex h-48 items-center justify-center'>
         <Spinner className='size-8' />
      </div>
   );

   const renderEmptyState = (type: 'confirmed' | 'served') => (
      <div className='flex h-48 flex-col items-center justify-center space-y-2 text-center'>
         <p className='text-lg font-medium text-muted-foreground'>
            No {type} bookings found
         </p>
         <p className='text-sm text-muted-foreground'>
            There are no {type} bookings for this appointment.
         </p>
      </div>
   );

   return (
      <>
         <div className='min-h-screen animate-fade-in p-4 md:p-8'>
            <Card className='shadow-md'>
               <CardHeader className='bg-gradient-to-r from-primary/10 to-primary/5 pb-6'>
                  <div className='flex flex-wrap-reverse items-center justify-between gap-3'>
                     <CardTitle className='flex items-center gap-2 text-2xl'>
                        <Clock className='h-6 w-6' />
                        Appointment Bookings
                     </CardTitle>

                     <Button
                        variant='outline'
                        className='flex items-center gap-1'
                        onClick={() => navigate(-1)}
                     >
                        <ArrowLeft className='h-4 w-4' />
                        Back to Profile
                     </Button>
                  </div>
                  <p className='mt-2 text-muted-foreground'>
                     Date: {appointmentDate}
                  </p>
               </CardHeader>

               <CardContent className='py-6'>
                  <Tabs
                     value={activeTab}
                     onValueChange={handleTabChange}
                     className='w-full'
                  >
                     <TabsList className='mb-6 w-full'>
                        <TabsTrigger
                           value='confirmed'
                           className='flex w-full gap-2'
                        >
                           <Clock size={16} /> Confirmed
                        </TabsTrigger>
                        <TabsTrigger
                           value='served'
                           className='flex w-full gap-2'
                        >
                           <Check size={16} /> Served
                        </TabsTrigger>
                     </TabsList>

                     <TabsContent value='confirmed' className='mt-4'>
                        {isLoadingConfirmed ? (
                           renderLoadingState()
                        ) : confirmedBookings.length > 0 ? (
                           <div className='space-y-4'>
                              {confirmedBookings.map((booking) => (
                                 <div
                                    key={booking.appointment_id}
                                    className='space-y-4'
                                 >
                                    {booking.slots.map((slot) => (
                                       <AppointmentBookingCard
                                          key={slot.booking_id}
                                          slot={slot}
                                          appointmentDate={appointmentDate}
                                       />
                                    ))}
                                 </div>
                              ))}
                           </div>
                        ) : (
                           renderEmptyState('confirmed')
                        )}
                     </TabsContent>

                     <TabsContent value='served' className='mt-4'>
                        {isLoadingServed ? (
                           renderLoadingState()
                        ) : servedBookings.length > 0 ? (
                           <div className='space-y-4'>
                              {servedBookings.map((booking) => (
                                 <div
                                    key={booking.appointment_id}
                                    className='space-y-4'
                                 >
                                    {booking.slots.map((slot) => (
                                       <AppointmentBookingCard
                                          key={slot.booking_id}
                                          slot={slot}
                                          appointmentDate={appointmentDate}
                                          isServed
                                       />
                                    ))}
                                 </div>
                              ))}
                           </div>
                        ) : (
                           renderEmptyState('served')
                        )}
                     </TabsContent>
                  </Tabs>
               </CardContent>
            </Card>
         </div>
      </>
   );
};

export default AppointmentBookingsPage;
