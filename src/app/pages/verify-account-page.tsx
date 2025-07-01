import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';

import { useSendEmailVerification } from '@/features/auth/api/auth-hooks';
import { VerifyAccountForm } from '@/features/auth/components/verify-account-form';
import { useAuth } from '@/features/auth/hooks/use-auth';

export default function VerifyAccountPage() {
   const [step, setStep] = useState<'prompt' | 'verify'>('prompt');

   if (step === 'prompt') return <VerifyAccountPrompt setStep={setStep} />;

   return <VerifyAccountForm />;
}

const VerifyAccountPrompt = ({
   setStep,
}: {
   setStep: (step: 'prompt' | 'verify') => void;
}) => {
   const { currentUser } = useAuth();

   const {
      mutate: sendEmailVerification,
      isPending,
      isError,
   } = useSendEmailVerification();

   const handleContinue = () => {
      if (!currentUser?.email) return;
      sendEmailVerification(currentUser.email, {
         onSuccess: () => setStep('verify'),
      });
   };

   return (
      <div className='flex min-h-screen animate-fade-in flex-col items-center justify-center'>
         <div className='w-full max-w-md space-y-8'>
            <h2 className='text-center text-2xl font-bold'>
               Verify Your Account
            </h2>
            <div className='text-center'>
               <p className='mb-2'>Your email:</p>
               <div className='mb-4 font-mono text-lg font-semibold'>
                  {currentUser?.email}
               </div>
               <p className='mb-6'>Are you ready to activate your account?</p>
               <div className='flex justify-center gap-4'>
                  <Button
                     type='button'
                     variant='outline'
                     onClick={() => window.history.back()}
                  >
                     Not now
                  </Button>
                  <Button
                     type='button'
                     onClick={handleContinue}
                     disabled={isPending}
                  >
                     {isPending ? 'Sending...' : 'Continue'}
                  </Button>
               </div>
               {isError && (
                  <div className='mt-4 text-center text-red-600'>
                     Failed to send verification email. Please try again.
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
