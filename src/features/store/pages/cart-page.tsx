import Cart from '@/features/store/components/cart';

const CartPage = () => {
   return (
      <div className='flex min-h-screen flex-col'>
         <main className='container mx-auto flex-grow px-4 py-8'>
            <h1 className='mb-6 text-2xl font-bold'>Your Shopping Cart</h1>
            <Cart />
         </main>
      </div>
   );
};

export default CartPage;
