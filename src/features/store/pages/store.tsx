import { useEffect, useState } from 'react';

import { Spin } from 'antd';
import { BarChart3, ChevronRight, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { api } from '@/shared/lib';

import ProductGrid from '@/features/store/components/product-grid';
import { useStore } from '@/features/store/hooks/use-store';
import { Category } from '@/features/store/types/index';

type Props = {
   setDataCategories: React.Dispatch<React.SetStateAction<Category[]>>;
   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
   setError: React.Dispatch<React.SetStateAction<any>>;
};
const getCategories = ({ setDataCategories, setLoading, setError }: Props) => {
   setLoading(true);
   api.get('e-commerce/categories')
      .then((res) => {
         setDataCategories(res.data.data);
         setLoading(false);
      })
      .catch(() => {
         setError('Failed to fetch categories');
         setLoading(false);
      });
};

const Index = () => {
   const [dataCategories, setDataCategories] = useState<Category[]>([]);
   const [loading, setLoading] = useState(true);
   const [_error, setError] = useState<any>(null);

   const { dataProducts, getProducts } = useStore();

   useEffect(() => {
      getCategories({ setDataCategories, setLoading, setError });
      getProducts();
   }, [getProducts]);

   // recommendedProducts
   const recommendedProducts = dataProducts
      .filter((product) => product.price <= 200)
      .slice(0, 4);

   return (
      <div className='flex min-h-screen flex-col'>
         {/* Hero Section */}
         <section className='bg-gradient-to-r from-brand-blue to-brand-green py-16 text-white'>
            <div className='container mx-auto px-4'>
               <div className='max-w-2xl'>
                  <h1 className='mb-4 text-4xl font-bold md:text-5xl'>
                     Fitness Tech for Your Health Journey
                  </h1>
                  <p className='mb-6 text-lg'>
                     Discover the latest fitness and health electronics to
                     track, improve, and analyze your performance.
                  </p>
                  <div className='flex flex-col gap-4 sm:flex-row'>
                     <Link to='/store/products'>
                        <Button
                           size='lg'
                           className='bg-white text-brand-blue hover:bg-gray-100'
                        >
                           Shop Now
                        </Button>
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         {/* Categories Section */}
         <section className='py-12'>
            <div className='container mx-auto px-4'>
               <h2 className='mb-6 text-2xl font-bold'>Browse Categories</h2>
               <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                  {loading ? (
                     <div className='flex min-h-[150px] items-center justify-center'>
                        <Spin size='large' />
                     </div>
                  ) : dataCategories.length === 0 ? (
                     <div className='text-center text-gray-500'>
                        Categories Not Found
                     </div>
                  ) : (
                     <>
                        {dataCategories.map((cat) => (
                           <CategoryCard
                              key={cat.id}
                              title={cat.name}
                              link={`/store/category/${cat.id}`}
                           />
                        ))}
                     </>
                  )}
               </div>
            </div>
         </section>

         <section className='bg-gray-50 py-12'>
            <div className='container mx-auto px-4'>
               <div className='mb-6 flex items-center justify-between'>
                  <h2 className='mb-4 text-2xl font-bold'>
                     Recommended Products
                  </h2>
                  <Link
                     to='/store/products'
                     className='flex items-center text-brand-blue hover:underline'
                  >
                     View all <ChevronRight size={16} />
                  </Link>
               </div>
               {recommendedProducts.length === 0 ? (
                  <p className='text-gray-500'>
                     No recommended products under 200.
                  </p>
               ) : (
                  <ProductGrid
                     products={recommendedProducts}
                     showCompareButton={false}
                  />
               )}
            </div>
         </section>

         {/* Features Section */}
         <section className='bg-brand-dark py-12 text-white'>
            <div className='container mx-auto px-4'>
               <h2 className='mb-8 text-center text-2xl font-bold'>
                  Why Shop With Us?
               </h2>
               <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                  <FeatureCard
                     icon={<Search size={32} />}
                     title='Product Comparisons'
                     description='Compare features, specifications, and prices to find the perfect fitness tech for your needs.'
                  />
                  <FeatureCard
                     icon={<BarChart3 size={32} />}
                     title='Technical Specifications'
                     description='Detailed technical information to help you make informed decisions.'
                  />
                  <FeatureCard
                     icon={<Star size={32} />}
                     title='Verified Reviews'
                     description='Read honest reviews from verified customers to guide your purchase.'
                  />
               </div>
            </div>
         </section>
      </div>
   );
};

// Helper components
interface CategoryCardProps {
   title: string;
   // count: number;
   link: string;
}

const CategoryCard = ({ title, link }: CategoryCardProps) => (
   <Link
      to={link}
      className='rounded-lg bg-white p-6 shadow-md transition-transform hover:scale-[1.03]'
   >
      <h3 className='mb-1 font-medium'>{title}</h3>
      {/* <p className="text-sm text-gray-500">{count} products</p> */}
   </Link>
);

interface FeatureCardProps {
   icon: React.ReactNode;
   title: string;
   description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
   <div className='rounded-lg bg-white/10 p-6 backdrop-blur-sm'>
      <div className='mb-4 text-brand-green'>{icon}</div>
      <h3 className='mb-2 font-bold'>{title}</h3>
      <p className='text-sm text-gray-200'>{description}</p>
   </div>
);

export default Index;
