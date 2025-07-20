import { Navigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { CompleteRegisterForm } from '@/features/auth/components/complete-register-form';
import { useGoogleCallback } from '@/features/auth/hooks/use-google-callback';

export default function CompleteRegisterPage() {
   const { token, slug } = useGoogleCallback();

   const { currentUser } = useAuth();
   const shouldRedirect = currentUser && currentUser.role !== 'deactivated';

   if (shouldRedirect) return <Navigate to='/' />;

   return (
      <div className='flex min-h-screen animate-fade-in flex-col items-center justify-center'>
         <CompleteRegisterForm token={token || ''} slug={slug || ''} />
      </div>
   );
}
