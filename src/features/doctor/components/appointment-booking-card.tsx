import { Check, Clock, User } from 'lucide-react';
import { toast } from 'sonner';

import Spinner from '@/shared/components/spinner';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { BookingSlot } from '@/shared/types';

import { useMarkBookingAsServed } from '@/features/doctor/api/booking-management-hooks';

interface Props {
   slot: BookingSlot;
   appointmentDate: string;
   isServed?: boolean;
}

export const AppointmentBookingCard = ({
   slot,
   appointmentDate,
   isServed = false,
}: Props) => {
   const { mutate: markAsServed, isPending } = useMarkBookingAsServed();

   const handleMarkAsServed = () => {
      markAsServed(slot.booking_id, {
         onSuccess: () => {
            toast.success('Booking marked as served', {
               description: `Booking for ${slot.slot_start_time.substring(
                  0,
                  5
               )} has been marked as served.`,
            });
         },
      });
   };

   return (
      <div className='mb-4 w-full overflow-hidden rounded-lg border bg-accent/25 shadow-sm'>
         <div className='p-4'>
            <div className='flex items-center justify-between'>
               <div className='flex items-center'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                     <Clock size={24} />
                  </div>
                  <div className='ml-3'>
                     <h3 className='text-lg font-medium'>
                        {slot.slot_start_time.substring(0, 5)} -{' '}
                        {slot.slot_end_time.substring(0, 5)}
                     </h3>
                     <p className='text-sm text-muted-foreground'>
                        {appointmentDate}
                     </p>
                  </div>
               </div>
               <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                     isServed
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                  }`}
               >
                  {isServed ? 'Served' : 'Confirmed'}
               </span>
            </div>
         </div>

         <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='client-details'>
               <AccordionTrigger className='flex w-full items-center justify-between border-t px-4 py-2 text-sm font-medium hover:bg-accent hover:no-underline'>
                  <span>Client Details</span>
               </AccordionTrigger>
               <AccordionContent className='border-t'>
                  <div className='space-y-4 p-4'>
                     {slot.google_meet_link && (
                        <div>
                           <h4 className='mb-2 text-sm font-semibold'>
                              Meeting Link:
                           </h4>
                           <a
                              href={slot.google_meet_link}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-sm text-blue-600 hover:underline'
                           >
                              {slot.google_meet_link}
                           </a>
                        </div>
                     )}

                     <div className='space-y-3'>
                        <h4 className='text-sm font-semibold'>
                           Client Information:
                        </h4>
                        {slot.clients.map((client, index) => (
                           <div key={index} className='rounded-md border p-3'>
                              <div className='flex items-center space-x-2'>
                                 <User className='h-4 w-4 text-primary' />
                                 <span className='font-medium'>
                                    {client.name}
                                 </span>
                              </div>
                              <div className='mt-2 space-y-1 pl-6'>
                                 <p className='text-xs text-muted-foreground'>
                                    Email: {client.email}
                                 </p>
                                 <p className='text-xs text-muted-foreground'>
                                    Phone: {client.phone}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>

                     {!isServed && (
                        <div className='mt-4'>
                           <Button
                              onClick={handleMarkAsServed}
                              disabled={isPending}
                              className='w-full'
                           >
                              {isPending ? (
                                 <Spinner className='border-white' />
                              ) : (
                                 <>
                                    <Check className='mr-2 h-4 w-4' /> Mark as
                                    Served
                                 </>
                              )}
                           </Button>
                        </div>
                     )}
                  </div>
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
   );
};
