import React from 'react';

import { Filter } from 'lucide-react';

import {
   CategoryFilter,
   DifficultyFilter,
} from '@/features/landing/components/workout/types';

interface FiltersProps {
   difficultyFilter: DifficultyFilter;
   categoryFilter: CategoryFilter;
   onDifficultyChange: (difficulty: DifficultyFilter) => void;
   onCategoryChange: (category: CategoryFilter) => void;
   availableCategories: string[];
}

const Filters: React.FC<FiltersProps> = ({
   difficultyFilter,
   categoryFilter,
   onDifficultyChange,
   onCategoryChange,
   availableCategories,
}) => {
   const difficulties: DifficultyFilter[] = [
      'all',
      'Beginner',
      'Intermediate',
      'Advanced',
   ];

   return (
      <div className='mb-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
         <div className='mb-4 flex items-center space-x-2'>
            <Filter className='h-5 w-5 text-gray-600' />
            <h3 className='text-lg font-semibold text-gray-900'>Filters</h3>
         </div>

         <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
               <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Difficulty
               </label>
               <select
                  value={difficultyFilter}
                  onChange={(e) =>
                     onDifficultyChange(e.target.value as DifficultyFilter)
                  }
                  className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
               >
                  <option value='all'>All Levels</option>
                  {difficulties.slice(1).map((difficulty) => (
                     <option key={difficulty} value={difficulty}>
                        {difficulty}
                     </option>
                  ))}
               </select>
            </div>

            <div>
               <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Category
               </label>
               <select
                  value={categoryFilter}
                  onChange={(e) =>
                     onCategoryChange(e.target.value as CategoryFilter)
                  }
                  className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
               >
                  <option value='all'>All Categories</option>
                  {availableCategories.map((category) => (
                     <option key={category} value={category}>
                        {category}
                     </option>
                  ))}
               </select>
            </div>
         </div>
      </div>
   );
};

export default Filters;
