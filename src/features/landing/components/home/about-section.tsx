// import React from "react";
import { motion } from 'framer-motion';
import {
   Calculator,
   Dumbbell,
   ScanFace,
   ShoppingBag,
   Sparkles,
   Star,
} from 'lucide-react';

const features = [
   {
      icon: <Star className='text-blue-300' />,
      text: 'Expert Nutritionist Booking',
   },
   {
      icon: <ScanFace className='text-blue-300' />,
      text: 'AI-Powered Food Scanner',
   },
   {
      icon: <Sparkles className='text-blue-400' />,
      text: 'Wellness Articles & Guides',
   },
   {
      icon: <Dumbbell className='text-blue-400' />,
      text: 'Workout Video Library',
   },
   {
      icon: <ShoppingBag className='text-blue-300' />,
      text: 'Healthy E-commerce Store',
   },
   {
      icon: <Calculator className='text-blue-300' />,
      text: 'BMI & Nutrition Calculators',
   },
];

const AboutSection = () => (
   <section
      id='about'
      className='rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-24 text-white shadow-xl md:px-24'
   >
      <div className='grid grid-cols-2 items-center gap-16'>
         {/* Left: Text */}
         <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
         >
            <h2 className='mb-3 text-xl uppercase tracking-widest text-blue-300'>
               Why HEALTH HUB ?
            </h2>
            <h3 className='mb-6 text-4xl font-bold leading-snug md:text-5xl'>
               Transform your{' '}
               <span className='text-blue-300'>health journey</span> with
               smarter, simpler approach.
            </h3>
            <p className='mb-8 text-lg text-gray-300'>
               We blend the power of AI with real human expertise to help you
               take control of your nutrition, fitness, and
               wellness—effortlessly.
            </p>

            <ul className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
               {features.map((item, idx) => (
                  <li
                     key={idx}
                     className='flex items-start gap-3 text-gray-200'
                  >
                     <div className='text-xl'>{item.icon}</div>
                     <span>{item.text}</span>
                  </li>
               ))}
            </ul>

            <p className='ml-[25%] mt-8 text-gray-300'>
               <span className='text-red-600'>READY</span> to take control of
               your health ?
            </p>
            <div className='mt-12 w-full'>
               <div className='relative mx-auto flex max-w-4xl flex-col items-center justify-between md:flex-row'>
                  {/* Step 1 */}
                  <div className='mb-12 flex flex-col items-center px-4 text-center md:mb-0'>
                     <div className='-ml-5 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white shadow-md'>
                        1
                     </div>
                     <p className='mb-1 font-semibold text-white'>Sign Up</p>
                     <p className='text-sm text-gray-300'>
                        Create your account and access your personalized
                        dashboard.
                     </p>
                  </div>

                  {/* Line */}
                  <div className='absolute left-[20%] top-6 z-0 hidden h-1 w-[60%] bg-blue-300 md:block' />

                  {/* Step 2 */}
                  <div className='z-10 mb-12 flex flex-col items-center px-4 text-center md:mb-0'>
                     <div className='mb-4 flex h-12 w-12 translate-y-[-10px] items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white shadow-md'>
                        2
                     </div>
                     <p className='mb-1 font-semibold text-white'>Explore</p>
                     <p className='text-sm text-gray-300'>
                        Browse articles, videos, and book expert consultations.
                     </p>
                  </div>

                  {/* Step 3 */}
                  <div className='z-10 flex flex-col items-center px-4 text-center'>
                     <div className='-ml-1 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white shadow-md'>
                        3
                     </div>
                     <p className='mb-1 font-semibold text-white'>
                        Use Smart Tools
                     </p>
                     <p className='text-sm text-gray-300'>
                        Scan meals and use calculators to track your progress.
                     </p>
                  </div>
               </div>
            </div>

            <a
               href='/signup'
               className='ml-[40%] mt-8 inline-block rounded-xl bg-blue-400 px-6 py-3 font-semibold text-black transition duration-300 hover:bg-blue-500'
            >
               Get Started Now !
            </a>
         </motion.div>

         {/* Right: Image */}
         <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
         >
            <img
               src='/images/how it work.png'
               alt='Healthy lifestyle illustration'
               className='mx-auto w-full max-w-md rounded-2xl shadow-lg'
            />
         </motion.div>
      </div>
   </section>
);

export default AboutSection;
