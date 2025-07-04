import React from 'react';

import { FilterTab } from '@/features/landing/components/workout/types';

interface FilterTabsProps {
   activeTab: FilterTab;
   onTabChange: (tab: FilterTab) => void;
   counts: {
      all: number;
      favorites: number;
      completed: number;
      inProgress: number;
   };
}

const FilterTabs: React.FC<FilterTabsProps> = ({
   activeTab,
   onTabChange,
   counts,
}) => {
   const tabs = [
      { id: 'all' as FilterTab, label: 'All Videos', count: counts.all },
      {
         id: 'favorites' as FilterTab,
         label: 'Favorites',
         count: counts.favorites,
      },
      {
         id: 'completed' as FilterTab,
         label: 'Completed',
         count: counts.completed,
      },
      {
         id: 'inProgress' as FilterTab,
         label: 'In Progress',
         count: counts.inProgress,
      },
   ];

   return (
      <div className='mb-6 flex flex-wrap gap-1 overflow-x-auto rounded-lg bg-gray-100 p-1'>
         {tabs.map((tab) => (
            <button
               key={tab.id}
               onClick={() => onTabChange(tab.id)}
               className={`flex flex-1 items-center rounded-md px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                     ? 'bg-white text-gray-900 shadow-sm'
                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
               }`}
            >
               {tab.label}
               {tab.count > 0 && (
                  <span
                     className={`ml-2 rounded-full px-2 py-1 text-xs ${
                        activeTab === tab.id
                           ? 'bg-blue-100 text-blue-600'
                           : 'bg-gray-200 text-gray-600'
                     }`}
                  >
                     {tab.count}
                  </span>
               )}
            </button>
         ))}
      </div>
   );
};

export default FilterTabs;
