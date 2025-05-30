import React from 'react';

import { Edit, Trash2 } from 'lucide-react';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import { DoctorAppointment } from '@/shared/types';

interface AppointmentListProps {
   appointments: DoctorAppointment[];
   isLoading: boolean;
   isError: boolean;
   onEdit: (appointment: DoctorAppointment) => void;
   onDelete: (id: number) => void;
   formatDate: (dateString: string) => string;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
   appointments,
   isLoading,
   isError,
   onEdit,
   onDelete,
   formatDate,
}) => {
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
                        {formatDate(appointment.date)}
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
                           <svg
                              width='15'
                              height='15'
                              viewBox='0 0 15 15'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4'
                           >
                              <path
                                 d='M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z'
                                 fill='currentColor'
                                 fillRule='evenodd'
                                 clipRule='evenodd'
                              ></path>
                           </svg>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                           onClick={() => onEdit(appointment)}
                           className='cursor-pointer'
                        >
                           <Edit className='mr-2 h-4 w-4' />
                           Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                           onClick={() => onDelete(appointment.id)}
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
