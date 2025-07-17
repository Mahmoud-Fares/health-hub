import { useParams } from 'react-router-dom';

import Spinner from '@/shared/components/spinner';
import {
   Alert,
   AlertDescription,
   AlertTitle,
} from '@/shared/components/ui/alert';
import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';

import { useOrderDetails } from '@/features/store/api/order-hooks';

export default function OrderDetails() {
   const { orderId } = useParams();
   const { data, isLoading, isError } = useOrderDetails(orderId || '');

   if (isLoading) {
      return (
         <div className='flex min-h-[40vh] items-center justify-center'>
            <Spinner className='size-8' />
         </div>
      );
   }

   if (isError || !data?.data) {
      return (
         <div className='mx-auto flex min-h-[40vh] items-center justify-center sm:max-w-md'>
            <Alert variant='destructive'>
               <AlertTitle>Order Not Found</AlertTitle>
               <AlertDescription>
                  The order ID you provided is invalid or does not exist.
               </AlertDescription>
            </Alert>
         </div>
      );
   }

   const order = data.data;

   return (
      <div className='container mx-auto max-w-3xl px-4 py-8'>
         <Card className='mb-8 p-6 shadow-md'>
            <div className='mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
               <h1 className='text-2xl font-bold'>Order #{order.id}</h1>
               <Badge
                  className={
                     order.status === 'completed'
                        ? 'bg-green-100 text-green-800 hover:bg-green-100'
                        : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                  }
               >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
               </Badge>
            </div>
            <div className='mb-2 text-gray-600'>
               <span className='font-medium'>Placed on:</span>{' '}
               {order.created_at}
            </div>
            <div className='mb-2 text-gray-600'>
               <span className='font-medium'>Total Price:</span> EGP{' '}
               {order.total_price}
            </div>
            <div className='mb-2 text-gray-600'>
               <span className='font-medium'>Shipping Address:</span>{' '}
               {order.address}
            </div>
            <div className='mb-2 text-gray-600'>
               <span className='font-medium'>Phone:</span>{' '}
               {order.phone || 'N/A'}
            </div>
         </Card>

         <Card className='p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>Products</h2>
            <div className='divide-y'>
               {order.products.map((product) => (
                  <div
                     key={product.product_id}
                     className='flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between'
                  >
                     <div>
                        <div className='font-medium'>{product.name}</div>
                        <div className='text-sm text-gray-500'>
                           Product ID: {product.product_id}
                        </div>
                     </div>
                     <div className='flex flex-col gap-1 md:flex-row md:items-center md:gap-6'>
                        <div>
                           <span className='font-medium'>Quantity:</span>{' '}
                           {product.quantity}
                        </div>
                        <div>
                           <span className='font-medium'>Unit Price:</span> EGP{' '}
                           {product.price_per_unit}
                        </div>
                        <div>
                           <span className='font-medium'>Subtotal:</span> EGP{' '}
                           {product.subtotal}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </Card>
      </div>
   );
}
