'use no memo';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Form } from '@/shared/components/ui/form';
import { PasswordField } from '@/shared/components/ui/password-field';

import { useRegister } from '@/features/auth/api/auth-hooks';
import { registerSchema } from '@/features/auth/schema';
import { RegisterPayload } from '@/features/auth/types';

import { PersonalInfoFields } from './personal-info-fields';
import { RoleSelection } from './role-selection';

const RegisterForm: React.FC = () => {
   const { mutate: register, isPending } = useRegister();

   const form = useForm<RegisterPayload>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         name: '',
         email: '',
         password: '',
         password_confirmation: '',
         role: 'client',
         phone: '',
         gender: 'male',
      },
   });

   return (
      <Card className='mx-auto w-full max-w-md animate-fade-in'>
         <CardHeader>
            <CardTitle className='text-2xl font-bold'>Register</CardTitle>
            <CardDescription>Create an account to get started</CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit((values) => register(values))}
                  className='space-y-4'
               >
                  <PersonalInfoFields control={form.control} />

                  <RoleSelection control={form.control} />

                  <PasswordField
                     control={form.control}
                     name='password'
                     label='Password'
                     showPasswordLabel
                  />

                  <PasswordField
                     control={form.control}
                     name='password_confirmation'
                     label='Confirm Password'
                     showPasswordLabel
                  />

                  <Button
                     type='submit'
                     className='mt-6 w-full'
                     disabled={isPending}
                  >
                     {isPending ? 'Creating account...' : 'Register'}
                  </Button>
               </form>
            </Form>
         </CardContent>

         <CardFooter className='flex justify-center'>
            <p className='text-center text-sm text-muted-foreground'>
               Already have an account?{' '}
               <Link
                  to='/login'
                  className='text-primary transition-colors hover:underline'
               >
                  Login here
               </Link>
            </p>
         </CardFooter>
      </Card>
   );
};

export default RegisterForm;
