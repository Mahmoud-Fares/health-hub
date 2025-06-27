//  todo : to be renamed
import React, { createContext, useEffect, useState } from 'react';

import type { CartProduct, Product } from '../types';
import onAxios from '../utils';

// import { message } from "antd";

export interface CartMeta {
   total_items: number;
   total_price: number;
}

export interface AuthContextType {
   isLoggedIn: boolean;
   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
   dataCarts: CartProduct[];
   setDataCarts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
   cartMeta: CartMeta;
   setCartMeta: React.Dispatch<React.SetStateAction<CartMeta>>;
   getCarts: () => void;
   getProducts: () => void;
   productsLoading: boolean;
   dataProducts: Product[];
   setDataProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
   undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
   const [dataCarts, setDataCarts] = useState<CartProduct[]>([]);
   const [cartMeta, setCartMeta] = useState<CartMeta>({
      total_items: 0,
      total_price: 0,
   });
   const [dataProducts, setDataProducts] = useState<Product[]>([]);
   const [productsLoading, setProductsLoading] = useState<boolean>(false);

   const getCarts = () => {
      onAxios
         .get('/api/e-commerce/cart/')
         .then((res) => {
            setDataCarts(res.data.data);
            setCartMeta(res.data.meta);
            // console.log("Cart fetched:", res.data);
         })
         .catch((err) => {
            console.error('Error fetching cart:', err);
         });
   };

   const getProducts = () => {
      setProductsLoading(true);
      onAxios
         .get('/api/e-commerce/products')
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

   useEffect(() => {
      const token = localStorage.getItem('token-healthUp');

      if (token) {
         setIsLoggedIn(true);
         getCarts();
         getProducts();
      } else {
         setIsLoggedIn(false);
         setDataCarts([]);
         setCartMeta({ total_items: 0, total_price: 0 });
      }
   }, [isLoggedIn]);

   return (
      <AuthContext.Provider
         value={{
            isLoggedIn,
            setIsLoggedIn,
            dataCarts,
            setDataCarts,
            setCartMeta,
            cartMeta,
            getCarts,
            getProducts,
            productsLoading,
            dataProducts,
            setDataProducts,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
