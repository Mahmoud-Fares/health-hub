import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';

import { useDoctorSchedule } from '../context/doctor-schedule-context';

export const AppointmentList = () => {
   const {
      appointments,
      isLoading,
      isError,
      openEditDialog,
      handleDeleteAppointment,
      formatAppointmentDate,
   } = useDoctorSchedule();

   if (isLoading) {
      return (
         <div className='flex justify-center py-10'>
            <Spinner className='size-16' />
         </div>
      );
   }

   if (isError) {
      return (
         <div className='rounded-md p-4 text-red-800'>
            Failed to load appointments. Please try again later.
         </div>
      );
   }

   if (appointments.length === 0) {
      return (
         <div className='py-10 text-center text-gray-500'>
            <p>No appointments scheduled yet.</p>
            <p className='mt-2 text-sm'>
               Select a date and click "Add New Appointment" to get started.
            </p>
         </div>
      );
   }

   return (
      <div className='space-y-4'>
         {appointments.map((appointment) => (
            <div
               key={appointment.id}
               className={cn(
                  'rounded-md border-l-4 p-4',
                  appointment.is_available
                     ? 'border-l-green-500 bg-green-50 text-green-900 dark:border-l-green-400 dark:bg-green-950 dark:text-green-100'
                     : 'border-l-gray-300 bg-gray-50 text-gray-800 dark:border-l-gray-600 dark:bg-muted dark:text-muted-foreground'
               )}
            >
               <div className='flex items-start justify-between'>
                  <div>
                     <h3 className='font-medium'>
                        {formatAppointmentDate(appointment.date)}
                     </h3>
                     <div className='mt-1 text-sm'>
                        <p>
                           Time: {appointment.start_time} -{' '}
                           {appointment.end_time}
                        </p>
                        <p>Session: {appointment.session_duration} minutes</p>
                        <p>Max Patients: {appointment.max_patients}</p>
                        <p
                           className={
                              appointment.is_available
                                 ? 'text-green-600'
                                 : 'text-gray-500'
                           }
                        >
                           Status:{' '}
                           {appointment.is_available
                              ? 'Available'
                              : 'Not Available'}
                        </p>
                     </div>
                  </div>

                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant='ghost'
                           size='sm'
                           className='h-8 w-8 p-0'
                        >
                           <span className='sr-only'>Open menu</span>
                           <MoreHorizontal />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                           onClick={() => openEditDialog(appointment)}
                           className='cursor-pointer'
                        >
                           <div className='flex items-center space-x-2'>
                              <Edit className='mr-2 h-4 w-4' />
                              Edit
                           </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                           onClick={() =>
                              handleDeleteAppointment(appointment.id)
                           }
                           className='cursor-pointer text-red-600 focus:text-red-600'
                        >
                           <Trash2 className='mr-2 h-4 w-4' />
                           Delete
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
         ))}
      </div>
   );
};
