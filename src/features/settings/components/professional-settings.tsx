import { useState } from 'react';

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
import { Textarea } from '@/shared/components/ui/textarea';

import { isPatient, useAuth } from '@/features/auth';
import { useUpdateProfile } from '@/features/settings/api/hooks';
import { DoctorUpdatePayload } from '@/features/settings/api/service';
import { SpecialtySection } from '@/features/settings/components/specialty-section';

export default function ProfessionalSettings() {
   const { currentUser } = useAuth();
   if (isPatient(currentUser!)) throw new Error('That is Doctor only settings');

   const [specialties, setSpecialties] = useState<string[]>(
      currentUser?.specialization || []
   );

   const { mutate: updateProfile, isPending } = useUpdateProfile();

   const form = useForm<{
      bio: string;
      fees: string;
   }>({
      defaultValues: {
         bio: currentUser?.bio || '',
         fees: currentUser?.fees || '',
      },
   });

   const onSubmit = (values: any) => {
      const payload: DoctorUpdatePayload = {
         bio: values.bio,
         fees: values.fees,
         specialization: specialties,
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
                     name='bio'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Professional Bio</FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder='Share your professional experience and expertise...'
                                 className='min-h-[120px]'
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>
                              This bio will be visible on your public profile
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name='fees'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Consultation Fees</FormLabel>
                           <FormControl>
                              <Input placeholder='2000.00' {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <SpecialtySection
                     specialties={specialties}
                     onSpecialtiesChange={setSpecialties}
                  />

                  <Button type='submit' disabled={isPending}>
                     {isPending ? 'Saving...' : 'Save Professional Info'}
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
}
