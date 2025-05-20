import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { cn } from '@/shared/lib/utils';
import { AuthUser } from '@/shared/types';

type ProfileAvatarProps = {
   profile: AuthUser;
   className?: string;
};

export default function ProfileAvatar({
   profile,
   className,
}: ProfileAvatarProps) {
   return (
      <Avatar className={cn('h-16 w-16', className)}>
         <AvatarImage src={profile.image} alt={profile.name} />
         <AvatarFallback className={className}>
            {profile.name
               .split(' ')
               .map((n: string) => n[0].toUpperCase())
               .join('')}
         </AvatarFallback>
      </Avatar>
   );
}
