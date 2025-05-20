import { Control } from 'react-hook-form';

import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';

import { RegisterPayload } from '@/features/auth/types';

type PersonalInfoFieldsProps = {
   control: Control<RegisterPayload>;
};

export const PersonalInfoFields = ({ control }: PersonalInfoFieldsProps) => {
   return (
      <>
         <FormField
            control={control}
            name='name'
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                     <Input
                        placeholder='John Doe'
                        {...field}
                        autoComplete='name'
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={control}
            name='email'
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                     <Input
                        placeholder='john.doe@example.com'
                        {...field}
                        type='email'
                        autoComplete='email'
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={control}
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

         <FormField
            control={control}
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
                        <FormItem className='flex items-center space-x-2'>
                           <FormControl>
                              <RadioGroupItem value='male' />
                           </FormControl>
                           <FormLabel className='font-normal'>Male</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-2'>
                           <FormControl>
                              <RadioGroupItem value='female' />
                           </FormControl>
                           <FormLabel className='font-normal'>Female</FormLabel>
                        </FormItem>
                     </RadioGroup>
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />
      </>
   );
};
