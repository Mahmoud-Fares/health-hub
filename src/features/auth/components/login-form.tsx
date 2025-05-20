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
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { PasswordField } from '@/shared/components/ui/password-field';

import { useLogin } from '@/features/auth/api/auth-hooks';
import { loginSchema } from '@/features/auth/schema';
import { LoginPayload } from '@/features/auth/types';

export default function LoginForm() {
   const { mutate: login, isPending } = useLogin();

   const form = useForm<LoginPayload>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: 'patient@email.com',
         password: 'password',
      },
   });

   return (
      <Card className='mx-auto w-full max-w-md animate-fade-in'>
         <CardHeader>
            <CardTitle className='text-2xl font-bold'>Login</CardTitle>
            <CardDescription>
               Enter your credentials to access your account
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit((values) => login(values))}
                  className='space-y-6'
               >
                  <FormField
                     control={form.control}
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

                  <PasswordField
                     control={form.control}
                     name='password'
                     label='Password'
                     showPasswordLabel
                  />

                  <Button type='submit' className='w-full' disabled={isPending}>
                     {isPending ? 'Logging in...' : 'Login'}
                  </Button>
               </form>
            </Form>
         </CardContent>
         <CardFooter className='flex justify-center'>
            <p className='text-center text-sm text-muted-foreground'>
               Don't have an account?{' '}
               <Link
                  to='/signup'
                  className='text-primary transition-colors hover:underline'
               >
                  Register here
               </Link>
            </p>
         </CardFooter>
      </Card>
   );
}
