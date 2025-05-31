import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { SignedIn, SignedOut } from '@/features/auth';

import { NavLink } from './nav-link';
import { navigationLinks } from './navigation-links';

interface MobileNavProps {
   onClose: () => void;
}

export const MobileNav = ({ onClose }: MobileNavProps) => {
   return (
      <nav className='flex flex-col space-y-3'>
         {navigationLinks.map((link) =>
            link.showAlways ? (
               <NavLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  onClick={onClose}
               />
            ) : (
               <SignedIn key={link.to}>
                  <NavLink to={link.to} label={link.label} onClick={onClose} />
               </SignedIn>
            )
         )}

         <SignedOut>
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
         </SignedOut>
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
