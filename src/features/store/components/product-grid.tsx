import { Product } from '@/features/store/types';

import ProductCard from './product-card';

interface ProductGridProps {
   products: Product[];
   showCompareButton?: boolean;
}

const ProductGrid = ({
   products,
   showCompareButton = true,
}: ProductGridProps) => {
   if (products.length === 0) {
      return (
         <div className='rounded-lg bg-gray-50 p-8 text-center'>
            <p className='text-gray-500'>
               No products found matching your criteria.
            </p>
         </div>
      );
   }

   return (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
         {products.map((product) => (
            <ProductCard
               key={product.id}
               product={product}
               showCompareButton={showCompareButton}
            />
         ))}
      </div>
   );
};

export default ProductGrid;
