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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { Patient } from '@/shared/types';

import { useUpdateProfile } from '@/features/settings/api/hooks';
import { ClientUpdatePayload } from '@/features/settings/api/service';

type ClientProfileProps = {
   currentUser: Patient;
   activeTab: string;
};

export const ClientProfileSettings = ({
   activeTab,
   currentUser,
}: ClientProfileProps) => {
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

   const healthForm = useForm<{
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

   const onSubmitPersonal = (values: any) => {
      const payload: ClientUpdatePayload = {
         name: values.name,
         email: values.email,
         phone: values.phone,
         age: values.age ? parseInt(values.age) : null,
         gender: values.gender,
      };
      updateProfile(payload);
   };

   const onSubmitHealth = (values: any) => {
      const payload: ClientUpdatePayload = {
         notes: values.notes || null,
         medical_history: values.medical_history || null,
         blood_type: values.blood_type || null,
         weight: values.weight ? parseFloat(values.weight) : null,
         height: values.height ? parseFloat(values.height) : null,
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
                                    placeholder='Your Full Name'
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
                                    placeholder='25'
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

   if (activeTab === 'health') {
      return (
         <Card className='w-full'>
            <CardContent className='pt-6'>
               <Form {...healthForm}>
                  <form
                     onSubmit={healthForm.handleSubmit(onSubmitHealth)}
                     className='space-y-6'
                  >
                     <FormField
                        control={healthForm.control}
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
                                 This information will be shared with your
                                 doctors
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={healthForm.control}
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
                        control={healthForm.control}
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
                           control={healthForm.control}
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
                           control={healthForm.control}
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

   return null;
};
