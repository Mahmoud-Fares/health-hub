import { api } from '@/shared/lib/axios/axios-client';
import { ApiResponse } from '@/shared/types/api';

import { Product } from '@/features/store/types';

type OrderItemPayload = {
   address: string;
   phone: string;
};

type OrderItemResponse = {
   id: string;
   product_id: number;
   address: string;
   phone: string;
   status: string;
   created_at: string;
};

export type OrderDetailsProduct = {
   product_id: number;
   name: string;
   quantity: number;
   price_per_unit: number;
   subtotal: number;
};

export type OrderDetailsResponse = {
   id: number;
   user_id: number;
   total_price: number;
   status: string;
   address: string;
   phone: string;
   created_at: string;
   products: OrderDetailsProduct[];
};

export const orderService = {
   orderItem: async (product: Product, payload: OrderItemPayload) => {
      console.log('test', {
         products: [
            {
               id: product.id,
               quantity: 1,
               price: product.price,
            },
         ],
         address: payload.address,
         phone: payload.phone,
      });

      console.log('product', product);

      const response = await api.post<ApiResponse<OrderItemResponse>>(
         `e-commerce/orders/store`,
         {
            products: [
               {
                  id: product.id,
                  quantity: 1,
                  price: product.price,
               },
            ],
            address: payload.address,
            phone: payload.phone,
         }
      );

      console.log('response', response);

      return response.data;
   },
   async getOrderDetails(orderId: string) {
      const response = await api.get<ApiResponse<OrderDetailsResponse>>(
         `e-commerce/orders/show/${orderId}`
      );
      return response.data;
   },
};
