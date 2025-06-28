import { useCallback, useEffect, useState } from 'react';

import { Product } from '@/features/store/data/products';

interface FilterState {
   category: string | null;
   brand: string[];
   priceRange: [number, number];
   rating: number | null;
   inStock: boolean;
}

interface SortOption {
   id: string;
   name: string;
}

export const sortOptions: SortOption[] = [
   { id: 'featured', name: 'Featured' },
   { id: 'price-asc', name: 'Price: Low to High' },
   { id: 'price-desc', name: 'Price: High to Low' },
   { id: 'rating-desc', name: 'Highest Rated' },
   { id: 'newest', name: 'Newest' },
];

export const useFilter = (initialProducts: Product[]) => {
   const [filteredProducts, setFilteredProducts] =
      useState<Product[]>(initialProducts);
   const [filters, setFilters] = useState<FilterState>({
      category: null,
      brand: [],
      priceRange: [0, 2000],
      rating: null,
      inStock: false,
   });
   const [sortBy, setSortBy] = useState<string>('featured');
   const [searchQuery, setSearchQuery] = useState<string>('');

   // Get price range from products
   const minPrice = Math.min(...initialProducts.map((p) => p.price));
   const maxPrice = Math.max(...initialProducts.map((p) => p.price));

   // Reset filters
   const resetFilters = useCallback(() => {
      setFilters({
         category: null,
         brand: [],
         priceRange: [minPrice, maxPrice],
         rating: null,
         inStock: false,
      });
      setSortBy('featured');
      setSearchQuery('');
   }, [minPrice, maxPrice]);

   // Update a single filter
   const updateFilter = useCallback(
      (filterKey: keyof FilterState, value: any) => {
         setFilters((prev) => ({
            ...prev,
            [filterKey]: value,
         }));
      },
      []
   );

   // Apply filters and sorting
   useEffect(() => {
      let result = [...initialProducts];

      // Apply search query
      if (searchQuery) {
         const query = searchQuery.toLowerCase();
         result = result.filter(
            (product) =>
               product.name.toLowerCase().includes(query) ||
               product.description.toLowerCase().includes(query) ||
               product.brand.toLowerCase().includes(query) ||
               product.category.toLowerCase().includes(query)
         );
      }

      // Apply category filter
      if (filters.category) {
         result = result.filter(
            (product) => product.category === filters.category
         );
      }

      // Apply brand filter
      if (filters.brand.length > 0) {
         result = result.filter((product) =>
            filters.brand.includes(product.brand)
         );
      }

      // Apply price range filter
      const [minPrice, maxPrice] = filters.priceRange;
      result = result.filter(
         (product) => product.price >= minPrice && product.price <= maxPrice
      );

      // Apply rating filter
      if (filters.rating) {
         result = result.filter((product) => product.rating >= filters.rating!);
      }

      // Apply in stock filter
      if (filters.inStock) {
         result = result.filter((product) => product.inStock);
      }

      // Apply sorting
      switch (sortBy) {
         case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
         case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
         case 'rating-desc':
            result.sort((a, b) => b.rating - a.rating);
            break;
         case 'newest':
            // Assuming "new" products should come first
            result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
            break;
         case 'featured':
         default:
            // Featured products (bestsellers) come first
            result.sort(
               (a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0)
            );
            break;
      }

      setFilteredProducts(result);
   }, [initialProducts, filters, sortBy, searchQuery]);

   return {
      filteredProducts,
      filters,
      updateFilter,
      resetFilters,
      sortBy,
      setSortBy,
      sortOptions,
      searchQuery,
      setSearchQuery,
   };
};
