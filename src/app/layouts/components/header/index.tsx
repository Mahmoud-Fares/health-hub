import { useState } from 'react';

import { Link } from 'react-router-dom';

import { ThemeToggler } from '@/shared/components/theme-toggler';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

import { useAuth } from '@/features/auth';

import { MobileNav, MobileNavToggle } from './mobile-nav';
import { UserNav } from './user-nav';

const Header = () => {
   const { isAuthenticated } = useAuth();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
         <div className='container flex h-16 items-center justify-between'>
            <div className='flex items-center gap-6 md:gap-10'>
               <Link to='/' className='flex items-center space-x-2'>
                  <span className='gradient-text hidden text-2xl font-bold sm:inline-block'>
                     MediCare
                  </span>
                  <span className='gradient-text inline-block text-2xl font-bold sm:hidden'>
                     MC
                  </span>
               </Link>

               <nav className='hidden gap-6 md:flex'>
                  <Link
                     to='/'
                     className='text-sm font-medium text-foreground/60 transition-colors hover:text-foreground'
                  >
                     Home
                  </Link>
                  <Link
                     to='/find-doctors'
                     className='text-sm font-medium text-foreground/60 transition-colors hover:text-foreground'
                  >
                     Find Doctors
                  </Link>
                  {isAuthenticated && (
                     <Link
                        to='/my-appointments'
                        className='text-sm font-medium text-foreground/60 transition-colors hover:text-foreground'
                     >
                        My Appointments
                     </Link>
                  )}
               </nav>
            </div>

            <div className='flex items-center gap-2'>
               <ThemeToggler />

               {isAuthenticated ? (
                  <UserNav />
               ) : (
                  <div className='hidden items-center gap-2 md:flex'>
                     <Link to='/login'>
                        <Button
                           variant='ghost'
                           size='sm'
                           className='transition-colors'
                        >
                           Sign In
                        </Button>
                     </Link>
                     <Link to='/signup'>
                        <Button size='sm' className='animate-scale-in'>
                           Sign Up
                        </Button>
                     </Link>
                  </div>
               )}

               <MobileNavToggle
                  isMenuOpen={isMenuOpen}
                  toggleMenu={toggleMenu}
               />
            </div>
         </div>

         {/* Mobile Menu */}
         <div
            className={cn(
               'container overflow-hidden pb-4 transition-all duration-300 ease-in-out md:hidden',
               isMenuOpen ? 'max-h-56 animate-fade-in' : 'max-h-0'
            )}
         >
            <MobileNav
               isAuthenticated={isAuthenticated}
               onClose={() => setIsMenuOpen(false)}
            />
         </div>
      </header>
   );
};

export default Header;
