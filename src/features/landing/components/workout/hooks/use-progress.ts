import { useEffect, useState } from 'react';

import { UserProgress } from '../types';

const STORAGE_KEY = 'workout-progress';

const defaultProgress: UserProgress = {
   completedVideos: [],
   favoriteVideos: [],
   inProgressVideos: [],
   totalCaloriesBurned: 0,
   totalTimeCompleted: 0,
};

export const useProgress = () => {
   const [progress, setProgress] = useState<UserProgress>(defaultProgress);

   useEffect(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
         setProgress(JSON.parse(stored));
      }
   }, []);

   const saveProgress = (newProgress: UserProgress) => {
      setProgress(newProgress);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
   };

   const markCompleted = (
      videoId: string,
      calories: number,
      duration: number
   ) => {
      const newProgress = {
         ...progress,
         completedVideos: [...new Set([...progress.completedVideos, videoId])],
         inProgressVideos: progress.inProgressVideos.filter(
            (id) => id !== videoId
         ),
         totalCaloriesBurned: progress.totalCaloriesBurned + calories,
         totalTimeCompleted: progress.totalTimeCompleted + duration,
      };
      saveProgress(newProgress);
   };

   const markInProgress = (videoId: string) => {
      if (
         !progress.completedVideos.includes(videoId) &&
         !progress.inProgressVideos.includes(videoId)
      ) {
         const newProgress = {
            ...progress,
            inProgressVideos: [...progress.inProgressVideos, videoId],
         };
         saveProgress(newProgress);
      }
   };

   const toggleFavorite = (videoId: string) => {
      const isFavorite = progress.favoriteVideos.includes(videoId);
      const newProgress = {
         ...progress,
         favoriteVideos: isFavorite
            ? progress.favoriteVideos.filter((id) => id !== videoId)
            : [...progress.favoriteVideos, videoId],
      };
      saveProgress(newProgress);
   };

   return {
      progress,
      markCompleted,
      markInProgress,
      toggleFavorite,
   };
};
