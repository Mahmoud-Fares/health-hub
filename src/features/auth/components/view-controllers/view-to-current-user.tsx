import { AuthUser } from '@/shared/types';

import { useAuth } from '@/features/auth';

type ViewToCurrentUserProps = {
   profile: AuthUser;
   children: React.ReactNode;
};

export function ViewToCurrentUser({
   profile,
   children,
}: ViewToCurrentUserProps) {
   const { currentUser } = useAuth();
   const isCurrentUserProfile = profile.slug === currentUser?.slug;

   return isCurrentUserProfile && children;
}
