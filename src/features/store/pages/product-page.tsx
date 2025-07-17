import { useEffect, useState } from 'react';

import { Input, Select, Spin } from 'antd';

import { api } from '@/shared/lib';

// import FilterSidebar from "@/features/store/components/FilterSidebar";
// import { products } from "@/data/products";
// import { useFilter, sortOptions } from "@/hooks/useFilter";

// import onAxios from "../../Utils/HelperFunction.js";
// import { useSearchParams } from "react-router-dom";
// import { SlidersHorizontal } from "lucide-react";
// import { Button } from "@/features/store/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/features/store/components/ui/select";
import ProductGrid from '@/features/store/components/product-grid';
import { useStore } from '@/features/store/hooks/use-store';

const { Option } = Select;

const ProductsPage = () => {
   // const [searchParams, setSearchParams] = useSearchParams();
   // const [showFilters, setShowFilters] = useState(false);
   // const [dataProducts, setDataProducts] = useState([]);
   const { dataProducts, getProducts, productsLoading } = useStore();
   const [categories, setCategories] = useState<{ id: number; name: string }[]>(
      []
   );
   const [search, setSearch] = useState<string>('');
   const [minPrice, setMinPrice] = useState<number | null>(null);
   const [maxPrice, setMaxPrice] = useState<number | null>(null);
   const [categoryId, setCategoryId] = useState<number | null>(null);
   const [sortBy, setSortBy] = useState<string>('price');
   const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

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
      api.get('e-commerce/categories')
         .then((res) => {
            setCategories(res.data?.data || []);
         })
         .catch((err) => {
            console.error('Failed to fetch categories', err);
         });
   }, []);

   useEffect(() => {
      const params = new URLSearchParams();

      if (search) params.set('search', search);
      if (minPrice) params.set('min_price', String(minPrice));
      if (maxPrice) params.set('max_price', String(maxPrice));
      if (categoryId) params.set('category_id', String(categoryId));
      if (sortBy) params.set('sort_by', sortBy);
      if (sortDir) params.set('sort_dir', sortDir);

      getProducts(params.toString());
   }, [search, minPrice, maxPrice, categoryId, sortBy, sortDir, getProducts]);

   return (
      <div className='flex min-h-screen flex-col'>
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
                  <div className='mb-6 flex flex-wrap items-center gap-4'>
                     {/* Search */}
                     <Input.Search
                        placeholder='Search products...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSearch={(value) => setSearch(value)}
                        allowClear
                        style={{ maxWidth: 200 }}
                     />

                     {/* Category Select */}
                     <Select
                        placeholder='Select Category'
                        style={{ width: 200 }}
                        onChange={(value) => setCategoryId(value)}
                        allowClear
                        value={categoryId ?? undefined}
                     >
                        {categories.map((cat) => (
                           <Select.Option key={cat.id} value={cat.id}>
                              {cat.name}
                           </Select.Option>
                        ))}
                     </Select>

                     {/* Price Range */}
                     <Input
                        type='number'
                        placeholder='Min Price'
                        style={{ width: 120 }}
                        value={minPrice ?? ''}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                     />
                     <Input
                        type='number'
                        placeholder='Max Price'
                        style={{ width: 120 }}
                        value={maxPrice ?? ''}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                     />

                     {/* Sort By */}
                     <Select
                        defaultValue='price'
                        style={{ width: 180 }}
                        onChange={(value) => setSortBy(value)}
                     >
                        <Option value='price'>Sort by Price</Option>
                        {/* <Option value='name'>Sort by Name</Option>
                        <Option value='created_at'>Newest</Option> */}
                     </Select>

                     {/* Sort Direction */}
                     <Select
                        defaultValue='desc'
                        style={{ width: 180 }}
                        onChange={(value) =>
                           setSortDir(value as 'asc' | 'desc')
                        }
                     >
                        <Option value='desc'>High to Low</Option>
                        <Option value='asc'>Low to High</Option>
                     </Select>
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
      </div>
   );
};

export default ProductsPage;
