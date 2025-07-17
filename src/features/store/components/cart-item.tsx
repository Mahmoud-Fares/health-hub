import { useState } from 'react';

import { Spin, message } from 'antd';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { api } from '@/shared/lib';

import { useStore } from '@/features/store/hooks/use-store';
import { CartProduct } from '@/features/store/types';

// import { Product } from "@/data/products";
// import { useCart } from '@/hooks/useCart';

interface CartItemProps {
   product: CartProduct;
   quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
   // const { updateQuantity, removeItem } = useCart();
   // const [quantity, setQuantity] = useState(initialQuantity);
   const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);
   const [deleting, setDeleting] = useState<boolean>(false);

   const { getCarts } = useStore();
   // const handleQuantityChange = (delta: number) => {
   //   const newQuantity = quantity + delta;
   //   if (newQuantity > 0) {
   //     updateQuantity(product.id, newQuantity);
   //   } else {
   //     removeItem(product.id);
   //   }
   // };

   // Calculate discounted price if applicable
   // const price = product.discountPercentage
   //   ? product.price * (1 - product.discountPercentage / 100)
   //   : product.price;

   // const itemTotal = price * quantity;

   // Delete Cart
   const deleteCart = (id: number) => {
      setDeleting(true); // يبدأ التحميل
      api.delete(`e-commerce/cart/destroy/${id}`)
         .then(() => {
            getCarts();
            message.success(
               'The product has been removed from your shopping cart.'
            );
         })
         .catch((err) => {
            console.log(err);
            message.error('Failed to remove the product.');
         })
         .finally(() => {
            setDeleting(false);
         });
   };

   // const handleQuantityChange = (delta) => {
   //   setQuantity((prev) => {
   //     const newQuantity = prev + delta;
   //     if (newQuantity < 1) return 1; // منع الكمية من أن تكون أقل من 1
   //     return newQuantity;
   //   });
   // };

   console.log(product);
   // Update Cart

   const updateCart = (id: number, newQuantity: number) => {
      api.put(`e-commerce/cart/update/${id}`, {
         quantity: newQuantity,
      })
         .then(() => {
            getCarts();
            message.success(
               'The product quantity has been updated successfully.'
            );
         })
         .catch((err) => {
            console.error(err);
            message.error('An error occurred while updating the cart.');
         });
   };

   const handleQuantityChange = (delta: number) => {
      const newQuantity = currentQuantity + delta;
      if (newQuantity < 1) return;

      setCurrentQuantity(newQuantity);
      updateCart(product.id, newQuantity);
   };

   return (
      <div className='flex border-b py-6'>
         {/* Product image */}
         <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border'>
            <img
               src={product.product_image}
               alt={product.product_name}
               className='h-full w-full object-contain object-center'
            />
         </div>

         {/* Product details */}
         <div className='ml-4 flex flex-1 flex-col'>
            <div>
               <div className='flex justify-between'>
                  <h3>
                     <Link
                        to={`/store/product/${product.product_id}`}
                        className='font-medium text-gray-700 hover:text-brand-blue'
                     >
                        {product.product_name}
                     </Link>
                  </h3>
                  <Button
                     variant='ghost'
                     size='icon'
                     className='h-6 w-6 text-gray-400 hover:text-gray-600'
                     onClick={() => deleteCart(product.id)}
                     disabled={deleting}
                  >
                     {deleting ? <Spin size='small' /> : <X size={16} />}
                  </Button>
               </div>
               {/* <p className="mt-1 text-sm text-gray-500">{product.brand}</p> */}
            </div>
            <div className='flex flex-1 items-end justify-between text-sm'>
               <div className='flex items-center'>
                  <Button
                     variant='ghost'
                     size='icon'
                     onClick={() => handleQuantityChange(-1)}
                     className='h-8 w-8'
                  >
                     <ChevronDown size={16} />
                  </Button>

                  <span className='mx-2 w-5 text-center'>
                     {currentQuantity}
                  </span>

                  <Button
                     variant='ghost'
                     size='icon'
                     onClick={() => handleQuantityChange(1)}
                     className='h-8 w-8'
                  >
                     <ChevronUp size={16} />
                  </Button>
               </div>

               <div className='text-right'>
                  <p className='font-medium text-gray-900'>
                     EGP {(product.product_price * currentQuantity).toFixed(2)}
                  </p>
                  {/* {product.discountPercentage && (
              <p className="text-xs text-gray-500">
                <span className="line-through">
                  EGP {(product.price * quantity).toFixed(2)}
                </span>
                <span className="ml-1 text-red-500">
                  Save {product.discountPercentage}%
                </span>
              </p>
            )} */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default CartItem;
