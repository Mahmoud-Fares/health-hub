import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import { DoctorAppointment } from '@/shared/types';

import { useDialogs } from '@/features/doctor/hooks/use-dialogs';
import { formatAppointmentDate } from '@/features/doctor/utils';

type Props = {
   appointment: DoctorAppointment;
};

export default function AppointmentCard({ appointment }: Props) {
   return (
      <div
         className={cn(
            'flex items-start justify-between rounded-md border-l-4 p-4',
            appointment.is_available
               ? 'border-l-green-500 bg-green-50 text-green-900 dark:border-l-green-400 dark:bg-green-950 dark:text-green-100'
               : 'border-l-gray-300 bg-gray-50 text-gray-800 dark:border-l-gray-600 dark:bg-muted dark:text-muted-foreground'
         )}
      >
         <div>
            <h3 className='font-medium'>
               {formatAppointmentDate(appointment.date)}
            </h3>

            <div className='mt-1 text-sm'>
               <p>
                  Time: {appointment.start_time} - {appointment.end_time}
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
                  {appointment.is_available ? 'Available' : 'Not Available'}
               </p>
            </div>
         </div>

         <CardActions appointment={appointment} />
      </div>
   );
}

const CardActions = ({ appointment }: Props) => {
   const { openEditDialog, openDeleteDialog } = useDialogs();

   return (
      <DropdownMenu modal={false}>
         <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
               <span className='sr-only'>Open menu</span>
               <MoreHorizontal />
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align='end'>
            <DropdownMenuItem
               onClick={() => openEditDialog(appointment)}
               className='cursor-pointer'
            >
               <div className='flex items-center gap-2'>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit
               </div>
            </DropdownMenuItem>

            <DropdownMenuItem
               className='cursor-pointer text-red-600 focus:text-red-600'
               onClick={() => openDeleteDialog(appointment)}
            >
               <Trash2 className='mr-2 h-4 w-4' />
               Delete
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
