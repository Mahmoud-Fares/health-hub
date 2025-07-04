import { motion } from 'framer-motion';
import {
   Activity,
   Calculator,
   Flame,
   Sparkles,
   User,
   Weight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
   {
      label: 'BMI',
      value: '22.8 – Normal',
      icon: <Weight size={22} className='text-blue-600' />,
      usage: 'Checks if weight is suitable for height.',
   },
   {
      label: 'BMR',
      value: '1,560 kcal/day',
      icon: <Flame size={22} className='text-red-500' />,
      usage: 'Calories burned while resting.',
   },
   {
      label: 'TDEE',
      value: '2,400 kcal/day',
      icon: <Activity size={22} className='text-green-600' />,
      usage: 'Calories needed daily with Adam’s activity level.',
   },
   {
      label: 'Macros',
      value: '40% Carbs · 30% Protein · 30% Fat',
      icon: <Calculator size={22} className='text-indigo-600' />,
      usage: 'Helps Adam balance meals for energy & fitness.',
   },
];

const CalculatorsPreview = () => {
   return (
      <section className='relative overflow-hidden bg-gradient-to-tr from-blue-100 to-white py-24'>
         <div className='container relative z-10 mx-auto px-6'>
            <div className='mb-16 text-center'>
               <h2 className='text-4xl font-bold leading-tight text-gray-900 md:text-5xl'>
                  Adam's Health Snapshot
               </h2>
               <p className='mx-auto mt-4 max-w-2xl text-lg text-gray-600'>
                  Let our smart tools analyze your body just like Adam's.
               </p>
            </div>

            {/* Content Layout */}
            <div className='relative grid grid-cols-1 items-start gap-14 md:grid-cols-2'>
               {/* Profile Card */}
               <div className='relative flex min-h-[450px] items-center justify-center'>
                  <motion.div
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.7 }}
                     className='relative z-10 mt-24 space-y-4 rounded-2xl border-t-4 border-blue-500 bg-white p-6 shadow-xl'
                  >
                     <div className='flex items-center space-x-3'>
                        <User className='text-blue-600' />
                        <h3 className='text-xl font-bold text-gray-800'>
                           Adam
                        </h3>
                     </div>
                     <ul className='space-y-1 text-sm text-gray-600'>
                        <li>
                           📏 Height:{' '}
                           <span className='font-semibold'>175 cm</span>
                        </li>
                        <li>
                           ⚖️ Weight:{' '}
                           <span className='font-semibold'>70 kg</span>
                        </li>
                        <li>
                           🔋 Activity Level:{' '}
                           <span className='font-semibold'>Moderate</span>
                        </li>
                        <li>
                           🎯 Goal:{' '}
                           <span className='font-semibold'>
                              Lose 3 kg in 6 weeks
                           </span>
                        </li>
                     </ul>
                     <p className='text-sm italic text-blue-500'>
                        This is what our tools say about Adam...
                     </p>

                     {/* Connector Lines with Arrows */}
                     <motion.div
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        className='absolute left-full top-[calc(50%-12px)] h-0.5 w-[98px] -translate-y-1/2 transform bg-blue-400'
                     >
                        <div className='absolute -right-2 h-0 w-0 -translate-y-[3px] border-b-4 border-l-8 border-t-4 border-b-transparent border-l-blue-400 border-t-transparent' />
                     </motion.div>

                     <motion.div
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        className='absolute left-[calc(100%+6.5rem)] top-[calc(50%-225px)] h-[430px] w-0.5 bg-blue-400'
                     />

                     {[-223, -80, 60, 205].map((offset, i) => (
                        <motion.div
                           key={i}
                           animate={{ opacity: [1, 0.6, 1] }}
                           transition={{
                              duration: 1.6,
                              repeat: Infinity,
                              delay: i * 0.2,
                           }}
                           className={`absolute left-[calc(100%+6.5rem)] h-0.5 w-[100px] bg-blue-400`}
                           style={{ top: `calc(50% - 2px + ${offset}px)` }}
                        >
                           <div className='absolute -right-1 top-[calc(50%-4px)] h-0 w-0 border-b-4 border-l-8 border-t-4 border-b-transparent border-l-blue-400 border-t-transparent' />
                        </motion.div>
                     ))}
                  </motion.div>
               </div>

               <div className=' '>
                  {/* Features */}
                  <motion.div
                     initial={{ opacity: 0, x: 40 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.7 }}
                     className='grid grid-cols-1 gap-6'
                  >
                     {features.map((feat, index) => (
                        <motion.div
                           key={index}
                           whileHover={{ scale: 1.02 }}
                           className='rounded-xl border border-gray-100 bg-white p-5 shadow-md transition-all hover:shadow-lg'
                        >
                           <div className='flex items-center space-x-4'>
                              {feat.icon}
                              <div>
                                 <h4 className='mb-1 text-lg font-semibold text-gray-800'>
                                    {feat.label}
                                 </h4>
                                 <p className='text-sm font-bold text-blue-600'>
                                    {feat.value}
                                 </p>
                              </div>
                           </div>
                           <p className='ml-10 mt-2 text-sm text-gray-500'>
                              {feat.usage}
                           </p>
                        </motion.div>
                     ))}
                  </motion.div>
               </div>
            </div>

            {/* CTA */}
            <div className='mt-20 text-center'>
               <Link
                  to='/calculators'
                  className='inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700'
               >
                  Try Smart Tools Yourself{' '}
                  <Sparkles size={18} className='ml-2' />
               </Link>
               <p className='mt-2 text-sm text-gray-500'>
                  Get access to bonus tools like Ideal Weight, Hydration & more.
               </p>
            </div>
         </div>

         {/* Background Gradient Circle */}
         <div className='absolute -left-40 top-0 h-96 w-96 animate-pulse rounded-full bg-blue-100 opacity-30 blur-3xl' />
         <div className='absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-indigo-100 opacity-20 blur-2xl' />
      </section>
   );
};

export default CalculatorsPreview;
