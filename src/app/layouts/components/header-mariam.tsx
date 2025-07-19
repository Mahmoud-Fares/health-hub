import { useEffect, useState } from 'react';

import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { SignedIn, SignedOut } from '@/features/auth';
import { CartIcon } from '@/features/store/components/cart-icon';

import { UserNav } from './header/user-nav';

const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);
   const location = useLocation();

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   useEffect(() => {
      setIsMenuOpen(false);
   }, [location]);

   return (
      <header
         className={`sticky top-0 z-50 w-full animate-fade-in transition-all duration-300 ${
            isScrolled ? 'shadow-md' : 'bg-transparent'
         }`}
      >
         <div className='flex w-full items-center justify-between bg-white px-8'>
            <Logo />

            {/* Buttons on the right */}
            <div className='flex items-center gap-3'>
               <SignedIn>
                  <CartIcon />

                  <UserNav />
               </SignedIn>

               <SignedOut>
                  <div className='hidden items-center gap-2 lg:flex'>
                     <Link to='/login'>
                        <Button
                           variant='ghost'
                           size='sm'
                           className='transition-colors bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium px-5 py-2 rounded-full transition duration-300'
                        >
                           Sign In
                        </Button>
                     </Link>
                     <Link to='/signup'>
                        <Button size='sm' className='animate-scale-in bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-full'>
                           Sign Up
                        </Button>
                     </Link>
                     <Link to="/contact">
                        <span className="bg-teal-500 hover:bg-teal-700 text-white text-sm font-medium px-5 py-2 rounded-full transition duration-300">
                        Contact Us
                        </span>
                     </Link>
                  </div>
               </SignedOut>
            </div>
         </div>

         {/*       
----------------------------------------------- */}

         <div className='w-full bg-blue-500 p-3 px-4'>
            <div className='flex items-center justify-between'>
               {/* Desktop Navigation */}
               <nav className='hidden flex-1 justify-center gap-4 lg:flex lg:gap-8'>
                  <NavLink
                     to='/'
                     label='Home'
                     active={location.pathname === '/'}
                  />
                  <NavLink
                     to='/articles'
                     label='Articles'
                     active={location.pathname.includes('/articles')}
                  />
                  <NavLink
                     to='/workout-videos'
                     label='Workout Videos'
                     active={location.pathname === '/workout-videos'}
                  />
                  <NavLink
                     to='/services'
                     label='Services'
                     active={location.pathname === '/services'}
                  />
                  <NavLink
                     to='/about'
                     label='About'
                     active={location.pathname === '/about'}
                  />
                  <NavLink
                     to='/food-scanner'
                     label='Food Scanner'
                     active={location.pathname === '/food-scanner'}
                  />
                  <NavLink
                     to='/calculators'
                     label='Calculators'
                     active={location.pathname === '/calculators'}
                  />
                  <NavLink
                     to='/store'
                     label='Store'
                     active={location.pathname === '/store'}
                  />
               </nav>

               <div className='hidden lg:block'>
                  <Link
                     to='/find-doctors'
                     className='inline-flex transform rounded-full bg-blue-900 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700'
                  >
                     Book Appointment
                  </Link>
               </div>

               {/* Mobile Menu Button */}
               <button
                  className='ml-auto text-gray-800 lg:hidden'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
               >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
         </div>

         {/* Mobile Menu */}
         {isMenuOpen && (
            <div className='absolute left-0 top-full w-full animate-fade-in bg-white shadow-lg lg:hidden'>
               <div className='container mx-auto px-4 py-4'>
                  <div className='flex flex-col space-y-4'>
                     <MobileNavLink to='/' label='Home' />
                     <MobileNavLink to='/articles' label='Articles' />
                     <MobileNavLink
                        to='/workout-videos'
                        label='Workout Videos'
                     />
                     <MobileNavLink to='/services' label='Services' />
                     <MobileNavLink to='/about' label='About' />
                     <MobileNavLink to='/food-scanner' label='Food Scanner' />
                     <MobileNavLink to='/calculators' label='Calculators' />
                     <MobileNavLink to='/store' label='shop' />
                     <Link
                        to='/find-doctors'
                        className='rounded-full bg-white px-6 py-2 text-center text-black hover:bg-blue-700'
                     >
                        Book Appointment
                     </Link>
                  </div>
               </div>
            </div>
         )}
      </header>
   );
};

const NavLink = ({
   to,
   label,
   active,
}: {
   to: string;
   label: string;
   active: boolean;
}) => (
   <Link
      to={to}
      className={`relative font-medium transition-colors duration-300 ${
         active ? 'font-black text-gray-700' : 'text-white hover:text-blue-800'
      }`}
   >
      {label}
      {active && (
         <span className='absolute bottom-[-4px] left-0 h-[2px] w-full rounded-full bg-blue-800' />
      )}
   </Link>
);

const MobileNavLink = ({ to, label }: { to: string; label: string }) => (
   <Link
      to={to}
      className='py-2 font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600'
   >
      {label}
   </Link>
);

const Logo = () => (
   <>
      <Link to='/' className='hidden flex-shrink-0 items-center py-2 md:flex'>
         <img
            src='/images/health hub removed TRY.png'
            alt='Logo'
            className='object-fill'
         />
      </Link>

      <Link to='/' className='flex flex-shrink-0 items-center py-2 md:hidden'>
         <img
            src='/images/health hub removed TRY.png' //ظبطي دا
            alt='Logo'
            className='max-w-10 object-fill'
         />
      </Link>
   </>
);

export default Header;
