// import React from "react";
import { ActivitySquare, Camera, ChefHat, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const FoodScannersec = () => {
   return (
      <section
         id='technology'
         className='relative overflow-hidden bg-gradient-to-r from-gray-900 to-blue-900 py-24 text-white'
      >
         {/* Dotted background pattern */}
         <div className='absolute inset-0 opacity-10'>
            <div
               className='h-full w-full'
               style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               }}
            />
         </div>

         <div className='container relative z-10 mx-auto px-4'>
            {/* Section Header */}
            <div className='mb-20 text-center'>
               <h2 className='mb-8 text-4xl font-bold md:text-5xl'>
                  <span className='bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                     Snap It. Know It. Cook It.
                  </span>
               </h2>
               <p className='mx-auto max-w-3xl text-xl text-gray-300'>
                  <span>
                     Meet your smart food assistant — just snap a photo of your
                     meal or upload any food image, and let AI do the rest.
                  </span>
                  Our powerful scanner gives you instant insights: calories,
                  full nutrition facts, ingredients, and even how to cook the
                  meal yourself!
               </p>
            </div>

            {/* Content Grid */}
            <div className='mb-20 grid items-center gap-16 lg:grid-cols-2'>
               {/* Left: Feature bullets */}
               <div className='space-y-10'>
                  {/* Feature 1 */}
                  <div className='flex items-start space-x-4'>
                     <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600'>
                        <Camera className='h-6 w-6 text-white' />
                     </div>
                     <div>
                        <h3 className='mb-3 text-2xl font-bold'>
                           {' '}
                           Capture or Upload
                        </h3>
                        <p className='text-lg text-gray-300'>
                           Take a photo of your plate, or upload any food image
                           — breakfast, lunch, snack, or dessert — and let the
                           AI analyze it in seconds.
                        </p>
                     </div>
                  </div>

                  {/* Feature 2 */}
                  <div className='flex items-start space-x-4'>
                     <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600'>
                        <ActivitySquare className='h-6 w-6 text-white' />
                     </div>
                     <div>
                        <h3 className='mb-3 text-2xl font-bold'>
                           {' '}
                           Smart Meal Analysis
                        </h3>
                        <p className='text-lg text-gray-300'>
                           The scanner instantly detects what's in your meal:
                           the food type, ingredients, portion size, calories,
                           and health data — all in one clear, simple breakdown.
                        </p>
                     </div>
                  </div>

                  {/* Feature 3 */}
                  <div className='flex items-start space-x-4'>
                     <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600'>
                        <ChefHat className='h-6 w-6 text-white' />
                     </div>
                     <div>
                        <h3 className='mb-3 text-2xl font-bold'>
                           {' '}
                           Full Ingredients + Cooking Instructions
                        </h3>
                        <p className='text-lg text-gray-300'>
                           Want to recreate the meal? You'll get the exact
                           ingredient list and step-by-step instructions so you
                           can make it yourself — healthier, easier, smarter.
                        </p>
                     </div>
                  </div>
                  <div className='mx-auto mt-12 max-w-2xl text-center'>
                     <p className='mb-4 text-xl font-semibold text-white'>
                        Whether you're{' '}
                        <span className='text-blue-400'>tracking calories</span>
                        ,<span className='text-blue-400'> cooking smarter</span>
                        , or just
                        <span className='text-blue-400'>
                           {' '}
                           curious about your plate
                        </span>{' '}
                        — the Food Scanner gives you everything you need in one
                        tap.
                     </p>

                     <p className='text-lg font-bold text-blue-400'>
                        It’s <span className='text-xl'>fast</span> and
                        <span className='text-xl'> incredibly smart</span>.
                     </p>
                  </div>
               </div>

               {/* Right: AI Analysis Card */}
               <div className='rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-lg'>
                  <div className='rounded-2xl bg-white p-6 shadow-2xl'>
                     <div className='mb-6 flex items-center justify-between'>
                        <h4 className='text-2xl font-bold text-gray-800'>
                           AI Analysis in Action
                        </h4>
                        <div className='flex items-center space-x-2'>
                           <div className='h-3 w-3 animate-pulse rounded-full bg-green-500' />
                           <span className='text-sm font-medium text-gray-600'>
                              Live Processing
                           </span>
                        </div>
                     </div>

                     <div className='space-y-4'>
                        {/* Food item */}
                        <div className='flex items-center justify-between rounded-lg bg-blue-50 p-3'>
                           <span className='font-semibold text-gray-800'>
                              Grilled Salmon with Quinoa
                           </span>
                           <span className='rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white'>
                              Identified
                           </span>
                        </div>

                        {/* Nutrition Info */}
                        <div className='grid grid-cols-2 gap-4'>
                           <div className='rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-center text-white'>
                              <div className='text-3xl font-bold'>485</div>
                              <div className='text-sm opacity-90'>Calories</div>
                           </div>
                           <div className='rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-4 text-center text-white'>
                              <div className='text-3xl font-bold'>42g</div>
                              <div className='text-sm opacity-90'>Protein</div>
                           </div>
                           <div className='rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-4 text-center text-white'>
                              <div className='text-3xl font-bold'>28g</div>
                              <div className='text-sm opacity-90'>Carbs</div>
                           </div>
                           <div className='rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-4 text-center text-white'>
                              <div className='text-3xl font-bold'>18g</div>
                              <div className='text-sm opacity-90'>
                                 Healthy Fats
                              </div>
                           </div>
                        </div>

                        {/* Insights */}
                        <div className='rounded-xl bg-gray-50 p-4'>
                           <h5 className='mb-2 font-semibold text-gray-800'>
                              {' '}
                              Insights:
                           </h5>
                           <ul className='space-y-1 text-sm text-gray-600'>
                              <li>• Excellent source of omega-3 fatty acids</li>
                              <li>• Complete protein profile detected</li>
                              <li>• High fiber content from quinoa</li>
                              <li>• Optimal for muscle building goals</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <Link
               to='/food-scanner'
               className='mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105'
            >
               <Cpu className='mr-2 h-4 w-4' />
               Explore Food Scanner{' '}
               <span className='mx-1 text-base font-extrabold text-red-600'>
                  for free{' '}
               </span>
               Now!
            </Link>
         </div>
      </section>
   );
};

export default FoodScannersec;
