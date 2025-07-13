import { useContext, useState } from 'react';

// import { Product } from '@/features/store/data/products';
// import { useCart } from '@/hooks/useCart';
// import { useComparison } from '@/hooks/useComparison';
import { message } from 'antd';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

// import { Star } from "lucide-react";
import { AuthContext } from '@/features/store/context/auth-context';
import { Product } from '@/features/store/types';
import onAxios from '@/features/store/utils';

interface ProductCardProps {
   product: Product;
   showCompareButton?: boolean;
}

const ProductCard = ({
   product,
   showCompareButton = true,
}: ProductCardProps) => {
   // const { addItem } = useCart();
   // const { addProduct, isInComparison } = useComparison();
   // const alreadyInComparison = isInComparison(product.id);

   // const handleAddToCart = () => {
   //   addItem(product, 1);
   // };

   // const handleAddToComparison = () => {
   //   addProduct(product);
   // };

   // Calculate discounted price if applicable
   // const discountedPrice = product.discountPercentage
   //   ? product.price * (1 - product.discountPercentage / 100)
   //   : null;

   // interface CartData {
   //   id: number;
   //   name: string;
   //   price: number;
   //   quantity: number;
   //   image?: string;
   //   // ممكن تضيف خصائص إضافية حسب الحاجة
   // }

   // // نوع بيانات السياق
   // interface CartType {
   //   dataCarts: CartData[];
   //   setDataCarts: React.Dispatch<React.SetStateAction<CartData[]>>;
   //   getCarts: () => void;
   // }

   const { getCarts } = useContext(AuthContext) as { getCarts: () => void };
   const [loading, setLoading] = useState(false);
   const [imageError, setImageError] = useState(false);

   const addCart = () => {
      setLoading(true);

      onAxios
         .post('/api/e-commerce/cart/add', {
            product_id: product.id,
            quantity: 1,
         })
         .then(() => {
            getCarts();
            message.success('The Product Added To Cart');
         })
         .catch((err) => {
            console.log(err);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   return (
      <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg'>
         {/* Product Image */}
         <Link to={`/store/product/${product.id}`} className='relative'>
            <div className='flex h-48 items-center justify-center overflow-hidden bg-gray-100'>
               {!imageError ? (
                  <img
                     src={product.image_url}
                     alt={product.name}
                     className='h-full w-full object-cover'
                     onError={() => setImageError(true)} // ✅ هنا الشرط
                  />
               ) : (
                  <div className='flex h-full w-full items-center justify-center bg-gray-200 text-4xl font-bold text-gray-500'>
                     {product.name?.charAt(0).toUpperCase() || '?'}
                  </div>
               )}

               {/* Badges */}
               {/* <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.bestseller && (
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                BESTSELLER
              </span>
            )}
            {product.new && (
              <span className="bg-brand-blue text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {product.discountPercentage && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div> */}

               {/* Stock status */}
               {product.stock === 0 && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                     <span className='text-lg font-bold text-white'>
                        Out of Stock
                     </span>
                  </div>
               )}
            </div>
         </Link>

         {/* Product Info */}
         <div className='flex flex-grow flex-col p-4'>
            <div className='mb-2'>
               {/* <span className="text-sm text-gray-500">{product.brand}</span> */}
               <Link to={`/store/product/${product.id}`}>
                  <h3 className='text-lg font-semibold leading-tight transition-colors hover:text-brand-blue'>
                     {product.name}
                  </h3>
               </Link>

               {/* <p className="text-sm text-gray-500 font-semibold mt-4">
            Category : {product.category.name}
          </p> */}
            </div>

            {/* Rating */}
            {/* <div className="flex items-center mb-2">
          <div className="flex items-center">
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <Star
                  key={idx}
                  size={14}
                  className={`${
                    idx < Math.floor(product.rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : idx < product.rating
                      ? "text-yellow-500 fill-yellow-500 opacity-50"
                      : "text-gray-300"
                  }`}
                />
              ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount})
          </span>
        </div> */}

            {/* Price */}
            <div className='mt-auto'>
               <div className='mb-3 flex items-center'>
                  {/* {discountedPrice ? (
              <>
                <span className="text-lg font-bold mr-2">
                  EGP{discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  EGP{product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">EGP {product.price}</span>
            )} */}
                  <span className='text-lg font-bold'>EGP {product.price}</span>
               </div>

               {/* Buttons */}
               <div className={`flex ${showCompareButton ? 'space-x-2' : ''}`}>
                  <Button
                     onClick={addCart}
                     className='flex-1'
                     disabled={product.stock === 0}
                     variant={product.stock === 0 ? 'outline' : 'default'}
                  >
                     {product.stock === 0
                        ? 'Out of Stock'
                        : loading
                          ? 'Loading...'
                          : 'Add to Cart'}
                  </Button>

                  {/* {showCompareButton && (
              <Button
                onClick={handleAddToComparison}
                variant="outline"
                disabled={alreadyInComparison}
              >
                {alreadyInComparison ? "In Compare" : "Compare"}
              </Button>
            )} */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductCard;
