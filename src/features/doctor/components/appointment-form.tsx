import React from 'react';

import { Calendar } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Calendar as CalendarComponent } from '@/shared/components/ui/calendar';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/shared/components/ui/popover';
import { Switch } from '@/shared/components/ui/switch';
import { AppointmentPayload } from '@/shared/types';

interface AppointmentFormProps {
   formData: Partial<AppointmentPayload>;
   selectedDate: Date | undefined;
   onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onSwitchChange: (checked: boolean) => void;
   onDateSelect: (date: Date | undefined) => void;
   onSubmit: (e: React.FormEvent) => void;
   onCancel: () => void;
   submitLabel: string;
   isSubmitting: boolean;
   formId: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
   formData,
   selectedDate,
   onInputChange,
   onSwitchChange,
   onDateSelect,
   onSubmit,
   onCancel,
   submitLabel,
   isSubmitting,
   formId,
}) => {
   return (
      <form onSubmit={onSubmit} id={formId}>
         <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
               <Label htmlFor={`${formId}-date`}>Date</Label>
               <div className='flex items-center'>
                  <Input
                     id={`${formId}-date`}
                     name='date'
                     value={formData.date}
                     onChange={onInputChange}
                     placeholder='YYYY-MM-DD'
                     className='rounded-r-none'
                     required
                  />
                  <Popover>
                     <PopoverTrigger asChild>
                        <Button
                           type='button'
                           variant='outline'
                           className='rounded-l-none border-l-0 px-2'
                        >
                           <Calendar className='h-4 w-4' />
                        </Button>
                     </PopoverTrigger>
                     <PopoverContent className='w-auto p-0'>
                        <CalendarComponent
                           mode='single'
                           selected={selectedDate}
                           onSelect={onDateSelect}
                           initialFocus
                           disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              const sevenDaysFromNow = new Date();
                              sevenDaysFromNow.setDate(today.getDate() + 7);
                              sevenDaysFromNow.setHours(23, 59, 59, 999);
                              return date < today || date > sevenDaysFromNow;
                           }}
                        />
                     </PopoverContent>
                  </Popover>
               </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
               <div className='grid gap-2'>
                  <Label htmlFor={`${formId}-start_time`}>Start Time</Label>
                  <Input
                     id={`${formId}-start_time`}
                     name='start_time'
                     type='time'
                     value={formData.start_time}
                     onChange={onInputChange}
                     required
                  />
               </div>
               <div className='grid gap-2'>
                  <Label htmlFor={`${formId}-end_time`}>End Time</Label>
                  <Input
                     id={`${formId}-end_time`}
                     name='end_time'
                     type='time'
                     value={formData.end_time}
                     onChange={onInputChange}
                     required
                  />
               </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
               <div className='grid gap-2'>
                  <Label htmlFor={`${formId}-session_duration`}>
                     Session Duration (min)
                  </Label>
                  <Input
                     id={`${formId}-session_duration`}
                     name='session_duration'
                     type='number'
                     min={15}
                     max={120}
                     step={15}
                     value={formData.session_duration}
                     onChange={onInputChange}
                     required
                  />
               </div>
               <div className='grid gap-2'>
                  <Label htmlFor={`${formId}-max_patients`}>Max Patients</Label>
                  <Input
                     id={`${formId}-max_patients`}
                     name='max_patients'
                     type='number'
                     min={1}
                     value={formData.max_patients}
                     onChange={onInputChange}
                     required
                  />
               </div>
            </div>

            <div className='flex items-center space-x-2'>
               <Switch
                  id={`${formId}-is_available`}
                  checked={formData.is_available}
                  onCheckedChange={onSwitchChange}
               />
               <Label htmlFor={`${formId}-is_available`}>
                  Available for booking
               </Label>
            </div>
         </div>
         <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={onCancel}>
               Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
               {submitLabel}
            </Button>
         </div>
      </form>
   );
};
