import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

interface MobileNavProps {
   isAuthenticated: boolean;
   onClose: () => void;
}

export const MobileNav = ({ isAuthenticated, onClose }: MobileNavProps) => {
   return (
      <nav className='flex flex-col space-y-3'>
         <Link
            to='/'
            className='text-sm font-medium text-foreground/60 transition-colors hover:text-foreground'
            onClick={onClose}
         >
            Home
         </Link>
         <Link
            to='/find-doctors'
            className='text-sm font-medium text-foreground/60 transition-colors hover:text-foreground'
            onClick={onClose}
         >
            Find Doctors
         </Link>
         {isAuthenticated && (
            <Link
               to='/my-appointments'
               className='text-sm font-medium text-foreground/60 transition-colors hover:text-foreground'
               onClick={onClose}
            >
               My Appointments
            </Link>
         )}
         {!isAuthenticated && (
            <div className='flex flex-col space-y-2 border-t pt-2'>
               <Link to='/login' onClick={onClose}>
                  <Button variant='outline' className='w-full justify-start'>
                     Sign In
                  </Button>
               </Link>
               <Link to='/register' onClick={onClose}>
                  <Button className='w-full justify-start'>Sign Up</Button>
               </Link>
            </div>
         )}
      </nav>
   );
};

export const MobileNavToggle = ({
   isMenuOpen,
   toggleMenu,
}: {
   isMenuOpen: boolean;
   toggleMenu: () => void;
}) => {
   return (
      <Button
         variant='ghost'
         size='icon'
         className='md:hidden'
         onClick={toggleMenu}
      >
         {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
         <span className='sr-only'>Toggle menu</span>
      </Button>
   );
};
