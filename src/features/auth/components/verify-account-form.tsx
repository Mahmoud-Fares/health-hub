import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from '@/shared/components/ui/input-otp';
import { getErrorMessage } from '@/shared/lib/utils';

import {
   useSendEmailVerification,
   useVerifyEmailOtp,
} from '@/features/auth/api/auth-hooks';
import { useAuth } from '@/features/auth/hooks/use-auth';

const FormSchema = z.object({
   otp: z.string().min(6, 'OTP must be 6 digits'),
});

export function VerifyAccountForm() {
   const { currentUser } = useAuth();

   const {
      mutate: verifyOtp,
      isPending,
      isSuccess,
      isError,
      error,
   } = useVerifyEmailOtp();

   const {
      mutate: resendOtp,
      isPending: isResending,
      isError: isResendError,
      isSuccess: isResendSuccess,
      error: resendError,
   } = useSendEmailVerification();

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: { otp: '' },
   });

   if (!currentUser) return <div>User not found</div>;

   function onSubmit(values: z.infer<typeof FormSchema>) {
      if (!currentUser) throw new Error('User not found');
      verifyOtp({ email: currentUser.email, otp: values.otp });
   }

   return (
      <div className='flex min-h-screen animate-fade-in flex-col items-center justify-center'>
         <div className='w-full max-w-md space-y-8'>
            <h2 className='text-center text-2xl font-bold'>
               Verify Your Account
            </h2>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
               >
                  <FormField
                     control={form.control}
                     name='otp'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>One-Time Password</FormLabel>
                           <FormControl autoFocus>
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
                           <FormDescription>
                              Enter the 6-digit code sent to your email.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className='flex flex-col gap-2'>
                     <Button
                        type='submit'
                        className='w-full'
                        disabled={isPending}
                     >
                        {isPending ? 'Verifying...' : 'Verify'}
                     </Button>
                     <Button
                        type='button'
                        variant='outline'
                        className='w-full'
                        onClick={() => resendOtp(currentUser.email)}
                        disabled={isResending}
                     >
                        {isResending ? 'Resending...' : 'Resend OTP'}
                     </Button>
                  </div>
                  {isSuccess && (
                     <div className='text-center text-green-600'>
                        Account verified successfully!
                     </div>
                  )}
                  {isError && (
                     <div className='text-center text-red-600'>
                        {getErrorMessage(error)}
                     </div>
                  )}
                  <div className='flex flex-col items-center'>
                     {isResendSuccess && (
                        <div className='mt-2 text-sm text-green-600'>
                           OTP resent successfully!
                        </div>
                     )}
                     {isResendError && (
                        <div className='mt-2 text-sm text-red-600'>
                           {getErrorMessage(resendError)}
                        </div>
                     )}
                  </div>
               </form>
            </Form>
         </div>
      </div>
   );
}
