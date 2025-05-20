import { ReactNode } from 'react';

import { useAuth } from '@/features/auth';

type SignedInProps = {
   children: ReactNode;
};

export function SignedIn({ children }: SignedInProps) {
   const { currentUser } = useAuth();

   return currentUser && <>{children}</>;
}
