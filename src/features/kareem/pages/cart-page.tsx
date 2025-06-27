import Cart from '@/features/kareem/components/cart';
import Footer from '@/features/kareem/components/footer';
import Header from '@/features/kareem/components/header';

const CartPage = () => {
   return (
      <div className='flex min-h-screen flex-col'>
         <Header />

         <main className='container mx-auto flex-grow px-4 py-8'>
            <h1 className='mb-6 text-2xl font-bold'>Your Shopping Cart</h1>
            <Cart />
         </main>

         <Footer />
      </div>
   );
};

export default CartPage;
