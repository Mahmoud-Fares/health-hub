import React, { useState } from 'react';

import {
   ArrowLeft,
   CheckCircle,
   Clock,
   Dumbbell,
   Flame,
   Heart,
   Star,
   Users,
} from 'lucide-react';

import { UserProgress, Video } from './types/index';
import VideoPlayer from './video-player';

interface VideoDetailProps {
   video: Video;
   progress: UserProgress;
   onBack: () => void;
   onToggleFavorite: (videoId: string) => void;
   onMarkCompleted: (
      videoId: string,
      calories: number,
      duration: number
   ) => void;
   onMarkInProgress: (videoId: string) => void;
}

const VideoDetail: React.FC<VideoDetailProps> = ({
   video,
   progress,
   onBack,
   onToggleFavorite,
   onMarkCompleted,
   onMarkInProgress,
}) => {
   const [videoProgress, setVideoProgress] = useState(0);
   const isCompleted = progress.completedVideos.includes(video.id);
   const isFavorite = progress.favoriteVideos.includes(video.id);

   const handleVideoProgress = (progress: number) => {
      setVideoProgress(progress);
      if (progress > 10) {
         // Mark in progress after 10% watched
         onMarkInProgress(video.id);
      }
   };

   const handleVideoComplete = () => {
      if (!isCompleted) {
         onMarkCompleted(video.id, video.calories, video.duration);
      }
   };

   const handleManualComplete = () => {
      onMarkCompleted(video.id, video.calories, video.duration);
   };

   const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
         case 'Beginner':
            return 'bg-green-100 text-green-700 border-green-200';
         case 'Intermediate':
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
         case 'Advanced':
            return 'bg-red-100 text-red-700 border-red-200';
         default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
      }
   };

   return (
      <div className='pb-18 min-h-screen bg-gray-50 pt-20'>
         <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
            {/* Header */}
            <div className='mb-8 flex items-center justify-between'>
               <button
                  onClick={onBack}
                  className='flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900'
               >
                  <ArrowLeft className='h-5 w-5' />
                  <span>Back to Videos</span>
               </button>

               <div className='flex items-center space-x-3'>
                  <button
                     onClick={() => onToggleFavorite(video.id)}
                     className={`flex items-center space-x-2 rounded-lg border px-4 py-2 transition-colors ${
                        isFavorite
                           ? 'border-red-200 bg-red-50 text-red-700'
                           : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                     }`}
                  >
                     <Heart
                        className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`}
                     />
                     <span>
                        {isFavorite
                           ? 'Remove from Favorites'
                           : 'Add to Favorites'}
                     </span>
                  </button>

                  {!isCompleted && (
                     <button
                        onClick={handleManualComplete}
                        className='flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700'
                     >
                        <CheckCircle className='h-4 w-4' />
                        <span>Mark Complete</span>
                     </button>
                  )}
               </div>
            </div>

            <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
               {/* Video Player */}
               <div className='lg:col-span-2'>
                  <VideoPlayer
                     videoUrl={video.videoUrl}
                     onProgress={handleVideoProgress}
                     onComplete={handleVideoComplete}
                  />

                  {/* Video Info */}
                  <div className='mt-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
                     <div className='mb-4 flex items-start justify-between'>
                        <div className='flex-1'>
                           <div className='mb-2 flex items-center space-x-3'>
                              <span
                                 className={`rounded-full border px-3 py-1 text-sm font-medium ${getDifficultyColor(video.difficulty)}`}
                              >
                                 {video.difficulty}
                              </span>
                              {isCompleted && (
                                 <span className='flex items-center space-x-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700'>
                                    <CheckCircle className='h-4 w-4' />
                                    <span>Completed</span>
                                 </span>
                              )}
                              <div className='flex items-center space-x-1'>
                                 <Star className='h-4 w-4 fill-current text-yellow-400' />
                                 <span className='text-sm text-gray-600'>
                                    {video.rating}
                                 </span>
                              </div>
                           </div>
                           <h1 className='mb-2 text-2xl font-bold text-gray-900'>
                              {video.title}
                           </h1>
                           <p className='text-gray-600'>{video.description}</p>
                        </div>
                     </div>

                     {/* Stats */}
                     <div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-4'>
                        <div className='rounded-lg bg-gray-50 p-3 text-center'>
                           <Clock className='mx-auto mb-1 h-5 w-5 text-blue-600' />
                           <p className='text-sm text-gray-600'>Duration</p>
                           <p className='font-semibold'>{video.duration} min</p>
                        </div>
                        <div className='rounded-lg bg-gray-50 p-3 text-center'>
                           <Flame className='mx-auto mb-1 h-5 w-5 text-orange-600' />
                           <p className='text-sm text-gray-600'>Calories</p>
                           <p className='font-semibold'>{video.calories}</p>
                        </div>
                        <div className='rounded-lg bg-gray-50 p-3 text-center'>
                           <Users className='mx-auto mb-1 h-5 w-5 text-purple-600' />
                           <p className='text-sm text-gray-600'>Level</p>
                           <p className='font-semibold'>{video.difficulty}</p>
                        </div>
                        <div className='rounded-lg bg-gray-50 p-3 text-center'>
                           <Star className='mx-auto mb-1 h-5 w-5 text-yellow-600' />
                           <p className='text-sm text-gray-600'>Rating</p>
                           <p className='font-semibold'>{video.rating}</p>
                        </div>
                     </div>

                     {/* Categories */}
                     <div className='mb-6'>
                        <h3 className='mb-2 text-sm font-medium text-gray-700'>
                           Categories
                        </h3>
                        <div className='flex flex-wrap gap-2'>
                           {video.categories.map((category, index) => (
                              <span
                                 key={index}
                                 className='rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700'
                              >
                                 {category}
                              </span>
                           ))}
                        </div>
                     </div>

                     {/* Equipment */}
                     <div>
                        <h3 className='mb-2 flex items-center text-sm font-medium text-gray-700'>
                           <Dumbbell className='mr-1 h-4 w-4' />
                           Equipment Needed
                        </h3>
                        <div className='flex flex-wrap gap-2'>
                           {video.equipment.map((item, index) => (
                              <span
                                 key={index}
                                 className='rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700'
                              >
                                 {item}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Sidebar */}
               <div className='space-y-6'>
                  {/* Trainer Info */}
                  <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
                     <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                        Your Trainer
                     </h3>
                     <div className='mb-4 flex items-center space-x-4'>
                        <img
                           src={video.trainer.image}
                           alt={video.trainer.name}
                           className='h-16 w-16 rounded-full object-cover'
                        />
                        <div>
                           <h4 className='font-semibold text-gray-900'>
                              {video.trainer.name}
                           </h4>
                           <p className='text-sm text-blue-600'>
                              {video.trainer.title}
                           </p>
                           <p className='text-xs text-gray-500'>
                              {video.trainer.experience}
                           </p>
                        </div>
                     </div>
                     <p className='text-sm text-gray-600'>
                        {video.trainer.description}
                     </p>
                  </div>

                  {/* Progress */}
                  <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
                     <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                        Your Progress
                     </h3>
                     <div className='space-y-3'>
                        <div>
                           <div className='mb-1 flex justify-between text-sm text-gray-600'>
                              <span>Workouts Completed</span>
                              <span>{progress.completedVideos.length}</span>
                           </div>
                        </div>
                        <div>
                           <div className='mb-1 flex justify-between text-sm text-gray-600'>
                              <span>Total Time</span>
                              <span>{progress.totalTimeCompleted} min</span>
                           </div>
                        </div>
                        <div>
                           <div className='mb-1 flex justify-between text-sm text-gray-600'>
                              <span>Calories Burned</span>
                              <span>
                                 {progress.totalCaloriesBurned.toLocaleString()}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Video Progress */}
                  <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
                     <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                        Video Progress
                     </h3>
                     <div className='mb-2 h-2 w-full rounded-full bg-gray-200'>
                        <div
                           className='h-2 rounded-full bg-blue-600 transition-all duration-300'
                           style={{ width: `${Math.min(videoProgress, 100)}%` }}
                        ></div>
                     </div>
                     <p className='text-sm text-gray-600'>
                        {Math.round(videoProgress)}% completed
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default VideoDetail;
