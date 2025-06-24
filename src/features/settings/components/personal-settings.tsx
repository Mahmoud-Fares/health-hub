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
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';

import { useAuth } from '@/features/auth';
import { useUpdateProfile } from '@/features/settings/api/hooks';
import {
   ClientUpdatePayload,
   DoctorUpdatePayload,
} from '@/features/settings/api/service';

export default function PersonalSettings() {
   const { currentUser } = useAuth();
   const { mutate: updateProfile, isPending } = useUpdateProfile();

   const form = useForm<{
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

   const onSubmit = (values: any) => {
      const payload: ClientUpdatePayload | DoctorUpdatePayload = {
         name: values.name,
         email: values.email,
         phone: values.phone,
         age: values.age ? parseInt(values.age) : null,
         gender: values.gender,
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
                     name='name'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Full Name</FormLabel>
                           <FormControl>
                              <Input placeholder='Your Full Name' {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name='email'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input placeholder='your@email.com' {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
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
                     control={form.control}
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
                     control={form.control}
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
