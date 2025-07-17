import { useState } from 'react';

// import { useCart } from '@/hooks/useCart';

import { Input, Modal, Spin, message } from 'antd';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { api } from '@/shared/lib';

import CartItem from '@/features/store/components/cart-item';
import { useStore } from '@/features/store/hooks/use-store';

const Cart = () => {
   // const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
   // const totalItems = getTotalItems();
   // const subtotal = getTotalPrice();
   // const shipping = subtotal > 100 ? 0 : 9.99;
   // const total = subtotal + shipping;
   const [clearing, setClearing] = useState<boolean>(false);
   const [orderLoading, setOrderLoading] = useState<boolean>(false);
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [address, setAddress] = useState<string>('');
   const [phone, setPhone] = useState<string>('');
   const [phoneError, setPhoneError] = useState<string>('');
   const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

   // استخدام البيانات من السياق
   const { dataCarts, cartMeta, getCarts } = useStore();

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
      api.delete(`e-commerce/cart/clear`)
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

   // Create Order
   // const handleCreateOrder = () => {
   //    if (!address.trim()) {
   //       return message.warning('Please enter an address.');
   //    }

   //    const productsPayload = dataCarts.map((item) => ({
   //       id: item.product_id,
   //       quantity: item.quantity,
   //       price: item.product_price,
   //    }));

   //    const payload = {
   //       products: productsPayload,
   //       total_price: cartMeta.total_price,
   //       address,
   //    };

   //    setOrderLoading(true);
   //    onAxios
   //       .post('/api/e-commerce/orders/store', payload)
   //       .then(() => {
   //          message.success('Order placed successfully!');
   //          setIsModalOpen(false);
   //          setAddress('');
   //          clearCart();
   //       })
   //       .catch((err) => {
   //          console.error(err);
   //          message.error('Failed to place order.');
   //       })
   //       .finally(() => setOrderLoading(false));
   // };

   const handleCreateOrder = () => {
      setPhoneError('');

      if (!address.trim()) {
         return message.warning('Please enter an address.');
      }

      if (phone.length !== 11) {
         setPhoneError('Phone number must be exactly 11 digits.');
         return;
      }

      const productsPayload = dataCarts.map((item) => ({
         id: item.product_id,
         quantity: item.quantity,
         price: item.product_price,
      }));

      const payload = {
         products: productsPayload,
         total_price: cartMeta.total_price,
         address,
         phone,
      };

      setOrderLoading(true);
      api.post('e-commerce/orders/store', payload)
         .then(() => {
            setOrderSuccess(true);
            clearCart();
            setAddress('');
            setPhone('');
            setPhoneError('');
            message.success('Order placed successfully!');
            setTimeout(() => {
               setIsModalOpen(false);
               setOrderSuccess(false);
            }, 2000);
         })
         .catch((err) => {
            console.error(err);
            message.error('Failed to place order.');
         })
         .finally(() => setOrderLoading(false));
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
                     product={item}
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
               <Button
                  className='w-full'
                  size='lg'
                  onClick={() => setIsModalOpen(true)}
               >
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

         <Modal
            title={orderSuccess ? 'Order Placed' : 'Confirm Order'}
            open={isModalOpen}
            onCancel={() => {
               setIsModalOpen(false);
               setAddress('');
               setOrderSuccess(false);
            }}
            onOk={!orderSuccess ? handleCreateOrder : undefined}
            okButtonProps={{
               style: { display: orderSuccess ? 'none' : 'inline-block' },
            }}
            confirmLoading={orderLoading}
         >
            {orderSuccess ? (
               <div className='flex flex-col items-center justify-center py-4'>
                  <div className='mb-2 text-4xl text-green-500'>
                     <CheckCircle />
                  </div>
                  <h3 className='text-lg font-semibold text-green-600'>
                     Order placed successfully!
                  </h3>
                  <p className='mt-1 text-gray-500'>
                     Thank you for your purchase.
                  </p>
               </div>
            ) : (
               <div className='space-y-4'>
                  <div>
                     <label className='block text-sm font-medium text-gray-700'>
                        Total Price
                     </label>
                     <Input value={cartMeta.total_price} disabled />
                  </div>

                  <div>
                     <label className='block text-sm font-medium text-gray-700'>
                        Address
                     </label>
                     <Input
                        placeholder='Enter shipping address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                     />
                  </div>
                  <div>
                     <label className='block text-sm font-medium text-gray-700'>
                        Phone Number
                     </label>
                     <Input
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        placeholder='Enter Phone Number (11 digits)'
                        value={phone}
                        onChange={(e) => {
                           setPhone(e.target.value.replace(/\D/g, ''));
                           setPhoneError('');
                        }}
                     />
                     {phoneError && (
                        <p className='mt-1 text-sm text-red-500'>
                           {phoneError}
                        </p>
                     )}
                  </div>

                  {/* Cash on Delivery with static radio */}
                  <div className='flex items-center gap-2 pt-2'>
                     <input
                        type='radio'
                        checked
                        readOnly
                        className='h-4 w-4 accent-green-600'
                     />
                     <label className='text-sm font-medium'>
                        Cash On Delivery
                     </label>
                  </div>
               </div>
            )}
         </Modal>
      </div>
   );
};

export default Cart;
