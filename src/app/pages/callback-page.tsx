import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Spinner from '@/shared/components/spinner';
import { AuthUser } from '@/shared/types';

import { useGetCurrentUser } from '@/features/auth/api/auth-hooks';

export default function CallbackPage() {
   const { mutate: getCurrentUser } = useGetCurrentUser();
   const navigate = useNavigate();

   const params = new URLSearchParams(window.location.search);

   const token = params.get('token');
   const slug = params.get('slug');
   const role = params.get('role');

   useEffect(() => {
      if (!token || !slug || !role) {
         toast.error('Invalid Authentication, please try again');
         navigate('/login');
         return;
      }

      if (role === 'deactivated') {
         navigate(`/complete/register?token=${token}&slug=${slug}`);
         return;
      }

      const args = { role, slug, token } as {
         role: AuthUser['role'];

         slug: string;
         token: string;
      };

      getCurrentUser(args);
   }, [getCurrentUser, navigate, token, slug, role]);

   return (
      <section className='flex min-h-[80vh] flex-1 items-center justify-center'>
         <div className='gradient-text flex animate-pulse items-center gap-2 text-3xl font-extrabold'>
            <h2>Authenticating</h2>
            <Spinner className='size-6' />
         </div>
      </section>
   );
}
