import { Outlet } from 'react-router-dom';

import { AuthProvider } from '@/features/store/context/auth-context';

export default function StoreProvider() {
   return (
      <AuthProvider>
         <Outlet />
      </AuthProvider>
   );
}
