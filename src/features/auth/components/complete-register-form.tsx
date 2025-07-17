'use no memo';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';

import { useCompleteRegister } from '@/features/auth/api/auth-hooks';
import { completeRegisterSchema } from '@/features/auth/schema';
import { CompleteRegisterPayload } from '@/features/auth/types';

type Props = {
   token: string;
   slug: string;
};
export const CompleteRegisterForm = ({ token, slug }: Props) => {
   const { mutate: completeRegister, isPending } = useCompleteRegister();

   const form = useForm<CompleteRegisterPayload>({
      resolver: zodResolver(completeRegisterSchema),
      defaultValues: {
         role: 'client',
         phone: '',
         gender: 'male',
      },
   });

   return (
      <Card className='mx-auto w-full max-w-md animate-fade-in'>
         <CardHeader>
            <CardTitle className='text-2xl font-bold'>
               Complete Registration
            </CardTitle>
            <CardDescription>
               Complete your registration to get started
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit((values) =>
                     completeRegister({ ...values, token, slug })
                  )}
                  className='space-y-4'
               >
                  <FormField
                     control={form.control}
                     name='role'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>I am a</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder='Select your role' />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value='client'>Patient</SelectItem>
                                 <SelectItem value='doctor'>Doctor</SelectItem>
                              </SelectContent>
                           </Select>
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
                                 className='flex space-x-4'
                              >
                                 <FormItem className='flex items-center gap-2'>
                                    <FormControl>
                                       <RadioGroupItem value='male' />
                                    </FormControl>
                                    <FormLabel className='cursor-pointer font-normal'>
                                       Male
                                    </FormLabel>
                                 </FormItem>
                                 <FormItem className='flex items-center gap-2'>
                                    <FormControl>
                                       <RadioGroupItem value='female' />
                                    </FormControl>
                                    <FormLabel className='cursor-pointer font-normal'>
                                       Female
                                    </FormLabel>
                                 </FormItem>
                              </RadioGroup>
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
                              <Input
                                 placeholder='+1 234 567 8900'
                                 {...field}
                                 autoComplete='tel'
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button
                     type='submit'
                     className='mt-6 w-full'
                     disabled={isPending}
                  >
                     {isPending
                        ? 'Completing registration...'
                        : 'Complete registration'}
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};
