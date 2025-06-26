import { Calendar } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Calendar as CalendarComponent } from '@/shared/components/ui/calendar';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/shared/components/ui/popover';
import { Switch } from '@/shared/components/ui/switch';
import { useCalendarLogic } from '@/shared/hooks/use-calendar-logic';

import { useDialogs } from '@/features/doctor/hooks/use-dialogs';
import { AppointmentFormValues } from '@/features/doctor/hooks/use-dialogs-management';
import { useSchedule } from '@/features/doctor/hooks/use-schedule';

type Props = {
   type: 'add' | 'edit';
};

export const AppointmentForm = ({ type }: Props) => {
   const {
      createAppointment,
      updateAppointment,

      isCreating,
      isUpdating,
   } = useSchedule();

   const { form, editingId, closeDialog } = useDialogs();
   const { isDateDisabled, formatDateForInput, parseStringToDate } =
      useCalendarLogic();

   const isSubmitting = type === 'add' ? isCreating : isUpdating;
   const submitLabel = type === 'add' ? 'Create' : 'Update';

   const handleSubmit = (values: AppointmentFormValues) => {
      if (type === 'add') createAppointment(values);
      else if (editingId !== null) updateAppointment(editingId, values);

      closeDialog();
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className='grid gap-4 py-4'>
               <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Date</FormLabel>
                        <div className='flex items-center'>
                           <FormControl>
                              <Input
                                 {...field}
                                 value={field.value || ''}
                                 placeholder='YYYY-MM-DD'
                                 className='rounded-r-none'
                                 required
                              />
                           </FormControl>
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
                                    selected={parseStringToDate(field.value)}
                                    onSelect={(date) => {
                                       if (date) {
                                          field.onChange(
                                             formatDateForInput(date)
                                          );
                                       }
                                    }}
                                    initialFocus
                                    disabled={isDateDisabled}
                                 />
                              </PopoverContent>
                           </Popover>
                        </div>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name='start_time'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                           <Input
                              type='time'
                              {...field}
                              value={field.value || ''}
                              required
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name='end_time'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                           <Input
                              type='time'
                              {...field}
                              value={field.value || ''}
                              required
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                     control={form.control}
                     name='session_duration'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Session Duration (min)</FormLabel>
                           <FormControl>
                              <Input
                                 type='number'
                                 min={15}
                                 max={120}
                                 step={15}
                                 {...field}
                                 value={field.value || ''}
                                 required
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name='max_patients'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Max Patients</FormLabel>
                           <FormControl>
                              <Input
                                 type='number'
                                 min={1}
                                 {...field}
                                 value={field.value || ''}
                                 required
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <FormField
                  control={form.control}
                  name='is_available'
                  render={({ field }) => (
                     <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                        <FormLabel>Available for booking</FormLabel>
                        <FormControl>
                           <Switch
                              id='is_available'
                              checked={field.value}
                              onCheckedChange={field.onChange}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            {/* appears on the sheet only */}
            <div className='hidden justify-end gap-2 md:flex'>
               <Button
                  type='button'
                  variant='outline'
                  onClick={() => closeDialog()}
                  disabled={isSubmitting}
               >
                  Cancel
               </Button>
               <Button type='submit' disabled={isSubmitting}>
                  {submitLabel}
               </Button>
            </div>

            {/* appears on the drawer only */}
            <Button
               type='submit'
               disabled={isSubmitting}
               className='w-full md:hidden'
            >
               {submitLabel}
            </Button>
         </form>
      </Form>
   );
};
