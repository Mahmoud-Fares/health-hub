import React from 'react';

import { Calendar, Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Calendar as CalendarComponent } from '@/shared/components/ui/calendar';
import { cn } from '@/shared/lib/utils';

interface DateSelectorProps {
   selectedDate: Date | undefined;
   onDateSelect: (date: Date | undefined) => void;
   onAddNewClick: () => void;
   className?: string;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
   selectedDate,
   onDateSelect,
   onAddNewClick,
   className,
}) => {
   return (
      <div
         className={cn('h-fit rounded-lg p-4 shadow-md dark:border', className)}
      >
         <h2 className='mb-4 flex items-center text-lg font-medium'>
            <Calendar className='mr-2 h-5 w-5' /> Select Date
         </h2>
         <div className='w-fit rounded-md border'>
            <CalendarComponent
               mode='single'
               selected={selectedDate}
               onSelect={onDateSelect}
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
         <Button
            onClick={onAddNewClick}
            className='mt-4 w-full'
            disabled={!selectedDate}
         >
            <Plus className='mr-2 h-4 w-4' /> Add New Appointment
         </Button>
      </div>
   );
};
