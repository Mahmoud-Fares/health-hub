'use no memo';

import { Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';

import AppointmentSheetDrawer from '@/features/doctor/components/appointment-sheet-drawer';
import { DateSelector } from '@/features/doctor/components/date-selector';
import { useDialogs } from '@/features/doctor/hooks/use-dialogs';

const DoctorScheduleDateSelector: React.FC = () => {
   const { form } = useDialogs();

   return (
      <Form {...form}>
         <DateSelector name='date' />

         <AppointmentSheetDrawer event='add'>
            <Button variant='outline' size='icon' className='sr-only'>
               <Plus className='h-4 w-4' />
            </Button>
         </AppointmentSheetDrawer>

         <AppointmentSheetDrawer
            event='edit'
            initialValues={{
               date: '2025-07-02',
               day: '',
               doctor_name: 'Dr. Williams',
               end_time: '12:00',
               id: 31,
               is_available: 1,
               max_patients: 4,
               session_duration: '00:30:00',
               start_time: '10:00',
            }}
         >
            <Button variant='outline' size='icon' className='sr-only'>
               <Plus className='h-4 w-4' />
            </Button>
         </AppointmentSheetDrawer>
      </Form>
   );
};

export default DoctorScheduleDateSelector;
