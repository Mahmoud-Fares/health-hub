import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { AppointmentType } from '../hooks/use-appointments';

interface AppointmentEmptyStateProps {
   type: AppointmentType;
}

export const AppointmentEmptyState = ({ type }: AppointmentEmptyStateProps) => {
   return (
      <div className='py-12 text-center'>
         <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full'>
            <Calendar size={24} className='text-muted-foreground' />
         </div>
         <h3 className='mb-2 text-lg font-medium'>No appointments found</h3>
         <p className='mb-4 text-muted-foreground'>
            You don't have any {type} appointments yet.
         </p>
         <Link to='/find-doctors'>
            <Button>Book an Appointment</Button>
         </Link>
      </div>
   );
};
