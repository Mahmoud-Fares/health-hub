import { useEffect, useState } from 'react';

import { Spin } from 'antd';
import { useParams } from 'react-router-dom';

import { api } from '@/shared/lib';

import ProductDetail from '@/features/store/components/product-details';
// import { getProductById } from "@/features/store/data/products";
import { Product } from '@/features/store/types';

const ProductDetailPage = () => {
   const { pid } = useParams();
   // const navigate = useNavigate();
   const [dataProduct, setDataProduct] = useState<Product | null>(null);

   // const product = productId ? getProductById(productId) : undefined;

   // useEffect(() => {
   //   if (!product && productId) {
   //     // If product not found, redirect to 404
   //     navigate("/404");
   //   }
   // }, [product, productId, navigate]);

   // if (!product) {
   //   return null; // Will redirect in the useEffect
   // }

   const getProduct = (id: any) => {
      api.get(`e-commerce/products/${id}`)
         .then((res) => {
            setDataProduct(res.data.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      getProduct(pid);
   }, [pid]);

   if (!dataProduct) {
      <div className='flex min-h-screen items-center justify-center'>
         <Spin size='large' tip='Loading category...' />
      </div>;
   }

   return (
      <div className='flex min-h-screen flex-col'>
         <main className='flex-grow'>
            {dataProduct ? (
               <ProductDetail product={dataProduct} />
            ) : (
               <div className='flex min-h-screen items-center justify-center'>
                  <Spin size='large' tip='Loading category...' />
               </div>
            )}
         </main>
      </div>
   );
};

export default ProductDetailPage;
