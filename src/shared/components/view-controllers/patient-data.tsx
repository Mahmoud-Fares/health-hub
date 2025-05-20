import { ReactNode } from 'react';

import { AuthUser } from '@/shared/types';

type PatientDataProps = {
   user: AuthUser;
   children: ReactNode;
};

export function PatientData({ user, children }: PatientDataProps) {
   return user.role === 'client' && <>{children}</>;
}
