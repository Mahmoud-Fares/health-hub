'use no memo';

import { Calendar, Plus } from 'lucide-react';

import { CalendarField } from '@/shared/components/forms/calendar-field';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';
import { cn } from '@/shared/lib/utils';

import { useDialogs } from '@/features/doctor/hooks/use-dialogs';

export default function DoctorScheduleDateSelector() {
   const { openAddDialog, form } = useDialogs();

   return (
      <Form {...form}>
         <div className={cn('h-fit rounded-lg sm:p-4 sm:shadow-md')}>
            <h2 className='mb-4 flex items-center text-lg font-medium'>
               <Calendar className='mr-2 h-5 w-5' /> Select Date
            </h2>

            <CalendarField name='date' />

            <Button
               onClick={() => openAddDialog(new Date(form.getValues('date')))}
               className='mt-4 w-full'
            >
               <Plus className='mr-2 h-4 w-4' /> Add New Appointment
            </Button>
         </div>
      </Form>
   );
}
