import React from 'react';

import { motion } from 'framer-motion';
import {
   ArrowRight,
   BookOpen,
   Calculator,
   Calendar,
   Camera,
   ShoppingBag,
   Video,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import CalculatorsPreview from '@/features/landing/components/calculators-preview';
import AboutSection from '@/features/landing/components/home/about-section';
import Appointment from '@/features/landing/components/home/appointment';
import ContactInvite from '@/features/landing/components/home/contact-invite';
import Ecommercesec from '@/features/landing/components/home/e-commerce-section';
import FeaturedArticles from '@/features/landing/components/home/featured-articles';
import FoodScannersec from '@/features/landing/components/home/food-scanner-section';
import WorkoutSection from '@/features/landing/components/home/workout-section';
import TestimonialSlider from '@/features/landing/components/testimonials/testimonial-slider';
import HeroSection from '@/features/landing/pages/hero';

const HomePage = () => {
   return (
      <div className='flex flex-col'>
         <HeroSection />

         <section className='bg-white py-20'>
            <div className='container mx-auto px-4'>
               <div className='mb-16 text-center'>
                  <h2 className='mb-4 text-4xl font-bold text-gray-900'>
                     What We Offer
                  </h2>
                  <p className='mx-auto max-w-3xl text-lg text-gray-700'>
                     Comprehensive resources to support your health and wellness
                     journey.
                  </p>
               </div>

               <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                  <FeatureCard
                     icon={<BookOpen className='text-blue-600' size={28} />}
                     title='Nutrition Articles'
                     description='Research-backed articles on nutrition, diet trends, and healthy eating habits.'
                     linkTo='/articles'
                     bgColor='bg-blue-100'
                  />
                  <FeatureCard
                     icon={<Video className='text-red-500' size={28} />}
                     title='Workout Videos'
                     description='Guided exercise videos for all fitness levels, from beginner to advanced.'
                     linkTo='/workout-videos'
                     bgColor='bg-red-100'
                  />
                  <FeatureCard
                     icon={<Calendar className='text-green-600' size={28} />}
                     title='Expert Consultations'
                     description='Book appointments with certified nutritionists and health coaches.'
                     linkTo='/find-doctors'
                     bgColor='bg-green-100'
                  />
                  <FeatureCard
                     icon={<Calculator className='text-indigo-600' size={28} />}
                     title='Nutrition Tools'
                     description='Calculators for BMI, calorie needs, macro tracking, and more.'
                     linkTo='/calculators'
                     bgColor='bg-indigo-100'
                  />
                  <FeatureCard
                     icon={
                        <ShoppingBag className='text-orange-500' size={28} />
                     }
                     title='E-commerce'
                     description='Shop high-quality health products, supplements, and more.'
                     linkTo='/store'
                     bgColor='bg-orange-100'
                  />
                  <FeatureCard
                     icon={<Camera className='text-purple-600' size={28} />}
                     title='AI Food Scanner'
                     description='Snap a photo of your meal to get instant nutritional info and healthier choices.'
                     linkTo='/food-scanner'
                     bgColor='bg-purple-100'
                  />
               </div>
            </div>
         </section>
         <AboutSection />
         <CalculatorsPreview />
         <FoodScannersec />
         <WorkoutSection />

         {/* Featured Articles */}
         <section className='bg-gradient-to-tr from-teal-50 via-blue-900 to-cyan-400 py-20'>
            <div className='container mx-auto px-4'>
               <div className='mb-12 flex items-center justify-between'>
                  <h2 className='text-3xl font-bold text-gray-900 md:text-4xl'>
                     Featured Articles
                  </h2>
                  <Link
                     to='/articles'
                     className='flex items-center font-medium text-black hover:text-blue-700'
                  >
                     View All <ArrowRight size={20} className='ml-2' />
                  </Link>
               </div>

               <FeaturedArticles />
            </div>
         </section>

         <section className='bg-gradient-to-r from-blue-50 to-blue-50 pb-20 pt-32 md:pb-28 md:pt-40'>
            <div className='container mx-auto px-4'>
               <div className='flex flex-col items-center md:flex-row'>
                  <div className='mb-10 md:mb-0 md:w-1/2'>
                     <h1 className='mb-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl'>
                        Your Journey to{' '}
                        <span className='text-blue-600'>Better Nutrition</span>{' '}
                        Starts Here
                     </h1>
                     <p className='mb-8 text-xl text-gray-700'>
                        Discover personalized nutrition plans, expert advice,
                        and resources to transform your health and wellness.
                     </p>
                     <div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
                        <Link
                           to='/find-doctors'
                           className='transform rounded-full bg-blue-600 px-8 py-3 text-center font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700'
                        >
                           Book a Consultation
                        </Link>
                        <Link
                           to='/food-scanner'
                           className='rounded-full border-2 border-blue-600 bg-white px-8 py-3 text-center font-medium text-blue-600 transition-all duration-300 hover:bg-blue-50'
                        >
                           Scan you meal !
                        </Link>
                     </div>
                  </div>
                  <div className='md:w-1/2'>
                     <img
                        src='/images/R (1).jpeg'
                        alt='Healthy lifestyle'
                        className='h-[500px] w-full rounded-lg object-cover shadow-xl'
                     />
                  </div>
               </div>
            </div>
         </section>
         <Ecommercesec />
         <ContactInvite />

         {/* CTA Section */}
         {/* <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Our certified nutritionists and health coaches are ready to help you achieve your wellness goals.
          </p>
          <Link
            to="/find-doctors"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 inline-block"
          >
            Book Your Appointment Today
          </Link>
        </div>
      </section> */}

         <Appointment />

         {/* Testimonials */}
         <section className='bg-white py-20'>
            <div className='container mx-auto px-4'>
               <div className='mb-16 text-center'>
                  <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>
                     What Our Clients Say
                  </h2>
                  <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                     Success stories from people who have transformed their
                     lives with our nutrition guidance
                  </p>
               </div>

               <TestimonialSlider />

               <div className='mt-12 text-center'>
                  <Link
                     to='/testimonials'
                     className='flex items-center justify-center font-medium text-blue-600 hover:text-blue-700'
                  >
                     Read More Success Stories{' '}
                     <ArrowRight size={20} className='ml-2' />
                  </Link>
               </div>
            </div>
         </section>
      </div>
   );
};

// const FeatureCard = ({
//   icon,
//   title,
//   description,
//   linkTo
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   linkTo: string;
// }) => (
//   <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
//     <div className="mb-4">
//       {icon}
//     </div>
//     <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
//     <p className="text-gray-700 mb-6 flex-grow">{description}</p>
//     <Link
//       to={linkTo}
//       className="flex items-center text-blue-600 hover:text-blue-700 font-medium mt-auto"
//     >
//       Learn More <ArrowRight size={18} className="ml-2" />
//     </Link>
//   </div>
// );

// const FeatureCard = ({
//   icon,
//   title,
//   description,
//   linkTo
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   linkTo: string;
// }) => (
//   <Link
//     to={linkTo}
//     className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
//   >
//     <div className="mb-4">{icon}</div>
//     <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
//       {title}
//     </h4>
//     <p className="text-gray-500 text-sm leading-relaxed">
//       {description}
//     </p>
//     <p className="flex items-center text-blue-600 hover:text-blue-700 font-medium mt-auto"  >
//      Learn More <ArrowRight size={18} className="ml-2" /></p>
//   </Link>
// );

const FeatureCard = ({
   icon,
   title,
   description,
   linkTo,
   bgColor,
}: {
   icon: React.ReactNode;
   title: string;
   description: string;
   linkTo: string;
   bgColor: string;
}) => (
   <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
   >
      <Link
         to={linkTo}
         className='group flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl'
      >
         <div
            className={`mb-4 inline-flex items-center space-x-3 rounded-3xl px-5 py-4 ${bgColor}`}
         >
            <div className='text-blue-600'>{icon}</div>
            <h4 className='text-md font-semibold text-gray-800 group-hover:text-blue-700'>
               {title}
            </h4>
         </div>

         {/* الوصف */}
         <p className='mb-4 text-sm leading-relaxed text-gray-600'>
            {description}
         </p>

         {/* Learn More */}
         <span className='mt-auto flex items-center font-medium text-blue-600 hover:text-blue-700'>
            Learn More <ArrowRight size={18} className='ml-2' />
         </span>
      </Link>
   </motion.div>
);

export default HomePage;
