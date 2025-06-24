import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

import { isPatient, useAuth } from '@/features/auth';
import { useUpdateProfile } from '@/features/settings/api/hooks';
import { DoctorUpdatePayload } from '@/features/settings/api/service';

export default function ClinicSettings() {
   const { currentUser } = useAuth();
   if (isPatient(currentUser!)) throw new Error('That is Doctor only settings');

   const { mutate: updateProfile, isPending } = useUpdateProfile();

   const form = useForm<{
      clinicname: string;
      clinicaddress: string;
      clinicgovernate: string;
   }>({
      defaultValues: {
         clinicname: currentUser?.clinicname || '',
         clinicaddress: currentUser?.clinicaddress || '',
         clinicgovernate: currentUser?.clinicgovernate || '',
      },
   });

   const onSubmit = (values: any) => {
      const payload: DoctorUpdatePayload = {
         clinicname: values.clinicname,
         clinicaddress: values.clinicaddress,
         clinicgovernate: values.clinicgovernate || null,
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
                     name='clinicname'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Clinic Name</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='Your Clinic Name'
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name='clinicaddress'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Clinic Address</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='123 Medical Street'
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name='clinicgovernate'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Governate/Region</FormLabel>
                           <FormControl>
                              <Input placeholder='Cairo' {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button type='submit' disabled={isPending}>
                     {isPending ? 'Saving...' : 'Save Clinic Info'}
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
}
