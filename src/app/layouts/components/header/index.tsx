import { Link } from 'react-router-dom';

import { ThemeToggler } from '@/shared/components/theme-toggler';
import { Button } from '@/shared/components/ui/button';

import { SignedIn, SignedOut } from '@/features/auth';

import { NavLink } from './nav-link';
import { navigationLinks } from './navigation-links';
import { UserNav } from './user-nav';

const Header = () => {
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
                  {navigationLinks.map((link) =>
                     link.showAlways ? (
                        <NavLink
                           key={link.to}
                           to={link.to}
                           label={link.label}
                        />
                     ) : (
                        <SignedIn key={link.to}>
                           <NavLink to={link.to} label={link.label} />
                        </SignedIn>
                     )
                  )}
               </nav>
            </div>

            <div className='flex items-center gap-2'>
               <ThemeToggler />

               <SignedIn>
                  <UserNav />
               </SignedIn>

               <SignedOut>
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
               </SignedOut>
            </div>
         </div>
      </header>
   );
};

export default Header;
