import { Video, Trainer } from '../types';

const sarahJohnson: Trainer = {
  name: "Sarah Johnson",
  title: "Certified Trainer",
  description: "Professional fitness instructor with over 10 years of experience helping people achieve their health goals.",
  image: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400",
  experience: "10+ years"
};

const mikeWilson: Trainer = {
  name: "Mike Wilson",
  title: "Strength Coach",
  description: "Former Olympic athlete specializing in strength training and athletic performance.",
  image: "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400",
  experience: "8+ years"
};

const emmaGarcia: Trainer = {
  name: "Emma Garcia",
  title: "Yoga & Wellness Expert",
  description: "Certified yoga instructor and wellness coach focused on mindful movement and flexibility.",
  image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=400",
  experience: "6+ years"
};

export const videos: Video[] = [
  {
    id: '1',
    title: 'Full Body HIIT Workout - 30 Minutes',
    description: 'High-intensity interval training targeting all major muscle groups. Perfect for burning calories and building strength.',
    duration: 30,
    calories: 350,
    difficulty: 'Intermediate',
    categories: ['Full Body', 'HIIT', 'Strength', 'Cardio'],
    thumbnailUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trainer: sarahJohnson,
    rating: 4.8,
    equipment: ['Dumbbells', 'Mat']
  },
  {
    id: '2',
    title: 'Morning Yoga Flow - 20 Minutes',
    description: 'Start your day with this energizing yoga flow that awakens your body and mind.',
    duration: 20,
    calories: 120,
    difficulty: 'Beginner',
    categories: ['Yoga', 'Flexibility', 'Mindfulness'],
    thumbnailUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trainer: emmaGarcia,
    rating: 4.9,
    equipment: ['Mat']
  },
  {
    id: '3',
    title: 'Upper Body Strength Training - 45 Minutes',
    description: 'Build serious upper body strength with this comprehensive workout targeting chest, back, and arms.',
    duration: 45,
    calories: 400,
    difficulty: 'Advanced',
    categories: ['Upper Body', 'Strength', 'Muscle Building'],
    thumbnailUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    trainer: mikeWilson,
    rating: 4.7,
    equipment: ['Dumbbells', 'Pull-up Bar', 'Bench']
  },
  {
    id: '4',
    title: 'Cardio Dance Fitness - 25 Minutes',
    description: 'Fun and energetic dance workout that gets your heart pumping while you learn new moves.',
    duration: 25,
    calories: 280,
    difficulty: 'Beginner',
    categories: ['Cardio', 'Dance', 'Fun'],
    thumbnailUrl: 'https://images.pexels.com/photos/3768722/pexels-photo-3768722.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    trainer: sarahJohnson,
    rating: 4.6,
    equipment: ['None']
  },
  {
    id: '5',
    title: 'Core Blast - 15 Minutes',
    description: 'Intense core workout targeting abs, obliques, and lower back for a strong midsection.',
    duration: 15,
    calories: 150,
    difficulty: 'Intermediate',
    categories: ['Core', 'Abs', 'Strength'],
    thumbnailUrl: 'https://images.pexels.com/photos/3757987/pexels-photo-3757987.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    trainer: mikeWilson,
    rating: 4.8,
    equipment: ['Mat']
  },
  {
    id: '6',
    title: 'Gentle Evening Stretch - 10 Minutes',
    description: 'Relaxing stretching routine perfect for winding down and improving flexibility.',
    duration: 10,
    calories: 50,
    difficulty: 'Beginner',
    categories: ['Stretching', 'Flexibility', 'Recovery'],
    thumbnailUrl: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    trainer: emmaGarcia,
    rating: 4.9,
    equipment: ['Mat']
  },
  {
    id: '7',
    title: 'Lower Body Power - 35 Minutes',
    description: 'Build powerful legs and glutes with this challenging lower body strength workout.',
    duration: 35,
    calories: 320,
    difficulty: 'Advanced',
    categories: ['Lower Body', 'Strength', 'Power'],
    thumbnailUrl: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    trainer: sarahJohnson,
    rating: 4.7,
    equipment: ['Dumbbells', 'Resistance Bands', 'Mat']
  },
  {
    id: '8',
    title: 'HIIT Tabata - 20 Minutes',
    description: 'High-intensity Tabata protocol for maximum calorie burn in minimal time.',
    duration: 20,
    calories: 300,
    difficulty: 'Advanced',
    categories: ['HIIT', 'Tabata', 'Cardio', 'Fat Burn'],
    thumbnailUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    trainer: mikeWilson,
    rating: 4.8,
    equipment: ['None']
  },
  {
    id: '9',
    title: 'Pilates Core Strength - 40 Minutes',
    description: 'Classical Pilates exercises focusing on core stability and controlled movements.',
    duration: 40,
    calories: 250,
    difficulty: 'Intermediate',
    categories: ['Pilates', 'Core', 'Flexibility', 'Strength'],
    thumbnailUrl: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    trainer: emmaGarcia,
    rating: 4.7,
    equipment: ['Mat', 'Pilates Ball']
  },
  {
    id: '10',
    title: 'Beginner Strength Training - 25 Minutes',
    description: 'Perfect introduction to strength training with basic movements and proper form guidance.',
    duration: 25,
    calories: 200,
    difficulty: 'Beginner',
    categories: ['Strength', 'Beginner', 'Full Body'],
    thumbnailUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    trainer: mikeWilson,
    rating: 4.9,
    equipment: ['Light Dumbbells', 'Mat']
  }
];