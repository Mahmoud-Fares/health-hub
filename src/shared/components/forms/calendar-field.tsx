import { useFormContext } from 'react-hook-form';

import { Calendar as CalendarComponent } from '@/shared/components/ui/calendar';
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { useCalendarLogic } from '@/shared/hooks/use-calendar-logic';
import { cn } from '@/shared/lib/utils';

type CalendarFieldProps = {
   name: string;
   label?: string;
   showLabel?: boolean;
   className?: string;
   calendarClassName?: string;
   containerClassName?: string;
};

export const CalendarField = ({
   name,
   label = 'Date',
   showLabel = false,
   className,
   calendarClassName,
   containerClassName,
}: CalendarFieldProps) => {
   const { control } = useFormContext();
   const { isDateDisabled, parseStringToDate, formatDateToString } =
      useCalendarLogic();

   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem className={className}>
               <FormLabel className={showLabel ? '' : 'sr-only'}>
                  {label}
               </FormLabel>
               <FormControl>
                  <div
                     className={cn(
                        'w-fit rounded-md border',
                        containerClassName
                     )}
                  >
                     <CalendarComponent
                        mode='single'
                        selected={parseStringToDate(field.value)}
                        onSelect={(date) => {
                           field.onChange(formatDateToString(date));
                        }}
                        className={cn('rounded-md', calendarClassName)}
                        disabled={isDateDisabled}
                     />
                  </div>
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   );
};
