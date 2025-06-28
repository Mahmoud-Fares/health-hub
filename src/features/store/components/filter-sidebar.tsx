import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';

import { Checkbox } from '@/features/store/components/ui/checkbox';
import { Slider } from '@/features/store/components/ui/slider';
import { brands, productCategories } from '@/features/store/data/products';

interface FilterSidebarProps {
   filters: {
      category: string | null;
      brand: string[];
      priceRange: [number, number];
      rating: number | null;
      inStock: boolean;
   };
   priceLimit: [number, number];
   updateFilter: (key: string, value: any) => void;
   resetFilters: () => void;
   className?: string;
}

const FilterSidebar = ({
   filters,
   priceLimit,
   updateFilter,
   resetFilters,
   className = '',
}: FilterSidebarProps) => {
   const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>(
      filters.priceRange
   );

   // Update price range with debounce
   const handlePriceChange = (value: number[]) => {
      setCurrentPriceRange([value[0], value[1]]);

      // Debounce the actual filter update
      const timer = setTimeout(() => {
         updateFilter('priceRange', [value[0], value[1]]);
      }, 300);

      return () => clearTimeout(timer);
   };

   // Handle category selection
   const handleCategoryChange = (categoryId: string) => {
      updateFilter(
         'category',
         filters.category === categoryId ? null : categoryId
      );
   };

   // Handle brand selection
   const handleBrandChange = (brandName: string) => {
      const updatedBrands = filters.brand.includes(brandName)
         ? filters.brand.filter((b) => b !== brandName)
         : [...filters.brand, brandName];

      updateFilter('brand', updatedBrands);
   };

   // Handle rating filter
   const handleRatingChange = (rating: number) => {
      updateFilter('rating', filters.rating === rating ? null : rating);
   };

   // Handle in-stock filter
   const handleInStockChange = () => {
      updateFilter('inStock', !filters.inStock);
   };

   return (
      <aside className={`space-y-6 ${className}`}>
         <div className='flex items-center justify-between'>
            <h3 className='text-lg font-medium'>Filters</h3>
            <Button
               variant='link'
               onClick={resetFilters}
               className='p-0 text-sm text-brand-blue'
            >
               Reset All
            </Button>
         </div>

         {/* Categories */}
         <div>
            <h4 className='text-md mb-2 font-medium'>Category</h4>
            <div className='space-y-2'>
               {productCategories.map((category) => (
                  <div key={category.id} className='flex items-center'>
                     <Checkbox
                        id={`category-${category.id}`}
                        checked={filters.category === category.id}
                        onCheckedChange={() =>
                           handleCategoryChange(category.id)
                        }
                     />
                     <label
                        htmlFor={`category-${category.id}`}
                        className='ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                     >
                        {category.name}
                     </label>
                  </div>
               ))}
            </div>
         </div>

         {/* Brands */}
         <div>
            <h4 className='text-md mb-2 font-medium'>Brand</h4>
            <div className='space-y-2'>
               {brands.map((brand) => (
                  <div key={brand.id} className='flex items-center'>
                     <Checkbox
                        id={`brand-${brand.id}`}
                        checked={filters.brand.includes(brand.name)}
                        onCheckedChange={() => handleBrandChange(brand.name)}
                     />
                     <label
                        htmlFor={`brand-${brand.id}`}
                        className='ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                     >
                        {brand.name}
                     </label>
                  </div>
               ))}
            </div>
         </div>

         {/* Price Range */}
         <div>
            <h4 className='text-md mb-4 font-medium'>Price Range</h4>
            <Slider
               defaultValue={[priceLimit[0], priceLimit[1]]}
               value={[currentPriceRange[0], currentPriceRange[1]]}
               min={priceLimit[0]}
               max={priceLimit[1]}
               step={10}
               onValueChange={handlePriceChange}
               className='mb-6'
            />
            <div className='flex items-center justify-between'>
               <span className='text-sm'>EGP {currentPriceRange[0]}</span>
               <span className='text-sm'>EGP {currentPriceRange[1]}</span>
            </div>
         </div>

         {/* In Stock */}
         <div className='flex items-center'>
            <Checkbox
               id='in-stock'
               checked={filters.inStock}
               onCheckedChange={handleInStockChange}
            />
            <label
               htmlFor='in-stock'
               className='ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
               In Stock Only
            </label>
         </div>
      </aside>
   );
};

export default FilterSidebar;
