'use no memo';

import { Form } from '@/shared/components/ui/form';

import { useDoctorSchedule } from '../../context/doctor-schedule-context';
import { DateSelector } from '../date-selector';

const DoctorScheduleDateSelector: React.FC = () => {
   const { form, openAddDialog } = useDoctorSchedule();

   return (
      <Form {...form}>
         <DateSelector
            name='date'
            onAddNewClick={() =>
               openAddDialog(
                  form.getValues('date')
                     ? new Date(form.getValues('date'))
                     : new Date()
               )
            }
         />
      </Form>
   );
};

export default DoctorScheduleDateSelector;
