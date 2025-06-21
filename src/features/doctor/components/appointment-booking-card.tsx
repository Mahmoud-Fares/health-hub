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
      <div className='group mb-6 w-full overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-200 hover:border-border hover:shadow-md'>
         <div className='p-6'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
               <div className='flex items-center gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm transition-colors group-hover:bg-primary/15'>
                     <Clock size={20} />
                  </div>
                  <div className='min-w-0 flex-1'>
                     <h3 className='text-xl font-semibold leading-tight text-foreground'>
                        {slot.slot_start_time.substring(0, 5)} -{' '}
                        {slot.slot_end_time.substring(0, 5)}
                     </h3>
                     <p className='mt-1 text-sm font-medium text-muted-foreground'>
                        {appointmentDate}
                     </p>
                  </div>
               </div>
               <span
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold capitalize shadow-sm transition-all duration-200 ${
                     isServed
                        ? 'border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'border border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300'
                  }`}
               >
                  <div
                     className={`mr-2 h-2 w-2 rounded-full ${
                        isServed ? 'bg-blue-500' : 'bg-green-500'
                     }`}
                  />
                  {isServed ? 'Served' : 'Confirmed'}
               </span>
            </div>
         </div>

         <Accordion type='single' collapsible className='w-full'>
            <AccordionItem
               value='client-details'
               className='border-t border-border/50'
            >
               <AccordionTrigger className='flex w-full items-center justify-between px-6 py-4 text-sm font-semibold transition-colors hover:bg-accent/50 hover:no-underline'>
                  <span className='flex items-center gap-2'>
                     <User className='h-4 w-4 text-primary' />
                     Client Details
                  </span>
               </AccordionTrigger>
               <AccordionContent className='border-t border-border/50'>
                  <div className='space-y-6 p-6'>
                     {slot.google_meet_link && (
                        <div className='space-y-3'>
                           <h4 className='flex items-center gap-2 text-sm font-semibold text-foreground'>
                              <div className='h-2 w-2 rounded-full bg-blue-500' />
                              Meeting Link
                           </h4>
                           <a
                              href={slot.google_meet_link}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='inline-flex items-center gap-2 break-all text-sm text-blue-600 transition-colors hover:text-blue-700 hover:underline'
                           >
                              {slot.google_meet_link}
                           </a>
                        </div>
                     )}

                     <div className='space-y-4'>
                        <h4 className='flex items-center gap-2 text-sm font-semibold text-foreground'>
                           <div className='h-2 w-2 rounded-full bg-primary' />
                           Client Information
                        </h4>
                        <div className='space-y-3'>
                           {slot.clients.map((client, index) => (
                              <div
                                 key={index}
                                 className='rounded-lg border border-border/50 bg-accent/25 p-4 transition-colors hover:bg-accent/50'
                              >
                                 <div className='mb-3 flex items-center gap-3'>
                                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary'>
                                       <User className='h-4 w-4' />
                                    </div>
                                    <span className='font-semibold text-foreground'>
                                       {client.name}
                                    </span>
                                 </div>
                                 <div className='space-y-2 pl-11'>
                                    <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4'>
                                       <p className='text-sm text-muted-foreground'>
                                          <span className='font-medium'>
                                             Email:
                                          </span>{' '}
                                          {client.email}
                                       </p>
                                       <p className='text-sm text-muted-foreground'>
                                          <span className='font-medium'>
                                             Phone:
                                          </span>{' '}
                                          {client.phone}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {!isServed && (
                        <div className='border-t border-border/50 pt-4'>
                           <Button
                              onClick={handleMarkAsServed}
                              disabled={isPending}
                              className='w-full bg-green-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-md'
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
