import { useState } from 'react';

import { Check, X } from 'lucide-react';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import { CardContent, CardFooter } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { DoctorAppointment } from '@/shared/types';

import { useGetAvailableSlots } from '@/features/booking/api/booking-hooks';
import AppointmentSelector from '@/features/booking/components/appointment-selector';
import TimeSlotSelector from '@/features/booking/components/time-slot-selector';

interface AppointmentBookingSectionProps {
   appointments: DoctorAppointment[];
   onBookAppointment: (appointmentId: number, slotStartTime: string) => void;
   isBooking: boolean;
   onCancel: () => void;
}

export const AppointmentBookingSection = ({
   appointments,
   onBookAppointment,
   isBooking,
   onCancel,
}: AppointmentBookingSectionProps) => {
   const [selectedAppointment, setSelectedAppointment] =
      useState<DoctorAppointment | null>(null);
   const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
      null
   );

   const { data: slotsResponse, isLoading: isLoadingSlots } =
      useGetAvailableSlots(selectedAppointment?.id?.toString());

   const availableSlots = slotsResponse?.data || [];

   const handleAppointmentSelect = (appointment: DoctorAppointment) => {
      setSelectedAppointment(appointment);
      setSelectedTimeSlot(null);
   };

   const handleTimeSlotSelect = (slot: string) => {
      setSelectedTimeSlot(slot);
   };

   const handleBookAppointment = () => {
      if (!selectedAppointment || !selectedTimeSlot) return;
      onBookAppointment(selectedAppointment.id, selectedTimeSlot);
   };

   return (
      <>
         <CardContent className='space-y-6'>
            <div>
               <h2 className='mb-4 text-xl font-semibold'>
                  Book an Appointment
               </h2>
               <AppointmentSelector
                  appointments={appointments}
                  onAppointmentSelect={handleAppointmentSelect}
                  selectedAppointmentId={selectedAppointment?.id || null}
               />
            </div>

            {selectedAppointment && (
               <>
                  <Separator />
                  <div>
                     {isLoadingSlots ? (
                        <div className='flex items-center justify-center py-4'>
                           <Spinner className='size-8' />
                        </div>
                     ) : (
                        <TimeSlotSelector
                           slots={availableSlots}
                           onSlotSelect={handleTimeSlotSelect}
                           selectedSlot={selectedTimeSlot}
                        />
                     )}
                  </div>
               </>
            )}
         </CardContent>

         <CardFooter className='flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0'>
            <Button variant='outline' onClick={onCancel}>
               <X className='mr-2 h-4 w-4' /> Cancel
            </Button>

            <Button
               onClick={handleBookAppointment}
               disabled={!selectedTimeSlot || isBooking}
               className='w-full sm:w-auto'
            >
               {isBooking ? (
                  <Spinner className='border-white' />
               ) : (
                  <>
                     <Check className='mr-2 h-4 w-4' /> Book Appointment
                  </>
               )}
            </Button>
         </CardFooter>
      </>
   );
};
