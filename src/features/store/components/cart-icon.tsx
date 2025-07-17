import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useStore } from '@/features/store/hooks/use-store';

export const CartIcon = () => {
   const { dataCarts } = useStore();
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
