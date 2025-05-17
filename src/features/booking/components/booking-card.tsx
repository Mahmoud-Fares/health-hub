import { useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin, User } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardTitle,
} from '@/shared/components/ui/card';
import { ClientBooking } from '@/shared/types';

import { useCancelBooking } from '@/features/booking/api/booking-hooks';

interface BookingCardProps {
   booking: ClientBooking;
   onCancelSuccess?: () => void;
}

const BookingCard = ({ booking, onCancelSuccess }: BookingCardProps) => {
   const [showConfirmation, setShowConfirmation] = useState(false);

   const { mutate: cancelBooking } = useCancelBooking();

   // Parse the date strings
   const appointmentDate = booking.appointment.date
      ? new Date(booking.appointment.date)
      : null;

   const formattedDate = appointmentDate
      ? format(appointmentDate, 'MMMM d, yyyy')
      : 'Date not available';

   const handleCancelBooking = () => {
      cancelBooking(booking.id.toString(), {
         onSuccess: () => {
            toast.success('Booking cancelled successfully');
            if (onCancelSuccess) {
               onCancelSuccess();
            }
         },
         onError: (error) => {
            toast.error('Failed to cancel booking');
            console.error('Cancel booking error:', error);
         },
      });
   };

   const viewMeeting = () => {
      if (booking.google_meet_link) {
         window.open(booking.google_meet_link, '_blank');
      } else {
         toast.error('Meeting link is not available yet');
      }
   };

   // Determine if the booking is upcoming
   const now = new Date();
   const bookingDateTime = appointmentDate;
   const isUpcoming = bookingDateTime ? bookingDateTime > now : false;

   // Status colors
   const getStatusColor = () => {
      switch (booking.status) {
         case 'confirmed':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
         case 'pending':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
         case 'cancelled':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
         case 'served':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
         default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      }
   };

   return (
      <Card className='overflow-hidden'>
         <CardContent className='p-0'>
            <div className='p-6'>
               <div className='flex items-start justify-between'>
                  <div>
                     <CardTitle className='text-lg font-semibold'>
                        Appointment with {booking.doctor.name}
                     </CardTitle>
                     <CardDescription className='mt-1'>
                        {booking.doctor.specialties?.join(', ') ||
                           'No specialties listed'}
                     </CardDescription>
                  </div>

                  <Badge className={`${getStatusColor()} ml-2 uppercase`}>
                     {booking.status}
                  </Badge>
               </div>

               <div className='mt-6 space-y-2'>
                  <div className='flex items-center text-sm'>
                     <CalendarIcon className='mr-2 h-4 w-4' />
                     <span>{formattedDate}</span>
                  </div>
                  <div className='flex items-center text-sm'>
                     <Clock className='mr-2 h-4 w-4' />
                     <span>
                        {booking.appointment.start_time} -{' '}
                        {booking.appointment.end_time}
                     </span>
                  </div>
                  <div className='flex items-center text-sm'>
                     <MapPin className='mr-2 h-4 w-4' />
                     <span>
                        {booking.google_meet_link
                           ? 'Online Appointment'
                           : 'In-person Appointment'}
                     </span>
                  </div>
                  <div className='flex items-center text-sm'>
                     <User className='mr-2 h-4 w-4' />
                     <span>Patient: {booking.client?.name || 'You'}</span>
                  </div>
               </div>

               {!showConfirmation ? (
                  <div className='mt-6 flex flex-wrap gap-3'>
                     {booking.google_meet_link && (
                        <Button
                           variant='outline'
                           className='flex-1'
                           onClick={viewMeeting}
                        >
                           Join Meeting
                        </Button>
                     )}
                     {isUpcoming && booking.status !== 'cancelled' && (
                        <Button
                           variant='destructive'
                           className='flex-1'
                           onClick={() => setShowConfirmation(true)}
                        >
                           Cancel
                        </Button>
                     )}
                  </div>
               ) : (
                  <div className='mt-6 space-y-3'>
                     <p className='text-sm text-muted-foreground'>
                        Are you sure you want to cancel this appointment?
                     </p>
                     <div className='flex flex-wrap gap-3'>
                        <Button
                           variant='destructive'
                           className='flex-1'
                           onClick={handleCancelBooking}
                        >
                           Yes, Cancel
                        </Button>
                        <Button
                           variant='outline'
                           className='flex-1'
                           onClick={() => setShowConfirmation(false)}
                        >
                           No, Keep
                        </Button>
                     </div>
                  </div>
               )}
            </div>
         </CardContent>
      </Card>
   );
};

export default BookingCard;
