export interface Video {
   id: string;
   title: string;
   description: string;
   duration: number; // in minutes
   calories: number;
   difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
   categories: string[];
   thumbnailUrl: string;
   videoUrl: string;
   trainer: Trainer;
   rating: number;
   equipment: string[];
}

export interface Trainer {
   name: string;
   title: string;
   description: string;
   image: string;
   experience: string;
}

export interface UserProgress {
   completedVideos: string[];
   favoriteVideos: string[];
   inProgressVideos: string[];
   totalCaloriesBurned: number;
   totalTimeCompleted: number; // in minutes
}

export type FilterTab = 'all' | 'favorites' | 'completed' | 'inProgress';
export type DifficultyFilter = 'all' | 'Beginner' | 'Intermediate' | 'Advanced';
export type CategoryFilter = 'all' | string;
