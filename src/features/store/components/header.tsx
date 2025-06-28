import { useContext, useState } from 'react';

import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { Input } from '@/features/store/components/ui/input';
import { AuthContext } from '@/features/store/context/auth-context';

const Header = ({ onSearch }: { onSearch?: (query: string) => void }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const context = useContext(AuthContext);
   if (!context) throw new Error('AuthContext not found');
   const { dataCarts, setDataCarts, setCartMeta, isLoggedIn, setIsLoggedIn } =
      context;

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSearch) {
         onSearch(searchQuery);
      }
   };

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const handleLogout = () => {
      window.localStorage.clear();
      setIsLoggedIn(false);
      setDataCarts([]);
      setCartMeta({ total_items: 0, total_price: 0 });
   };

   return (
      <header className='sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm'>
         <div className='container mx-auto px-4'>
            <div className='flex items-center justify-between py-4'>
               {/* Logo */}
               <Link
                  to='/'
                  className='flex items-center text-2xl font-bold text-brand-blue'
               >
                  <span className='text-xl font-bold text-primary'>
                     HealthUp Store
                  </span>
               </Link>

               {/* Desktop Navigation */}
               <nav className='hidden items-center space-x-8 md:flex'>
                  <Link to='/' className='text-gray-700 hover:text-brand-blue'>
                     Home
                  </Link>
                  <Link
                     to='/store/products'
                     className='text-gray-700 hover:text-brand-blue'
                  >
                     Products
                  </Link>
               </nav>

               {/* Search (Desktop) */}
               {onSearch && (
                  <form
                     onSubmit={handleSearch}
                     className='hidden items-center overflow-hidden rounded-full border bg-gray-50 md:flex'
                  >
                     <Input
                        type='text'
                        placeholder='Search products...'
                        className='border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                     />
                     <Button
                        type='submit'
                        variant='ghost'
                        size='icon'
                        className='text-gray-500'
                     >
                        <Search size={20} />
                     </Button>
                  </form>
               )}

               {/* Cart & Mobile Menu Toggle */}
               <div className='flex items-center space-x-4'>
                  <Link to='/store/cart' className='relative'>
                     <ShoppingCart className='h-6 w-6 text-gray-700' />
                     {dataCarts.length > 0 && (
                        <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-xs text-white'>
                           {dataCarts.length}
                        </span>
                     )}
                  </Link>

                  <div className='flex items-center justify-center space-x-2'>
                     {isLoggedIn ? (
                        <button
                           className='rounded-lg bg-primary px-4 py-1 text-white'
                           onClick={handleLogout}
                        >
                           Logout
                        </button>
                     ) : (
                        <>
                           <Link
                              to={'/login'}
                              className='rounded-lg bg-primary px-4 py-1 text-white'
                           >
                              Login
                           </Link>

                           <Link
                              to={'/signup'}
                              className='rounded-lg bg-primary px-4 py-1 text-white'
                           >
                              Register
                           </Link>
                        </>
                     )}

                     {/* <button className="text-white bg-primary py-1 px-4 rounded-lg">
                Logout
              </button> */}
                  </div>

                  <button className='md:hidden' onClick={toggleMenu}>
                     {isMenuOpen ? (
                        <X className='h-6 w-6' />
                     ) : (
                        <Menu className='h-6 w-6' />
                     )}
                  </button>
               </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
               <div className='border-t border-gray-100 pb-4 pt-4 md:hidden'>
                  <nav className='flex flex-col space-y-4'>
                     <Link
                        to='/'
                        className='text-gray-700 hover:text-brand-blue'
                        onClick={() => setIsMenuOpen(false)}
                     >
                        Home
                     </Link>
                     <Link
                        to='/store/products'
                        className='text-gray-700 hover:text-brand-blue'
                        onClick={() => setIsMenuOpen(false)}
                     >
                        Products
                     </Link>
                  </nav>

                  {/* Search (Mobile) */}
                  {onSearch && (
                     <form
                        onSubmit={handleSearch}
                        className='mt-4 flex items-center overflow-hidden rounded-full border bg-gray-50'
                     >
                        <Input
                           type='text'
                           placeholder='Search products...'
                           className='border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                           type='submit'
                           variant='ghost'
                           size='icon'
                           className='text-gray-500'
                        >
                           <Search size={20} />
                        </Button>
                     </form>
                  )}
               </div>
            )}
         </div>
      </header>
   );
};

export default Header;
