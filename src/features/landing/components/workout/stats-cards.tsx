import React from 'react';

import { Clock, Flame, Heart, Trophy } from 'lucide-react';

import { UserProgress } from '@/features/landing/components/workout/types';

interface StatsCardsProps {
   progress: UserProgress;
}

const StatsCards: React.FC<StatsCardsProps> = ({ progress }) => {
   const stats = [
      {
         title: 'Workouts Completed',
         value: progress.completedVideos.length,
         icon: Trophy,
         color: 'from-green-500 to-emerald-600',
         bgColor: 'bg-green-50',
         textColor: 'text-green-700',
      },
      {
         title: 'Total Time',
         value: `${progress.totalTimeCompleted} min`,
         icon: Clock,
         color: 'from-blue-500 to-cyan-600',
         bgColor: 'bg-blue-50',
         textColor: 'text-blue-700',
      },
      {
         title: 'Calories Burned',
         value: progress.totalCaloriesBurned.toLocaleString(),
         icon: Flame,
         color: 'from-orange-500 to-red-600',
         bgColor: 'bg-orange-50',
         textColor: 'text-orange-700',
      },
      {
         title: 'Favorite Videos',
         value: progress.favoriteVideos.length,
         icon: Heart,
         color: 'from-pink-500 to-rose-600',
         bgColor: 'bg-pink-50',
         textColor: 'text-pink-700',
      },
   ];

   return (
      <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
         {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
               <div
                  key={index}
                  className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md'
               >
                  <div className='flex items-center justify-between'>
                     <div>
                        <p className='mb-1 text-sm font-medium text-gray-600'>
                           {stat.title}
                        </p>
                        <p className='text-2xl font-bold text-gray-900'>
                           {stat.value}
                        </p>
                     </div>
                     <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                        <Icon className={`h-6 w-6 ${stat.textColor}`} />
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
};

export default StatsCards;
