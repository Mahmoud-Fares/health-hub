import { useMemo, useState } from 'react';

import { videos } from '@/features/landing/components/workout/data/videos';
import FilterTabs from '@/features/landing/components/workout/filter-tabs';
import Filters from '@/features/landing/components/workout/filters';
import { useProgress } from '@/features/landing/components/workout/hooks/use-progress';
import StatsCards from '@/features/landing/components/workout/stats-cards';
import {
   CategoryFilter,
   DifficultyFilter,
   FilterTab,
} from '@/features/landing/components/workout/types/index';
import VideoCard from '@/features/landing/components/workout/video-card';
import VideoDetail from '@/features/landing/components/workout/video-detail';

function WorkoutVideosPage() {
   const { progress, markCompleted, markInProgress, toggleFavorite } =
      useProgress();
   const [activeTab, setActiveTab] = useState<FilterTab>('all');
   const [difficultyFilter, setDifficultyFilter] =
      useState<DifficultyFilter>('all');
   const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
   const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

   // Get all unique categories
   const allCategories = useMemo(() => {
      const categories = new Set<string>();
      videos.forEach((video) => {
         video.categories.forEach((category) => categories.add(category));
      });
      return Array.from(categories).sort();
   }, []);

   // Filter videos based on current filters
   const filteredVideos = useMemo(() => {
      let filtered = videos;

      // Filter by tab
      switch (activeTab) {
         case 'favorites':
            filtered = filtered.filter((video) =>
               progress.favoriteVideos.includes(video.id)
            );
            break;
         case 'completed':
            filtered = filtered.filter((video) =>
               progress.completedVideos.includes(video.id)
            );
            break;
         case 'inProgress':
            filtered = filtered.filter((video) =>
               progress.inProgressVideos.includes(video.id)
            );
            break;
      }

      // Filter by difficulty
      if (difficultyFilter !== 'all') {
         filtered = filtered.filter(
            (video) => video.difficulty === difficultyFilter
         );
      }

      // Filter by category
      if (categoryFilter !== 'all') {
         filtered = filtered.filter((video) =>
            video.categories.includes(categoryFilter)
         );
      }

      return filtered;
   }, [activeTab, difficultyFilter, categoryFilter, progress]);

   // Calculate counts for tabs
   const tabCounts = useMemo(
      () => ({
         all: videos.length,
         favorites: progress.favoriteVideos.length,
         completed: progress.completedVideos.length,
         inProgress: progress.inProgressVideos.length,
      }),
      [progress]
   );

   const selectedVideo = selectedVideoId
      ? videos.find((v) => v.id === selectedVideoId)
      : null;

   if (selectedVideo) {
      return (
         <VideoDetail
            video={selectedVideo}
            progress={progress}
            onBack={() => setSelectedVideoId(null)}
            onToggleFavorite={toggleFavorite}
            onMarkCompleted={markCompleted}
            onMarkInProgress={markInProgress}
         />
      );
   }

   return (
      <div className='min-h-screen bg-gray-50'>
         <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
            <StatsCards progress={progress} />

            <Filters
               difficultyFilter={difficultyFilter}
               categoryFilter={categoryFilter}
               onDifficultyChange={setDifficultyFilter}
               onCategoryChange={setCategoryFilter}
               availableCategories={allCategories}
            />

            <FilterTabs
               activeTab={activeTab}
               onTabChange={setActiveTab}
               counts={tabCounts}
            />

            {filteredVideos.length === 0 ? (
               <div className='py-12 text-center'>
                  <p className='text-lg text-gray-500'>
                     No videos found matching your filters.
                  </p>
                  <p className='mt-2 text-gray-400'>
                     Try adjusting your search criteria.
                  </p>
               </div>
            ) : (
               <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                  {filteredVideos.map((video) => (
                     <VideoCard
                        key={video.id}
                        video={video}
                        progress={progress}
                        onToggleFavorite={toggleFavorite}
                        onVideoClick={setSelectedVideoId}
                     />
                  ))}
               </div>
            )}
         </main>
      </div>
   );
}

export default WorkoutVideosPage;
