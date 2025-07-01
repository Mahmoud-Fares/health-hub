import { CompleteRegisterForm } from '@/features/auth/components/complete-register-form';

export default function CompleteRegisterPage() {
   const searchParams = new URLSearchParams(window.location.search);
   const token = searchParams.get('token') || '';
   const slug = searchParams.get('slug') || '';

   return (
      <div className='flex min-h-screen animate-fade-in flex-col items-center justify-center'>
         <CompleteRegisterForm token={token} slug={slug} />
      </div>
   );
}
