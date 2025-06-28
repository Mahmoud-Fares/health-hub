import { useContext, useState } from 'react';

// import { useCart } from '@/hooks/useCart';
import { Spin, message } from 'antd';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import CartItem from '@/features/store/components/cart-item';
import { AuthContext } from '@/features/store/context/auth-context';
import onAxios from '@/features/store/utils';

const Cart = () => {
   // const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
   // const totalItems = getTotalItems();
   // const subtotal = getTotalPrice();
   // const shipping = subtotal > 100 ? 0 : 9.99;
   // const total = subtotal + shipping;
   const [clearing, setClearing] = useState<boolean>(false);

   interface CartData {
      id: number;
      product_id: number;
      product_name: string;
      product_price: number;
      quantity: number;
      product_image?: string;
      added_at?: string;
      subtotal?: number;
   }

   interface CartMeta {
      total_items: number;
      total_price: number;
   }

   interface CartType {
      dataCarts: CartData[];
      setDataCarts: React.Dispatch<React.SetStateAction<CartData[]>>;

      cartMeta: CartMeta;
      setCartMeta: React.Dispatch<React.SetStateAction<CartMeta>>;

      getCarts: () => void;
   }

   // استخدام البيانات من السياق
   const { dataCarts, cartMeta, getCarts } = useContext(
      AuthContext
   ) as CartType;

   // const getCarts = () => {
   //   onAxios
   //     .get("/api/e-commerce/cart/")
   //     .then((res) => {
   //       setDataCarts(res.data.data);
   //       setCartMeta(res.data.meta);
   //       console.log(res.data);
   //     })
   //     .catch((err) => console.log(err));
   // };

   // useEffect(() => {
   //   getCarts();
   // }, []);

   // Clear Cart
   const clearCart = () => {
      setClearing(true);
      onAxios
         .delete(`/api/e-commerce/cart/clear`)
         .then(() => {
            message.success('Your shopping cart has been emptied.');
            getCarts();
         })
         .catch((err) => {
            console.log(err);
            message.error('Failed to clear the cart.');
         })
         .finally(() => {
            setClearing(false);
         });
   };

   if (dataCarts.length === 0) {
      return (
         <div className='flex flex-col items-center justify-center py-12'>
            <div className='mb-4 rounded-full bg-gray-100 p-5'>
               <ShoppingCart size={40} className='text-gray-400' />
            </div>
            <h2 className='mb-2 text-xl font-bold'>Your cart is empty</h2>
            <p className='mb-6 text-gray-500'>
               Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
               <Link to='/store/products'>Start Shopping</Link>
            </Button>
         </div>
      );
   }

   return (
      <div className='rounded-lg bg-white shadow-md'>
         <div className='border-b px-6 py-4'>
            <div className='flex items-center justify-between'>
               <h2 className='text-xl font-bold'>
                  Shopping Cart
                  {/* ({totalItems}{totalItems === 1 ? "item" : "items"}) */}
               </h2>
               <Button onClick={clearCart} disabled={clearing}>
                  {clearing ? <Spin size='small' /> : 'Clear Cart'}
               </Button>
            </div>
         </div>

         <div className='px-6 py-4'>
            <div>
               {dataCarts.map((item) => (
                  <CartItem
                     key={item.id}
                     product={{
                        id: item.id,
                        imageSrc: item.product_image,
                        name: item.product_name,
                        price: item.product_price,
                        subTotal: item.subtotal,
                     }}
                     quantity={item.quantity}
                  />
               ))}
            </div>

            <div className='mt-6 space-y-4 border-t pt-6'>
               {/* <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-medium">EGP {subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping</p>
            <p className="font-medium">
              {shipping === 0 ? "Free" : `EGP ${shipping.toFixed(2)}`}
            </p>
          </div> */}
               {/* {shipping === 0 && (
            <div className="text-right text-xs text-green-600">
              Free shipping on orders over EGP 100
            </div>
          )} */}
               <div className='flex justify-between border-t pt-4'>
                  <p className='font-bold'>Total</p>
                  <p className='font-bold'>EGP {cartMeta.total_price}</p>
               </div>
            </div>

            <div className='mt-8'>
               <Button className='w-full' size='lg'>
                  Proceed to Checkout
               </Button>
               <div className='mt-4 text-center'>
                  <Link
                     to='/store/products'
                     className='text-sm text-brand-blue hover:underline'
                  >
                     Continue Shopping
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Cart;
