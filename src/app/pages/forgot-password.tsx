import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from '@/shared/components/ui/input-otp';
import { PasswordField } from '@/shared/components/ui/password-field';
import { passwordValidation } from '@/shared/schema';

import {
   useSendPasswordResetOtp,
   useVerifyPasswordResetOtp,
} from '@/features/auth/api/auth-hooks';

const emailSchema = z.object({
   email: z.string().email('Enter a valid email'),
});

const resetSchema = z.object({
   otp: z.string().min(6, 'OTP must be 6 digits'),
   password: passwordValidation,
   password_confirmation: passwordValidation,
});

function EmailForm({
   onEmailSubmitted,
}: {
   onEmailSubmitted: (email: string) => void;
}) {
   const form = useForm<z.infer<typeof emailSchema>>({
      resolver: zodResolver(emailSchema),
      defaultValues: { email: '' },
   });

   const sendOtpMutation = useSendPasswordResetOtp();

   function handleSubmit(values: z.infer<typeof emailSchema>) {
      sendOtpMutation.mutate(values.email, {
         onSuccess: () => {
            onEmailSubmitted(values.email);
         },
      });
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <FormField
               control={form.control}
               name='email'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                           type='email'
                           placeholder='Enter your email'
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button
               type='submit'
               className='w-full'
               disabled={sendOtpMutation.isPending}
            >
               {sendOtpMutation.isPending ? 'Sending...' : 'Next'}
            </Button>
         </form>
      </Form>
   );
}

function ResetPasswordForm({ email }: { email: string }) {
   const form = useForm<z.infer<typeof resetSchema>>({
      resolver: zodResolver(
         resetSchema.refine(
            (data) => data.password === data.password_confirmation,
            {
               message: 'Passwords do not match',
               path: ['password_confirmation'],
            }
         )
      ),
      defaultValues: { otp: '', password: '', password_confirmation: '' },
   });

   const verifyOtpMutation = useVerifyPasswordResetOtp();

   function handleSubmit(values: z.infer<typeof resetSchema>) {
      verifyOtpMutation.mutate(
         {
            email,
            otp: values.otp,
            password: values.password,
            password_confirmation: values.password_confirmation,
         },
         {
            onSuccess: () => {
               form.reset();
            },
         }
      );
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <div className='mb-2 text-center text-sm text-muted-foreground'>
               Resetting password for{' '}
               <span className='font-medium'>{email}</span>
            </div>
            <FormField
               control={form.control}
               name='otp'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>OTP</FormLabel>
                     <FormControl>
                        <InputOTP maxLength={6} {...field}>
                           <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                           </InputOTPGroup>
                        </InputOTP>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <PasswordField
               control={form.control}
               name='password'
               label='New Password'
               showPasswordLabel
            />
            <PasswordField
               control={form.control}
               name='password_confirmation'
               label='Confirm New Password'
               showPasswordLabel
            />
            <Button
               type='submit'
               className='w-full'
               disabled={verifyOtpMutation.isPending}
            >
               {verifyOtpMutation.isPending ? 'Resetting...' : 'Reset Password'}
            </Button>
         </form>
      </Form>
   );
}

export default function ForgotPasswordPage() {
   const [email, setEmail] = useState<string | null>(null);

   return (
      <Card className='w-full max-w-md animate-fade-in space-y-6 p-6'>
         <h2 className='text-center text-2xl font-bold'>Forgot Password</h2>
         {!email ? (
            <EmailForm onEmailSubmitted={setEmail} />
         ) : (
            <ResetPasswordForm email={email} />
         )}
      </Card>
   );
}
