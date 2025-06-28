import { useEffect, useState } from 'react';

import { Spin } from 'antd';
import { useParams } from 'react-router-dom';

import Footer from '@/features/store/components/footer';
import Header from '@/features/store/components/header';
import ProductGrid from '@/features/store/components/product-grid';
import { Product } from '@/features/store/types';
import onAxios from '@/features/store/utils';

interface Category {
   id: number;
   name: string;
   products: Product[];
}

const CategoryPage = () => {
   const { id } = useParams();
   const [dataCategory, setDataCategory] = useState<{ category?: Category }>(
      {}
   );
   const [loading, setLoading] = useState<boolean>(true);

   const getCategory = (id: string | undefined) => {
      setLoading(true); // Start loading
      onAxios
         .get(`/api/e-commerce/categories/${id}`)
         .then((res) => {
            setDataCategory(res.data);
            setLoading(false); // Stop loading on success
         })
         .catch((err) => {
            console.log(err);
            setLoading(false); // Stop loading on error too
         });
   };

   useEffect(() => {
      getCategory(id);
   }, [id]);

   if (loading) {
      return (
         <div className='flex min-h-screen items-center justify-center'>
            <Spin size='large' tip='Loading category...' />
         </div>
      );
   }

   return (
      <div className='flex min-h-screen flex-col'>
         <Header onSearch={() => {}} />

         <div className='flex-grow'>
            <div className='container mx-auto px-4 py-8'>
               <h2 className='mb-7 text-2xl font-semibold'>
                  Category: {dataCategory.category?.name}
               </h2>

               {dataCategory.category?.products?.length &&
               dataCategory.category?.products?.length > 0 ? (
                  <ProductGrid products={dataCategory.category.products} />
               ) : (
                  <div className='py-16 text-center text-gray-500'>
                     No products found in this category.
                  </div>
               )}
            </div>
         </div>

         <Footer />
      </div>
   );
};

export default CategoryPage;
