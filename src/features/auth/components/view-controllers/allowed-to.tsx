import { ReactNode } from 'react';

import { AccessDenied } from '@/shared/components';
import { AuthUser } from '@/shared/types';

import { useAuth } from '@/features/auth';

type Props = {
   allowedRoles: AuthUser['role'][];
   children: ReactNode;
   fallback?: ReactNode;
};

export const AllowedTo = ({
   allowedRoles,
   children,
   fallback = null,
}: Props) => {
   const { currentUser } = useAuth();

   if (!currentUser) return fallback ?? <AccessDenied />;

   const hasPermission = allowedRoles.includes(currentUser.role);

   return hasPermission ? <>{children}</> : <>{fallback ?? <AccessDenied />}</>;
};
