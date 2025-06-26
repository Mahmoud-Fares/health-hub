import Spinner from '@/shared/components/spinner';

import AppointmentCard from '@/features/doctor/components/appointment-card';
import { useSchedule } from '@/features/doctor/hooks/use-schedule';

export const AppointmentList = () => {
   const { appointments, isLoading, isError } = useSchedule();

   if (isLoading)
      return (
         <div className='flex justify-center py-10'>
            <Spinner className='size-16' />
         </div>
      );

   if (isError)
      return (
         <div className='rounded-md p-4 text-red-800'>
            Failed to load appointments. Please try again later.
         </div>
      );

   if (appointments.length === 0)
      return (
         <div className='py-10 text-center text-gray-500'>
            <p>No appointments scheduled yet.</p>
            <p className='mt-2 text-sm'>
               Select a date and click "Add New Appointment" to get started.
            </p>
         </div>
      );

   return (
      <div className='space-y-4'>
         {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
         ))}
      </div>
   );
};
