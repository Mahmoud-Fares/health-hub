import React from 'react';

import { CheckCircle, Clock, Flame, Heart, Play, Star } from 'lucide-react';

import {
   UserProgress,
   Video,
} from '@/features/landing/components/workout/types';

interface VideoCardProps {
   video: Video;
   progress: UserProgress;
   onToggleFavorite: (videoId: string) => void;
   onVideoClick: (videoId: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
   video,
   progress,
   onToggleFavorite,
   onVideoClick,
}) => {
   const isCompleted = progress.completedVideos.includes(video.id);
   const isFavorite = progress.favoriteVideos.includes(video.id);
   const isInProgress = progress.inProgressVideos.includes(video.id);

   const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
         case 'Beginner':
            return 'bg-green-100 text-green-700';
         case 'Intermediate':
            return 'bg-yellow-100 text-yellow-700';
         case 'Advanced':
            return 'bg-red-100 text-red-700';
         default:
            return 'bg-gray-100 text-gray-700';
      }
   };

   return (
      <div className='group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg'>
         <div
            className='relative cursor-pointer'
            onClick={() => onVideoClick(video.id)}
         >
            <img
               src={video.thumbnailUrl}
               alt={video.title}
               className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30'>
               <Play className='h-12 w-12 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </div>

            {/* Status badges */}
            <div className='absolute left-3 top-3 flex space-x-2'>
               {isCompleted && (
                  <div className='flex items-center rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white'>
                     <CheckCircle className='mr-1 h-3 w-3' />
                     Completed
                  </div>
               )}
               {isInProgress && !isCompleted && (
                  <div className='rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white'>
                     In Progress
                  </div>
               )}
            </div>

            <button
               onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(video.id);
               }}
               className='absolute right-3 top-3 rounded-full bg-white bg-opacity-90 p-2 transition-all duration-200 hover:bg-opacity-100'
            >
               <Heart
                  className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
               />
            </button>
         </div>

         <div className='p-6'>
            <div className='mb-2 flex items-center justify-between'>
               <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(video.difficulty)}`}
               >
                  {video.difficulty}
               </span>
               <div className='flex items-center space-x-1'>
                  <Star className='h-4 w-4 fill-current text-yellow-400' />
                  <span className='text-sm text-gray-600'>{video.rating}</span>
               </div>
            </div>

            <h3
               className='mb-2 cursor-pointer text-lg font-semibold text-gray-900 transition-colors hover:text-blue-600'
               onClick={() => onVideoClick(video.id)}
            >
               {video.title}
            </h3>

            <p className='mb-4 line-clamp-2 text-sm text-gray-600'>
               {video.description}
            </p>

            <div className='mb-4 flex items-center justify-between text-sm text-gray-500'>
               <div className='flex items-center space-x-1'>
                  <Clock className='h-4 w-4' />
                  <span>{video.duration} min</span>
               </div>
               <div className='flex items-center space-x-1'>
                  <Flame className='h-4 w-4' />
                  <span>{video.calories} cal</span>
               </div>
            </div>

            <div className='flex items-center space-x-3'>
               <img
                  src={video.trainer.image}
                  alt={video.trainer.name}
                  className='h-8 w-8 rounded-full object-cover'
               />
               <div>
                  <p className='text-sm font-medium text-gray-900'>
                     {video.trainer.name}
                  </p>
                  <p className='text-xs text-gray-500'>{video.trainer.title}</p>
               </div>
            </div>

            <div className='mt-4 flex flex-wrap gap-1'>
               {video.categories.slice(0, 3).map((category, index) => (
                  <span
                     key={index}
                     className='rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600'
                  >
                     {category}
                  </span>
               ))}
               {video.categories.length > 3 && (
                  <span className='rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600'>
                     +{video.categories.length - 3}
                  </span>
               )}
            </div>
         </div>
      </div>
   );
};

export default VideoCard;
