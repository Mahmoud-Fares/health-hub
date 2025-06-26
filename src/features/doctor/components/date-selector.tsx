import React from 'react';

import { format, parse } from 'date-fns';
import { Calendar, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Calendar as CalendarComponent } from '@/shared/components/ui/calendar';
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { cn } from '@/shared/lib/utils';

import { useDialogs } from '@/features/doctor/hooks/use-dialogs';

interface DateSelectorProps {
   name: string;
   className?: string;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
   name,
   className,
}) => {
   const { control } = useFormContext();
   const { openAddDialog, form } = useDialogs();

   return (
      <div className={cn('h-fit rounded-lg p-4 shadow-md', className)}>
         <h2 className='mb-4 flex items-center text-lg font-medium'>
            <Calendar className='mr-2 h-5 w-5' /> Select Date
         </h2>
         <FormField
            control={control}
            name={name}
            render={({ field }) => (
               <FormItem>
                  <FormLabel className='sr-only'>Date</FormLabel>
                  <FormControl>
                     <div className='w-fit rounded-md border'>
                        <CalendarComponent
                           mode='single'
                           selected={
                              field.value
                                 ? parse(field.value, 'yyyy-MM-dd', new Date())
                                 : undefined
                           }
                           onSelect={(date) => {
                              if (date)
                                 field.onChange(format(date, 'yyyy-MM-dd'));
                              else field.onChange(null);
                           }}
                           className='rounded-md'
                           disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              const sevenDaysFromNow = new Date();
                              sevenDaysFromNow.setDate(today.getDate() + 7);
                              sevenDaysFromNow.setHours(23, 59, 59, 999);
                              return date < today || date > sevenDaysFromNow;
                           }}
                        />
                     </div>
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />

         <Button
            onClick={() => openAddDialog(new Date(form.getValues('date')))}
            className='mt-4 w-full'
         >
            <Plus className='mr-2 h-4 w-4' /> Add New Appointment
         </Button>
      </div>
   );
};
