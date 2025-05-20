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
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Textarea } from '@/shared/components/ui/textarea';
import { Doctor } from '@/shared/types';

import { useUpdateProfile } from '@/features/settings/api/hooks';
import { DoctorUpdatePayload } from '@/features/settings/api/service';
import { SpecialtySection } from '@/features/settings/components/doctor-profile-settings/specialty-section';

type DoctorProfileProps = {
   currentUser: Doctor;
   activeTab: string;
};

export function DoctorProfileSettings({
   activeTab,
   currentUser,
}: DoctorProfileProps) {
   const [specialties, setSpecialties] = useState<string[]>(
      currentUser?.specialization || []
   );
   const { mutate: updateProfile, isPending } = useUpdateProfile();

   const personalForm = useForm<{
      name: string;
      email: string;
      phone: string;
      age: string;
      gender: string;
   }>({
      defaultValues: {
         name: currentUser?.name || '',
         email: currentUser?.email || '',
         phone: currentUser?.phone || '',
         age: currentUser?.age?.toString() || '',
         gender: currentUser?.gender || 'male',
      },
   });

   const professionalForm = useForm<{
      bio: string;
      fees: string;
   }>({
      defaultValues: {
         bio: currentUser?.bio || '',
         fees: currentUser?.fees || '',
      },
   });

   const clinicForm = useForm<{
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

   const onSubmitPersonal = (values: any) => {
      const payload: DoctorUpdatePayload = {
         name: values.name,
         email: values.email,
         phone: values.phone,
         age: values.age ? parseInt(values.age) : null,
         gender: values.gender,
      };
      updateProfile(payload);
   };

   const onSubmitProfessional = (values: any) => {
      const payload: DoctorUpdatePayload = {
         bio: values.bio,
         fees: values.fees,
         specialization: specialties,
      };
      updateProfile(payload);
   };

   const onSubmitClinic = (values: any) => {
      const payload: DoctorUpdatePayload = {
         clinicname: values.clinicname,
         clinicaddress: values.clinicaddress,
         clinicgovernate: values.clinicgovernate || null,
      };
      updateProfile(payload);
   };

   if (activeTab === 'personal') {
      return (
         <Card className='w-full'>
            <CardContent className='pt-6'>
               <Form {...personalForm}>
                  <form
                     onSubmit={personalForm.handleSubmit(onSubmitPersonal)}
                     className='space-y-6'
                  >
                     <FormField
                        control={personalForm.control}
                        name='name'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder='Dr. Full Name'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={personalForm.control}
                        name='email'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder='your@email.com'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={personalForm.control}
                        name='phone'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                 <Input placeholder='01234567890' {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={personalForm.control}
                        name='age'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                 <Input
                                    type='number'
                                    placeholder='35'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={personalForm.control}
                        name='gender'
                        render={({ field }) => (
                           <FormItem className='space-y-3'>
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                 <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='flex flex-row space-x-4'
                                 >
                                    <FormItem className='flex items-center space-x-2 space-y-0'>
                                       <FormControl>
                                          <RadioGroupItem value='male' />
                                       </FormControl>
                                       <FormLabel className='font-normal'>
                                          Male
                                       </FormLabel>
                                    </FormItem>
                                    <FormItem className='flex items-center space-x-2 space-y-0'>
                                       <FormControl>
                                          <RadioGroupItem value='female' />
                                       </FormControl>
                                       <FormLabel className='font-normal'>
                                          Female
                                       </FormLabel>
                                    </FormItem>
                                 </RadioGroup>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <Button type='submit' disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save Personal Info'}
                     </Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      );
   }

   if (activeTab === 'professional') {
      return (
         <Card className='w-full'>
            <CardContent className='pt-6'>
               <Form {...professionalForm}>
                  <form
                     onSubmit={professionalForm.handleSubmit(
                        onSubmitProfessional
                     )}
                     className='space-y-6'
                  >
                     <FormField
                        control={professionalForm.control}
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
                        control={professionalForm.control}
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

   if (activeTab === 'clinic') {
      return (
         <Card className='w-full'>
            <CardContent className='pt-6'>
               <Form {...clinicForm}>
                  <form
                     onSubmit={clinicForm.handleSubmit(onSubmitClinic)}
                     className='space-y-6'
                  >
                     <FormField
                        control={clinicForm.control}
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
                        control={clinicForm.control}
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
                        control={clinicForm.control}
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

   return null;
}
