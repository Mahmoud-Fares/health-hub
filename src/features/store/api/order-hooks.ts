import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Product } from '@/features/store/types';

import { orderService } from './order-service';

type OrderItemPayload = {
   address: string;
   phone: string;
};

export const useOrderItem = () => {
   return useMutation({
      mutationFn: ({
         product,
         payload,
      }: {
         product: Product;
         payload: OrderItemPayload;
      }) => orderService.orderItem(product, payload),
      onSuccess: (data) => {
         toast.success('Order placed successfully!', {
            description: `Your order #${data.data.id} has been confirmed.`,
         });
      },
      onError: (error: any) => {
         console.log('error', error);
         toast.error('Failed to place order', {
            description:
               error.response?.data?.msg ||
               'Something went wrong. Please try again.',
         });
      },
   });
};

export const useOrderDetails = (orderId: string) => {
   return useQuery({
      queryKey: ['order-details', orderId],
      queryFn: () => orderService.getOrderDetails(orderId),
      enabled: !!orderId,
      retry: false,
   });
};
