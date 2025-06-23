import { CheckCircle, Clock, CreditCard } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

import { useConfirmBooking } from '@/features/booking/api/booking-hooks';
import { useAppointments } from '@/features/booking/hooks/use-appointments';

const PaymentPage = () => {
   const { bookingId } = useParams<{ bookingId: string }>();
   const navigate = useNavigate();
   const { mutate: confirmBooking, isPending } = useConfirmBooking();

   const { handleRefreshAllBookings } = useAppointments();

   const handleConfirmPayment = () => {
      if (bookingId) {
         confirmBooking(parseInt(bookingId), {
            onSuccess: () => {
               handleRefreshAllBookings();

               toast.success('Payment Successful', {
                  description:
                     'Your appointment has been confirmed. Thank you for your payment.',
               });

               // Redirect to the appointments page after successful payment
               setTimeout(() => {
                  navigate('/my-appointments');
               }, 1500);
            },
         });
      }
   };

   const handlePayLater = () => {
      toast.info('Payment Deferred', {
         description:
            'Your booking remains in pending state. You can pay later from your appointments page.',
      });
      handleRefreshAllBookings();
      navigate('/my-appointments');
   };

   return (
      <div className='min-h-screen p-4 md:p-8'>
         <div className='mx-auto max-w-2xl'>
            <Card className='shadow-md'>
               <CardHeader className='bg-gradient-to-r from-primary/10 to-primary/5 pb-6 text-center'>
                  <CardTitle className='text-2xl'>
                     Complete Your Booking
                  </CardTitle>
                  <CardDescription>Booking ID: {bookingId}</CardDescription>
               </CardHeader>

               <CardContent className='space-y-6 pt-6'>
                  <div className='rounded-lg bg-primary/5 p-4'>
                     <div className='mb-2 flex items-center text-primary'>
                        <Clock className='mr-2 h-5 w-5' />
                        <h3 className='font-medium'>Booking Status: Pending</h3>
                     </div>
                     <p className='text-sm text-muted-foreground'>
                        Your appointment is currently in a pending state. To
                        confirm it, please proceed with payment.
                     </p>
                  </div>

                  <Separator />

                  <div>
                     <h3 className='mb-4 flex items-center font-medium'>
                        <CreditCard className='mr-2 h-5 w-5 text-primary' />
                        Payment Options
                     </h3>

                     <div className='space-y-4'>
                        <div className='rounded-md border border-primary/20 bg-primary/5 p-4'>
                           <div className='flex items-start space-x-3'>
                              <CheckCircle className='mt-1 h-5 w-5 text-primary' />
                              <div>
                                 <h4 className='font-medium'>Pay Now</h4>
                                 <p className='text-sm text-muted-foreground'>
                                    Confirm your appointment immediately by
                                    completing the payment now.
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className='rounded-md border p-4'>
                           <div className='flex items-start space-x-3'>
                              <Clock className='mt-1 h-5 w-5' />
                              <div>
                                 <h4 className='font-medium'>Pay Later</h4>
                                 <p className='text-sm text-muted-foreground'>
                                    Keep your booking in a pending state and pay
                                    at a later time from your appointments page.
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </CardContent>

               <CardFooter className='flex flex-col space-y-3 p-6 sm:flex-row sm:justify-between sm:space-y-0'>
                  <Button
                     variant='outline'
                     onClick={handlePayLater}
                     className='w-full sm:w-auto'
                  >
                     Pay Later
                  </Button>

                  <Button
                     onClick={handleConfirmPayment}
                     disabled={isPending}
                     className='w-full sm:w-auto'
                  >
                     {isPending ? (
                        <Spinner className='border-white' />
                     ) : (
                        <>
                           <CreditCard className='mr-2 h-4 w-4' /> Complete
                           Payment
                        </>
                     )}
                  </Button>
               </CardFooter>
            </Card>
         </div>
      </div>
   );
};

export default PaymentPage;
