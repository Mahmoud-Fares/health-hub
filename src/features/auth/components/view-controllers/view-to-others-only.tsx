import { AuthUser } from '@/shared/types';

import { useAuth } from '@/features/auth';

type ViewToOthersOnlyProps = {
   profile: AuthUser;
   children: React.ReactNode;
};

export function ViewToOthersOnly({ profile, children }: ViewToOthersOnlyProps) {
   const { currentUser } = useAuth();
   const isCurrentUserProfile = profile.slug === currentUser?.slug;

   return !isCurrentUserProfile && children;
}
