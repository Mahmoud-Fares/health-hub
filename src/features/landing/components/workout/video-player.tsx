import React, { useEffect, useRef, useState } from 'react';

import {
   CheckCircle,
   Pause,
   Play,
   RotateCcw,
   SkipBack,
   SkipForward,
   Volume2,
   VolumeX,
} from 'lucide-react';

interface VideoPlayerProps {
   videoUrl: string;
   onProgress: (progress: number) => void;
   onComplete: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
   videoUrl,
   onProgress,
   onComplete,
}) => {
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);
   const [volume, setVolume] = useState(1);
   const [isMuted, setIsMuted] = useState(false);
   const [isCompleted, setIsCompleted] = useState(false);
   const videoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedMetadata = () => {
         setDuration(video.duration);
      };

      const handleTimeUpdate = () => {
         setCurrentTime(video.currentTime);
         const progress = (video.currentTime / video.duration) * 100;
         onProgress(progress);

         // Mark as completed when 90% watched
         if (progress >= 90 && !isCompleted) {
            setIsCompleted(true);
            onComplete();
         }
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
         video.removeEventListener('loadedmetadata', handleLoadedMetadata);
         video.removeEventListener('timeupdate', handleTimeUpdate);
      };
   }, [onProgress, onComplete, isCompleted]);

   const togglePlay = () => {
      const video = videoRef.current;
      if (!video) return;

      if (isPlaying) {
         video.pause();
      } else {
         video.play();
      }
      setIsPlaying(!isPlaying);
   };

   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const video = videoRef.current;
      if (!video) return;

      const newTime = (parseFloat(e.target.value) / 100) * duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
   };

   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const video = videoRef.current;
      const newVolume = parseFloat(e.target.value);

      if (video) {
         video.volume = newVolume;
      }
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
   };

   const toggleMute = () => {
      const video = videoRef.current;
      if (!video) return;

      if (isMuted) {
         video.volume = volume;
         setIsMuted(false);
      } else {
         video.volume = 0;
         setIsMuted(true);
      }
   };

   const skipTime = (seconds: number) => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = Math.max(
         0,
         Math.min(duration, video.currentTime + seconds)
      );
   };

   const restart = () => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = 0;
      setCurrentTime(0);
      setIsCompleted(false);
   };

   const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
   };

   const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

   return (
      <div className='relative overflow-hidden rounded-lg bg-black'>
         <video
            ref={videoRef}
            className='aspect-video w-full'
            src={videoUrl}
            poster='https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800'
         />

         {/* Completion Overlay */}
         {isCompleted && (
            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-75'>
               <div className='text-center text-white'>
                  <CheckCircle className='mx-auto mb-4 h-16 w-16 text-green-500' />
                  <h3 className='mb-2 text-2xl font-bold'>
                     Workout Completed!
                  </h3>
                  <p className='text-gray-300'>
                     Great job finishing this workout!
                  </p>
               </div>
            </div>
         )}

         {/* Controls Overlay */}
         <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4'>
            {/* Progress Bar */}
            <div className='mb-4'>
               <input
                  type='range'
                  min='0'
                  max='100'
                  value={progressPercentage}
                  onChange={handleSeek}
                  className='slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-600'
               />
               <div className='mt-1 flex justify-between text-sm text-white'>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
               </div>
            </div>

            {/* Control Buttons */}
            <div className='flex items-center justify-between'>
               <div className='flex items-center space-x-4'>
                  <button
                     onClick={restart}
                     className='text-white transition-colors hover:text-blue-400'
                  >
                     <RotateCcw className='h-6 w-6' />
                  </button>

                  <button
                     onClick={() => skipTime(-10)}
                     className='text-white transition-colors hover:text-blue-400'
                  >
                     <SkipBack className='h-6 w-6' />
                  </button>

                  <button
                     onClick={togglePlay}
                     className='rounded-full bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700'
                  >
                     {isPlaying ? (
                        <Pause className='h-6 w-6' />
                     ) : (
                        <Play className='h-6 w-6' />
                     )}
                  </button>

                  <button
                     onClick={() => skipTime(10)}
                     className='text-white transition-colors hover:text-blue-400'
                  >
                     <SkipForward className='h-6 w-6' />
                  </button>
               </div>

               <div className='flex items-center space-x-2'>
                  <button
                     onClick={toggleMute}
                     className='text-white transition-colors hover:text-blue-400'
                  >
                     {isMuted ? (
                        <VolumeX className='h-5 w-5' />
                     ) : (
                        <Volume2 className='h-5 w-5' />
                     )}
                  </button>

                  <input
                     type='range'
                     min='0'
                     max='1'
                     step='0.1'
                     value={isMuted ? 0 : volume}
                     onChange={handleVolumeChange}
                     className='h-1 w-20 cursor-pointer appearance-none rounded-lg bg-gray-600'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default VideoPlayer;
