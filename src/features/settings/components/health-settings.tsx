import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';

import { isDoctor, useAuth } from '@/features/auth';
import { useUpdateProfile } from '@/features/settings/api/hooks';
import { ClientUpdatePayload } from '@/features/settings/api/service';

export default function HealthSettings() {
   const { currentUser } = useAuth();
   const { mutate: updateProfile, isPending } = useUpdateProfile();

   if (isDoctor(currentUser!)) throw new Error('That is Patient only settings');

   const form = useForm<{
      notes: string;
      medical_history: string;
      blood_type: string;
      weight: string;
      height: string;
   }>({
      defaultValues: {
         notes: currentUser?.notes || '',
         medical_history: currentUser?.medical_history || '',
         blood_type: currentUser?.blood_type || '',
         weight: currentUser?.weight?.toString() || '',
         height: currentUser?.height?.toString() || '',
      },
   });

   const onSubmit = (values: any) => {
      const payload: ClientUpdatePayload = {
         notes: values.notes || null,
         medical_history: values.medical_history || null,
         blood_type: values.blood_type || null,
         weight: values.weight ? parseFloat(values.weight) : null,
         height: values.height ? parseFloat(values.height) : null,
      };
      updateProfile(payload);
   };

   return (
      <Card className='w-full'>
         <CardContent className='pt-6'>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
               >
                  <FormField
                     control={form.control}
                     name='medical_history'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Medical History</FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder='Please share any relevant medical history...'
                                 className='min-h-[120px]'
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>
                              This information will be shared with your doctors
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name='notes'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Additional Notes</FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder='Any other health information...'
                                 className='min-h-[80px]'
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name='blood_type'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Blood Type</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value || ''}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder='Select your blood type' />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value='A+'>A+</SelectItem>
                                 <SelectItem value='A-'>A-</SelectItem>
                                 <SelectItem value='B+'>B+</SelectItem>
                                 <SelectItem value='B-'>B-</SelectItem>
                                 <SelectItem value='AB+'>AB+</SelectItem>
                                 <SelectItem value='AB-'>AB-</SelectItem>
                                 <SelectItem value='O+'>O+</SelectItem>
                                 <SelectItem value='O-'>O-</SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                     <FormField
                        control={form.control}
                        name='weight'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                 <Input
                                    type='number'
                                    placeholder='70'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name='height'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Height (cm)</FormLabel>
                              <FormControl>
                                 <Input
                                    type='number'
                                    placeholder='170'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <Button type='submit' disabled={isPending}>
                     {isPending ? 'Saving...' : 'Save Health Info'}
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
}
