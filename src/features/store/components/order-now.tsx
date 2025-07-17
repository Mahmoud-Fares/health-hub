'use no memo';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/shared/components/ui/dialog';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';

import { useOrderItem } from '@/features/store/api/order-hooks';
import { orderItemSchema } from '@/features/store/schema';
import { Product } from '@/features/store/types';

type OrderFormData = {
   address: string;
   phone: string;
};

type OrderNowProps = {
   product: Product;
   productName: string;
   className?: string;
};

export function OrderNow({ product, productName, className }: OrderNowProps) {
   const [open, setOpen] = useState(false);
   const { mutate: orderItem, isPending } = useOrderItem();

   const form = useForm<OrderFormData>({
      resolver: zodResolver(orderItemSchema),
      defaultValues: {
         address: '',
         phone: '',
      },
   });

   const onSubmit = (values: OrderFormData) => {
      orderItem(
         { product, payload: values },
         {
            onSuccess: () => {
               setOpen(false);
               form.reset();
            },
         }
      );
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button className={cn(className)} size='lg'>
               Order Now
            </Button>
         </DialogTrigger>
         <DialogContent className='sm:max-w-md'>
            <DialogHeader>
               <DialogTitle>Place Order</DialogTitle>
               <DialogDescription>
                  Enter your delivery details to order {productName}
               </DialogDescription>
            </DialogHeader>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
               >
                  <FormField
                     control={form.control}
                     name='address'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Delivery Address</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='Enter your full address'
                                 {...field}
                                 autoComplete='street-address'
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='phone'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Phone Number</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='Enter your phone number'
                                 {...field}
                                 type='tel'
                                 autoComplete='tel'
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <DialogFooter>
                     <Button
                        type='submit'
                        disabled={isPending}
                        className='w-full'
                        size='lg'
                     >
                        {isPending ? 'Placing Order...' : 'Place Order'}
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
