import { useState } from 'react';

import { api } from '@/shared/lib';

import type { CartProduct, Product } from '../types';

export interface CartMeta {
   total_items: number;
   total_price: number;
}

export const useStoreManagement = () => {
   const [dataCarts, setDataCarts] = useState<CartProduct[]>([]);
   const [cartMeta, setCartMeta] = useState<CartMeta>({
      total_items: 0,
      total_price: 0,
   });
   const [dataProducts, setDataProducts] = useState<Product[]>([]);
   const [productsLoading, setProductsLoading] = useState<boolean>(false);

   const getCarts = () => {
      api.get('e-commerce/cart/')
         .then((res) => {
            setDataCarts(res.data.data);
            setCartMeta(res.data.meta);
         })
         .catch((err) => {
            console.error('Error fetching cart:', err);
            setDataCarts([]);
            setCartMeta({ total_items: 0, total_price: 0 });
         });
   };

   const getProducts = (query: string = '') => {
      setProductsLoading(true);
      api.get(`e-commerce/products${query ? `?${query}` : ''}`)
         .then((res) => {
            setDataProducts(res.data.data);
         })
         .catch((err) => {
            console.log('Error fetching products:', err);
         })
         .finally(() => {
            setProductsLoading(false);
         });
   };

   return {
      dataCarts,
      setDataCarts,
      setCartMeta,
      cartMeta,
      getCarts,
      getProducts,
      productsLoading,
      dataProducts,
      setDataProducts,
   };
};
