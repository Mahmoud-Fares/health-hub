import React from 'react';

import { LogOut, LucideProps, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ProfileAvatar from '@/shared/components/profile-avatar';
import { Button } from '@/shared/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { useAuth } from '@/features/auth';
import { useLogout } from '@/features/auth/api/auth-hooks';

export function UserNav() {
   const { currentUser } = useAuth();
   const { mutate: logout } = useLogout();
   const navigate = useNavigate();

   if (!currentUser) return null;

   const profileLink = `/${currentUser?.role === 'client' ? 'client' : 'doctor'}/${currentUser.slug}`;

   const USER_MENU_ITEMS = [
      [
         {
            label: 'Profile',
            icon: User,
            action: () => navigate(profileLink),
         },
         {
            label: 'Settings',
            icon: Settings,
            action: () => navigate('/settings'),
         },
      ],
      [
         {
            label: 'Log out',
            icon: LogOut,
            action: logout,
         },
      ],
   ];

   return (
      <DropdownMenu modal={false}>
         <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative size-9 rounded-full'>
               <ProfileAvatar profile={currentUser} className='size-9' />
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
               <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                     {currentUser?.name}
                  </p>
                  <p className='text-xs leading-none text-muted-foreground'>
                     {currentUser?.email}
                  </p>
               </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {USER_MENU_ITEMS.map((group, index) => (
               <React.Fragment key={`group-${index}`}>
                  <MenuGroup items={group} />

                  {index < USER_MENU_ITEMS.length - 1 && (
                     <DropdownMenuSeparator />
                  )}
               </React.Fragment>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

type MenuItem = {
   label: string;
   action: () => void;
   icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
   >;
};

const MenuGroup = ({ items }: { items: MenuItem[] }) => {
   return (
      <DropdownMenuGroup>
         {items.map((item) => (
            <DropdownMenuItem
               key={item.label}
               onClick={item.action}
               className='cursor-pointer'
            >
               <item.icon
                  size={16}
                  strokeWidth={2}
                  className='opacity-60'
                  aria-hidden='true'
               />
               <span>{item.label}</span>
            </DropdownMenuItem>
         ))}
      </DropdownMenuGroup>
   );
};
