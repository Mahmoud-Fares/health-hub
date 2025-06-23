import { format } from 'date-fns';
import {
   Calendar,
   Clock,
   CreditCard,
   Link as LinkIcon,
   UserCircle,
   X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Spinner from '@/shared/components/spinner';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import { ClientBooking } from '@/shared/types';

import { useCancelBooking } from '@/features/booking/api/booking-hooks';

import { useAppointments } from '../hooks/use-appointments';

interface BookingCardProps {
   booking: ClientBooking;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
   const { mutate: cancelBooking, isPending: isCancelPending } =
      useCancelBooking();

   const { handleRefreshAllBookings } = useAppointments();

   const handleCancel = () => {
      cancelBooking(booking.id, {
         onSuccess: () => handleRefreshAllBookings(),
      });
   };

   // Format date from "2111-01-01" to "Jan 1, 2111"
   const formatDate = (dateStr: string) => {
      try {
         const date = new Date(dateStr);
         return format(date, 'MMM d, yyyy');
      } catch (e) {
         return dateStr;
      }
   };

   // Get status color
   const getStatusColor = () => {
      switch (booking.status) {
         case 'confirmed':
            return 'bg-green-100 text-green-800';
         case 'pending':
            return 'bg-yellow-100 text-yellow-800';
         case 'served':
            return 'bg-blue-100 text-blue-800';
         case 'cancelled':
            return 'bg-red-100 text-red-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const startTime = booking['slot_start_time||session_start_time'] || '';
   const endTime = booking['slot_end_time||session_end_time'] || '';

   return (
      <div className='mb-4 w-full overflow-hidden rounded-lg border bg-accent/25 shadow-sm'>
         {/* Basic Card Info - Always Visible */}
         <div className='p-4'>
            <div className='flex items-center justify-between'>
               <div className='flex items-center'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                     <UserCircle size={24} />
                  </div>
                  <div className='ml-3'>
                     <h3 className='text-lg font-medium'>
                        {booking.doctor.name}
                     </h3>
                     <div className='mt-1 flex flex-wrap gap-2'>
                        {booking.doctor.specialties.map((specialty, index) => (
                           <span
                              key={index}
                              className='rounded-full bg-primary/10 px-2 py-1 text-xs text-primary'
                           >
                              {specialty}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
               <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor()}`}
               >
                  {booking.status}
               </span>
            </div>

            <div className='mt-4 grid grid-cols-1 gap-3 md:grid-cols-2'>
               <div className='flex items-center text-sm text-muted-foreground'>
                  <Calendar size={16} className='mr-2 text-primary' />
                  <span>{formatDate(booking.appointment.date)}</span>
               </div>
               <div className='flex items-center text-sm text-muted-foreground'>
                  <Clock size={16} className='mr-2 text-primary' />
                  <span>
                     {startTime.substring(0, 5)} - {endTime.substring(0, 5)}
                  </span>
               </div>
            </div>

            {booking.status === 'pending' && (
               <div className='mt-4 flex flex-wrap gap-2'>
                  <Link
                     to={`/payment/${booking.id}`}
                     className='w-full sm:w-auto'
                  >
                     <Button
                        variant='default'
                        size='sm'
                        className='w-full sm:w-auto'
                     >
                        <CreditCard size={16} className='mr-2' /> Pay Now
                     </Button>
                  </Link>

                  <Button
                     variant='outline'
                     size='sm'
                     onClick={handleCancel}
                     disabled={isCancelPending}
                     className='w-full sm:w-auto'
                  >
                     {isCancelPending ? (
                        <Spinner />
                     ) : (
                        <>
                           <X size={16} className='mr-2' /> Cancel
                        </>
                     )}
                  </Button>
               </div>
            )}
         </div>

         {/* Accordion for Additional Details */}
         <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='details'>
               <AccordionTrigger className='border-t px-4 py-2 hover:no-underline'>
                  <span className='text-sm font-medium'>View Details</span>
               </AccordionTrigger>
               <AccordionContent>
                  <div className='space-y-4 px-4 py-3'>
                     {booking.google_meet_link && (
                        <div>
                           <h4 className='mb-2 flex items-center text-sm font-medium'>
                              <LinkIcon
                                 size={16}
                                 className='mr-2 text-primary'
                              />
                              Meeting Link
                           </h4>
                           <a
                              href={booking.google_meet_link}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='break-all text-sm text-primary hover:underline'
                           >
                              {booking.google_meet_link}
                           </a>
                        </div>
                     )}

                     <div>
                        <h4 className='mb-2 text-sm font-medium'>
                           Booking Time
                        </h4>
                        <p className='text-sm text-muted-foreground'>
                           {booking.booking_time}
                        </p>
                     </div>

                     <Separator />

                     <div>
                        <h4 className='mb-2 text-sm font-medium'>
                           Client Info
                        </h4>
                        <ul className='space-y-2 text-sm'>
                           <li className='flex items-start'>
                              <span className='w-20 font-medium'>Name:</span>
                              <span className='text-muted-foreground'>
                                 {booking.client.name}
                              </span>
                           </li>
                           <li className='flex items-start'>
                              <span className='w-20 font-medium'>Email:</span>
                              <span className='text-muted-foreground'>
                                 {booking.client.email}
                              </span>
                           </li>
                           <li className='flex items-start'>
                              <span className='w-20 font-medium'>Phone:</span>
                              <span className='text-muted-foreground'>
                                 {booking.client.phone}
                              </span>
                           </li>
                           <li className='flex items-start'>
                              <span className='w-20 font-medium'>Age:</span>
                              <span className='text-muted-foreground'>
                                 {booking.client.age}
                              </span>
                           </li>
                           <li className='flex items-start'>
                              <span className='w-20 font-medium'>Gender:</span>
                              <span className='capitalize text-muted-foreground'>
                                 {booking.client.gender}
                              </span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
   );
};
