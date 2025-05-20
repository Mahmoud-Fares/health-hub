import { ReactNode } from 'react';

import { useAuth } from '@/features/auth';

type SignedOutProps = {
   children: ReactNode;
};

export function SignedOut({ children }: SignedOutProps) {
   const { currentUser } = useAuth();

   return !currentUser && <>{children}</>;
}
