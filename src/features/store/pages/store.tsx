import { useContext, useEffect, useState } from 'react';

import { Spin } from 'antd';
import { BarChart3, ChevronRight, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import Header from '@/features/store/components/header';
import ProductGrid from '@/features/store/components/product-grid';
import { Input } from '@/features/store/components/ui/input';
import { AuthContext } from '@/features/store/context/auth-context';
import { Category, Product } from '@/features/store/types/index';
import onAxios from '@/features/store/utils';

interface AuthContextType {
   dataProducts: Product[];
   getProducts: () => void;
   productsLoading: boolean;
}

type Props = {
   setDataCategories: React.Dispatch<React.SetStateAction<Category[]>>;
   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
   setError: React.Dispatch<React.SetStateAction<any>>;
};
const getCategories = ({ setDataCategories, setLoading, setError }: Props) => {
   setLoading(true);
   onAxios
      .get('/api/e-commerce/categories')
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
   const [searchQuery, setSearchQuery] = useState('');

   const [dataCategories, setDataCategories] = useState<Category[]>([]);
   const [loading, setLoading] = useState(true);
   const [_error, setError] = useState<any>(null);

   const { dataProducts, getProducts } = useContext(
      AuthContext
   ) as AuthContextType;

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
         <Header />

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

         {/* Search Bar */}
         <section className='bg-white py-8 shadow-md'>
            <div className='container mx-auto px-4'>
               <form
                  // onSubmit={handleSearch}
                  className='mx-auto flex max-w-3xl gap-2'
               >
                  <Input
                     type='text'
                     placeholder='Search for fitness trackers, smart watches, and more...'
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className='flex-1'
                  />
                  <Button type='submit'>
                     <Search className='mr-2 h-4 w-4' />
                     Search
                  </Button>
               </form>
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

         {/* Footer */}
         <footer className='bg-gray-100 py-8'>
            <div className='container mx-auto px-4'>
               <div className='flex flex-col justify-between md:flex-row'>
                  <div className='mb-6 md:mb-0'>
                     <h3 className='mb-2 text-lg font-bold'>HealthUp</h3>
                     <p className='max-w-xs text-gray-600'>
                        Your one-stop shop for fitness and health electronics.
                     </p>
                  </div>
                  <div className='grid grid-cols-2 gap-8 md:grid-cols-3'>
                     <div>
                        <h4 className='mb-2 font-medium'>Shop</h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                           {dataCategories.map((cat) => (
                              <li key={cat.id}>
                                 <Link
                                    to={`category/${cat.id}`}
                                    className='hover:text-brand-blue'
                                 >
                                    {cat.name}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div>
                        <h4 className='mb-2 font-medium'>Company</h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                           <li>
                              <a href='#' className='hover:text-brand-blue'>
                                 About Us
                              </a>
                           </li>
                           <li>
                              <a href='#' className='hover:text-brand-blue'>
                                 Contact
                              </a>
                           </li>
                           <li>
                              <a href='#' className='hover:text-brand-blue'>
                                 Blog
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div>
                        <h4 className='mb-2 font-medium'>Support</h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                           <li>
                              <a href='#' className='hover:text-brand-blue'>
                                 FAQ
                              </a>
                           </li>
                           <li>
                              <a href='#' className='hover:text-brand-blue'>
                                 Shipping
                              </a>
                           </li>
                           <li>
                              <a href='#' className='hover:text-brand-blue'>
                                 Returns
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className='mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500'>
                  <p>
                     &copy; {new Date().getFullYear()} HealthUp. All rights
                     reserved.
                  </p>
               </div>
            </div>
         </footer>
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
