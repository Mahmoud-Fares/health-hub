import { ReactNode } from 'react';

import { AuthUser } from '@/shared/types';

type DoctorDataProps = {
   user: AuthUser;
   children: ReactNode;
};

export function DoctorData({ user, children }: DoctorDataProps) {
   return user.role === 'doctor' && <>{children}</>;
}
