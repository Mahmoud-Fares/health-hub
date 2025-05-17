import { LogOut, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
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

   const userInitials = currentUser?.name
      ? currentUser.name
           .split(' ')
           .map((n: string) => n[0])
           .join('')
           .toUpperCase()
           .substring(0, 2)
      : 'U';

   const handleLogout = () => {
      logout();
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
               <Avatar className='h-8 w-8'>
                  <AvatarImage
                     src={currentUser?.image}
                     alt={currentUser?.name || 'User'}
                  />
                  <AvatarFallback>{userInitials}</AvatarFallback>
               </Avatar>
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
            <DropdownMenuGroup>
               {currentUser?.role === 'doctor' && currentUser?.slug && (
                  <DropdownMenuItem asChild>
                     <Link
                        to={`/doctor/${currentUser.slug}`}
                        className='w-full cursor-pointer'
                     >
                        <User className='mr-2 h-4 w-4' />
                        <span>My Profile</span>
                     </Link>
                  </DropdownMenuItem>
               )}

               {currentUser?.role === 'client' && currentUser?.slug && (
                  <DropdownMenuItem asChild>
                     <Link
                        to={`/client/${currentUser.slug}`}
                        className='w-full cursor-pointer'
                     >
                        <User className='mr-2 h-4 w-4' />
                        <span>My Profile</span>
                     </Link>
                  </DropdownMenuItem>
               )}

               <DropdownMenuItem asChild>
                  <Link to='/settings' className='w-full cursor-pointer'>
                     <Settings className='mr-2 h-4 w-4' />
                     <span>Settings</span>
                  </Link>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
               <LogOut className='mr-2 h-4 w-4' />
               <span>Log out</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
