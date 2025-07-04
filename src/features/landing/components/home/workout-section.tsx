import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { Dumbbell, PauseCircle, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkoutSection = () => {
   const videoRef = useRef<HTMLVideoElement>(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(0);

   const togglePlay = () => {
      const video = videoRef.current;
      if (!video) return;

      if (video.paused) {
         video.play();
         setIsPlaying(true);
      } else {
         video.pause();
         setIsPlaying(false);
      }
   };

   // متابعة تقدم الفيديو
   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleTimeUpdate = () => {
         const percentage = (video.currentTime / video.duration) * 100;
         setProgress(isNaN(percentage) ? 0 : percentage);
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
         video.removeEventListener('timeupdate', handleTimeUpdate);
      };
   }, []);

   // عند الضغط على شريط التقدم
   const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const video = videoRef.current;
      if (!video) return;

      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const clickRatio = clickX / width;
      video.currentTime = video.duration * clickRatio;
      setProgress(clickRatio * 100);
   };

   return (
      <section className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50 px-6 py-28 md:px-24'>
         {/* Background Circles */}
         <div className='absolute -left-32 -top-32 z-0 h-[500px] w-[500px] rounded-full bg-blue-200 opacity-20 blur-3xl'></div>
         <div className='absolute -bottom-32 -right-32 z-0 h-[500px] w-[500px] rounded-full bg-teal-300 opacity-20 blur-3xl'></div>

         <div className='relative z-10 mx-auto grid max-w-7xl items-center gap-20 md:grid-cols-2'>
            {/* Left Text */}
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
            >
               <h2 className='mb-6 flex items-center gap-3 text-4xl font-extrabold text-blue-900 md:text-5xl'>
                  <Dumbbell className='h-10 w-10 animate-pulse text-blue-500' />
                  Level Up Your Workouts
               </h2>

               <p className='mb-6 text-lg leading-relaxed text-gray-700 md:text-xl'>
                  Train smarter with Our{' '}
                  <span className='font-semibold text-blue-700'>
                     workout videos
                  </span>{' '}
                  curated by professionals. From fat-burning cardio to mindful
                  yoga—there’s something for every body.
               </p>

               <ul className='mb-8 grid grid-cols-2 gap-3 text-sm text-gray-600'>
                  <li className='rounded-full bg-white px-4 py-2 text-center font-medium text-blue-700 shadow'>
                     Beginner Friendly
                  </li>
                  <li className='rounded-full bg-white px-4 py-2 text-center font-medium text-blue-700 shadow'>
                     Fat Burn
                  </li>
                  <li className='rounded-full bg-white px-4 py-2 text-center font-medium text-blue-700 shadow'>
                     Home Exercises
                  </li>
                  <li className='rounded-full bg-white px-4 py-2 text-center font-medium text-blue-700 shadow'>
                     Strength Training
                  </li>
               </ul>

               <div className='relative h-[100px]'>
                  <Link
                     to='/workout-videos'
                     className='absolute left-[190px] top-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:from-blue-700 hover:to-teal-600'
                  >
                     <PlayCircle className='h-5 w-5' />
                     Explore Workouts
                  </Link>
               </div>
            </motion.div>

            {/* Right Video Card */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
            >
               <div className='group relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl'>
                  <video
                     ref={videoRef}
                     className='w-full object-cover'
                     src='/videos/NO EXCUSE !!.mp4'
                     loop
                     playsInline
                  />

                  {/* Overlay Controls */}
                  <div
                     className='absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-all group-hover:bg-black/30'
                     onClick={togglePlay}
                  >
                     <div className='opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                        {isPlaying ? (
                           <PauseCircle className='h-16 w-16 text-white transition-transform hover:scale-110' />
                        ) : (
                           <PlayCircle className='h-16 w-16 text-white transition-transform hover:scale-110' />
                        )}
                     </div>
                  </div>

                  {/* Progress Bar - Clickable */}
                  <div
                     className='absolute bottom-0 left-0 h-2 w-full cursor-pointer bg-white/20'
                     onClick={handleSeek}
                  >
                     <div
                        className='h-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-150'
                        style={{ width: `${progress}%` }}
                     ></div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
};

export default WorkoutSection;
