import { useContext } from 'react';

import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '@/features/store/context/auth-context';

export const CartIcon = () => {
   const context = useContext(AuthContext);
   if (!context) throw new Error('AuthContext not found');
   const { dataCarts } = context;
   return (
      <Link to='/store/cart' className='relative'>
         <ShoppingCart className='h-6 w-6 text-gray-700' />
         {dataCarts.length > 0 && (
            <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-xs text-white'>
               {dataCarts.length}
            </div>
         )}
      </Link>
   );
};
