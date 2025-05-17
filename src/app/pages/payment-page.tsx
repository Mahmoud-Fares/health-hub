import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

import { useConfirmPayment } from '@/features/booking/api/booking-hooks';

import PageWithNoSidebar from '@/app/layouts/page-with-no-sidebar';

const PaymentPage = () => {
   const { bookingId } = useParams<{ bookingId: string }>();
   const [transactionId, setTransactionId] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const { mutate: confirmPayment } = useConfirmPayment();

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!transactionId.trim()) {
         toast.error('Please enter a transaction ID');
         return;
      }

      if (!bookingId) {
         toast.error('Booking ID is missing');
         return;
      }

      setIsLoading(true);
      confirmPayment(
         { bookingId },
         {
            onSuccess: () => {
               toast.success('Payment confirmed successfully');
               // Redirect to appointments page after successful payment
               window.location.href = '/my-appointments';
            },
            onError: (error) => {
               toast.error('Failed to confirm payment');
               console.error('Payment error:', error);
               setIsLoading(false);
            },
         }
      );
   };

   return (
      <PageWithNoSidebar>
         <div className='container max-w-lg py-12'>
            <Card>
               <CardHeader>
                  <CardTitle>Payment Confirmation</CardTitle>
                  <CardDescription>
                     Please complete your payment to confirm your appointment
                  </CardDescription>
               </CardHeader>

               <form onSubmit={handleSubmit}>
                  <CardContent className='space-y-4'>
                     <div className='space-y-2'>
                        <Label htmlFor='booking-id'>Booking ID</Label>
                        <Input id='booking-id' value={bookingId} disabled />
                     </div>

                     <div className='space-y-2'>
                        <Label htmlFor='transaction-id'>Transaction ID</Label>
                        <Input
                           id='transaction-id'
                           placeholder='Enter your transaction ID'
                           value={transactionId}
                           onChange={(e) => setTransactionId(e.target.value)}
                           required
                        />
                        <p className='text-sm text-muted-foreground'>
                           Please enter the transaction ID from your payment
                           receipt
                        </p>
                     </div>

                     <div className='rounded-md bg-muted p-4'>
                        <h3 className='mb-2 font-medium'>
                           Payment Instructions:
                        </h3>
                        <ul className='space-y-2 text-sm'>
                           <li>
                              1. Make a payment to the following account:
                              123-456-789
                           </li>
                           <li>
                              2. Use your booking ID ({bookingId}) as the
                              payment reference
                           </li>
                           <li>
                              3. Enter the transaction ID received after payment
                           </li>
                           <li>4. Submit the form to confirm your booking</li>
                        </ul>
                     </div>
                  </CardContent>

                  <CardFooter>
                     <Button
                        type='submit'
                        disabled={isLoading}
                        className='w-full'
                     >
                        {isLoading ? 'Processing...' : 'Confirm Payment'}
                     </Button>
                  </CardFooter>
               </form>
            </Card>
         </div>
      </PageWithNoSidebar>
   );
};

export default PaymentPage;
