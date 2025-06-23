import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import MainLayout from '@/app/layouts/main-layout';

type Props = {
   withSidebar?: boolean;
};

export default function ProtectedLayout({ withSidebar }: Props) {
   const { isAuthenticated } = useAuth();

   if (!isAuthenticated) return <Navigate to='/login' replace />;

   return (
      <MainLayout withSidebar={withSidebar}>
         <Outlet />
      </MainLayout>
   );
}
