import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

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
import { RegisterPayload } from '@/features/auth/api/auth-service';

import { PersonalInfoFields } from './personal-info-fields';
import { RoleSelection } from './role-selection';

export const registerSchema = z
   .object({
      name: z
         .string()
         .min(2, { message: 'Name must be at least 2 characters' }),
      email: z
         .string()
         .email({ message: 'Please enter a valid email address' }),
      password: z
         .string()
         .min(6, { message: 'Password must be at least 6 characters' }),
      password_confirmation: z.string(),
      role: z.enum(['client', 'doctor'], { message: 'Please select a role' }),
      phone: z.string().min(6, { message: 'Phone number is required' }),
      gender: z.enum(['male', 'female'], { message: 'Please select a gender' }),
   })
   .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords don't match",
      path: ['password_confirmation'],
   });

export type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
   const { mutate: register, isPending } = useRegister();

   const form = useForm<RegisterFormValues>({
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

   const onSubmit = (values: RegisterFormValues) => {
      // Explicitly cast the form values to RegisterPayload to ensure type safety
      const registerData: RegisterPayload = {
         name: values.name,
         email: values.email,
         password: values.password,
         password_confirmation: values.password_confirmation,
         role: values.role,
         phone: values.phone,
         gender: values.gender,
      };

      register(registerData, {
         onError: (error) => {
            toast.error('Login failed', {
               description:
                  error.message ||
                  'Please check your information and try again',
            });
         },
      });
   };

   return (
      <Card className='mx-auto w-full max-w-md animate-fade-in'>
         <CardHeader>
            <CardTitle className='text-2xl font-bold'>Register</CardTitle>
            <CardDescription>Create an account to get started</CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
               >
                  <PersonalInfoFields control={form.control} />

                  <RoleSelection control={form.control} />

                  <PasswordField
                     control={form.control}
                     name='password'
                     label='Password'
                  />

                  <PasswordField
                     control={form.control}
                     name='password_confirmation'
                     label='Confirm Password'
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
