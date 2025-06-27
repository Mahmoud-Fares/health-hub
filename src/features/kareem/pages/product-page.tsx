import { useContext, useEffect } from 'react';

import { Spin } from 'antd';

// import FilterSidebar from "@/features/kareem/components/FilterSidebar";
// import { products } from "@/data/products";
// import { useFilter, sortOptions } from "@/hooks/useFilter";

// import onAxios from "../../Utils/HelperFunction.js";
import Footer from '@/features/kareem/components/footer';
// import { useSearchParams } from "react-router-dom";
// import { SlidersHorizontal } from "lucide-react";
// import { Button } from "@/features/kareem/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/features/kareem/components/ui/select";
import Header from '@/features/kareem/components/header';
import ProductGrid from '@/features/kareem/components/product-grid';
import { AuthContext } from '@/features/kareem/context/auth-context';
import { Product } from '@/features/kareem/types';

interface AuthContextType {
   dataProducts: Product[];
   getProducts: () => void;
   productsLoading: boolean;
}

const ProductsPage = () => {
   // const [searchParams, setSearchParams] = useSearchParams();
   // const [showFilters, setShowFilters] = useState(false);
   // const [dataProducts, setDataProducts] = useState([]);
   const { dataProducts, getProducts, productsLoading } = useContext(
      AuthContext
   ) as AuthContextType;

   // Get filter values from URL parameters
   // const initialCategory = searchParams.get("category");
   // const initialSearchQuery = searchParams.get("search") || "";
   // const initialSort = searchParams.get("sort") || "featured";

   // const {
   //   filteredProducts,
   //   filters,
   //   updateFilter,
   //   resetFilters,
   //   sortBy,
   //   setSortBy,
   //   sortOptions,
   //   searchQuery,
   //   setSearchQuery,
   // } = useFilter(products);

   // Apply URL parameters on mount
   // useEffect(() => {
   //   if (initialCategory) {
   //     updateFilter("category", initialCategory);
   //   }

   //   if (initialSearchQuery) {
   //     setSearchQuery(initialSearchQuery);
   //   }

   //   if (initialSort) {
   //     setSortBy(initialSort);
   //   }
   // }, [initialCategory, initialSearchQuery, initialSort]);

   // Update URL when filters change
   // useEffect(() => {
   //   const params = new URLSearchParams();

   //   if (filters.category) {
   //     params.set("category", filters.category);
   //   }

   //   if (searchQuery) {
   //     params.set("search", searchQuery);
   //   }

   //   if (sortBy !== "featured") {
   //     params.set("sort", sortBy);
   //   }

   //   setSearchParams(params);
   // }, [filters.category, searchQuery, sortBy]);

   // Handle search from header
   // const handleSearch = (query: string) => {
   //   setSearchQuery(query);
   // };

   // Calculate price limits
   // const minPrice = Math.min(...products.map((p) => p.price));
   // const maxPrice = Math.max(...products.map((p) => p.price));

   // Toggle mobile filters
   // const toggleFilters = () => {
   //   setShowFilters(!showFilters);
   // };

   useEffect(() => {
      getProducts();
   }, [getProducts]);

   return (
      <div className='flex min-h-screen flex-col'>
         <Header />

         {/* Page content */}
         <div className='container mx-auto flex-grow px-4 py-8'>
            <div className='mb-6 flex items-center justify-between'>
               {/* <h1 className="text-2xl font-bold">
            {filters.category
              ? products
                  .find((p) => p.category === filters.category)
                  ?.category?.replace(/-/g, " ")
              : "All Products"}
          </h1> */}
               <div className='flex items-center gap-4'>
                  {/* <Button
              variant="outline"
              className="md:hidden flex items-center gap-2"
              onClick={toggleFilters}
            >
              <SlidersHorizontal size={16} />
              Filters
            </Button> */}
                  {/* <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 hidden sm:inline">
                Sort by:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
               </div>
            </div>

            <div className='flex flex-col gap-8 md:flex-row'>
               {/* Filters */}
               {/* <FilterSidebar
            filters={filters}
            priceLimit={[minPrice, maxPrice]}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            className={`md:w-64 flex-shrink-0 ${
              showFilters ? 'block' : 'hidden md:block'
            }`}
          /> */}

               {/* Products */}
               <div className='flex-grow'>
                  {/* {showFilters && (
              <div className="mb-4 md:hidden">
                <Button onClick={toggleFilters} variant="outline" className="w-full">
                  Hide Filters
                </Button>
              </div>
            )} */}

                  <div className='mb-4 flex items-center justify-between'>
                     <p className='text-gray-600'>
                        {dataProducts.length}{' '}
                        {dataProducts.length === 1 ? 'product' : 'products'}{' '}
                        found
                     </p>
                  </div>

                  {productsLoading ? (
                     <div className='flex min-h-[300px] items-center justify-center'>
                        <Spin size='large' />
                     </div>
                  ) : (
                     <ProductGrid products={dataProducts} />
                  )}
               </div>
            </div>
         </div>

         <Footer />
      </div>
   );
};

export default ProductsPage;
