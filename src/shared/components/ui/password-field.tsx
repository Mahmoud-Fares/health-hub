import React from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

interface PasswordFieldProps<
   TFieldValues extends FieldValues,
   TFieldName extends FieldPath<TFieldValues>,
> {
   control: Control<TFieldValues>;
   name: TFieldName;
   label: string;
   placeholder?: string;
   showPasswordLabel?: boolean;
   isLoginForm?: boolean;
}

export const PasswordField = <
   TFieldValues extends FieldValues,
   TFieldName extends FieldPath<TFieldValues>,
>({
   control,
   name,
   label,
   placeholder = '••••••••',
   showPasswordLabel = false,
   isLoginForm = false,
}: PasswordFieldProps<TFieldValues, TFieldName>) => {
   const [showPassword, setShowPassword] = React.useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem>
               {isLoginForm && (
                  <div className='flex items-center justify-between'>
                     <FormLabel htmlFor='password'>{label}</FormLabel>
                     <Link
                        to='/forgot-password'
                        className='ml-auto inline-block text-sm underline'
                     >
                        Forgot your password?
                     </Link>
                  </div>
               )}

               {showPasswordLabel && !isLoginForm && (
                  <FormLabel>{label}</FormLabel>
               )}
               <FormControl>
                  <div className='relative'>
                     <Input
                        placeholder={placeholder}
                        type={showPassword ? 'text' : 'password'}
                        className='pr-10'
                        {...field}
                     />
                     <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 transition-opacity hover:bg-transparent focus:ring-0'
                        onClick={togglePasswordVisibility}
                        aria-label={
                           showPassword ? 'Hide password' : 'Show password'
                        }
                     >
                        {showPassword ? (
                           <EyeOff size={16} />
                        ) : (
                           <Eye size={16} />
                        )}
                     </Button>
                  </div>
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   );
};
