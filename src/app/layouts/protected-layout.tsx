import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import MainLayout from '@/app/layouts/main-layout';

export default function ProtectedLayout() {
   const { isAuthenticated } = useAuth();

   if (!isAuthenticated) return <Navigate to='/login' replace />;

   return (
      <MainLayout>
         <Outlet />
      </MainLayout>
   );
}
