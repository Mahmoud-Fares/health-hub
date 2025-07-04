import React from 'react';

import { Award, BookOpen, Coffee, Heart, Smile, Users } from 'lucide-react';

const AboutPage = () => {
   return (
      <div className='pb-20 pt-28'>
         <div className='container mx-auto px-4'>
            {/* Hero Section */}
            <div className='mb-16 text-center'>
               <h1 className='mb-6 text-4xl font-bold text-gray-900 md:text-5xl'>
                  About HealthHub
               </h1>
               <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                  We're on a mission to make evidence-based nutrition accessible
                  to everyone and empower healthier lives through education and
                  personalized guidance.
               </p>
            </div>

            {/* Our Story */}
            <div className='mb-20 flex flex-col items-center gap-12 md:flex-row'>
               <div className='md:w-1/2'>
                  <img
                     src='https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
                     alt='HealthHub team'
                     className='h-auto w-full rounded-xl shadow-lg'
                  />
               </div>
               <div className='md:w-1/2'>
                  <h2 className='mb-6 text-3xl font-bold text-gray-900'>
                     Our Story
                  </h2>
                  <p className='mb-4 text-gray-700'>
                     HealthHub was founded in 2020 by a team of registered
                     dietitians, nutritionists, and health coaches who saw a
                     critical gap in nutrition education and personalized
                     wellness support.
                  </p>
                  <p className='mb-4 text-gray-700'>
                     In a world of fad diets and conflicting nutrition advice,
                     we set out to create a platform that provides clear,
                     science-based guidance tailored to individual needs and
                     goals.
                  </p>
                  <p className='text-gray-700'>
                     Today, we're proud to have helped thousands of clients
                     transform their relationship with food, improve their
                     health markers, and develop sustainable eating habits that
                     support their unique lifestyles.
                  </p>
               </div>
            </div>

            {/* Our Values */}
            <div className='mb-20'>
               <div className='mb-12 text-center'>
                  <h2 className='mb-4 text-3xl font-bold text-gray-900'>
                     Our Values
                  </h2>
                  <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                     The principles that guide everything we do
                  </p>
               </div>

               <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                  <ValueCard
                     icon={<BookOpen className='text-blue-600' size={32} />}
                     title='Evidence-Based Approach'
                     description='We base all our recommendations on the latest scientific research and proven nutrition principles.'
                  />
                  <ValueCard
                     icon={<Users className='text-blue-600' size={32} />}
                     title='Personalized Guidance'
                     description='We recognize that nutrition is not one-size-fits-all and tailor our advice to individual needs and goals.'
                  />
                  <ValueCard
                     icon={<Heart className='text-blue-600' size={32} />}
                     title='Holistic Wellness'
                     description='We consider the whole person—physical, mental, and emotional health—in our approach to nutrition.'
                  />
                  <ValueCard
                     icon={<Award className='text-blue-600' size={32} />}
                     title='Professional Excellence'
                     description='We maintain the highest standards of expertise, ethics, and continuing education in our field.'
                  />
                  <ValueCard
                     icon={<Smile className='text-blue-600' size={32} />}
                     title='Positive Relationship with Food'
                     description='We promote enjoyable, sustainable eating habits rather than restrictive diets or quick fixes.'
                  />
                  <ValueCard
                     icon={<Coffee className='text-blue-600' size={32} />}
                     title='Accessibility'
                     description='We strive to make quality nutrition guidance available to people of all backgrounds and circumstances.'
                  />
               </div>
            </div>

            {/* Our Approach */}
            <div className='rounded-2xl bg-blue-50 p-8 md:p-12'>
               <div className='mx-auto max-w-3xl'>
                  <h2 className='mb-6 text-center text-3xl font-bold text-gray-900'>
                     Our Approach
                  </h2>
                  <p className='mb-6 text-gray-700'>
                     At HealthHub, we believe that good nutrition should be
                     accessible, enjoyable, and sustainable. Our approach is
                     centered on these key principles:
                  </p>

                  <div className='space-y-6'>
                     <div className='rounded-xl bg-white p-6 shadow-sm'>
                        <h3 className='mb-2 text-xl font-bold text-gray-900'>
                           Individualized Plans
                        </h3>
                        <p className='text-gray-700'>
                           We recognize that each person has unique nutritional
                           needs, preferences, and goals. That's why we create
                           customized plans rather than one-size-fits-all
                           solutions.
                        </p>
                     </div>

                     <div className='rounded-xl bg-white p-6 shadow-sm'>
                        <h3 className='mb-2 text-xl font-bold text-gray-900'>
                           Education First
                        </h3>
                        <p className='text-gray-700'>
                           We empower our clients with knowledge about nutrition
                           science, helping them understand the 'why' behind our
                           recommendations so they can make informed choices.
                        </p>
                     </div>

                     <div className='rounded-xl bg-white p-6 shadow-sm'>
                        <h3 className='mb-2 text-xl font-bold text-gray-900'>
                           Sustainable Habits
                        </h3>
                        <p className='text-gray-700'>
                           We focus on gradual, lasting changes rather than
                           quick fixes. Our goal is to help you develop eating
                           habits that you can maintain for life.
                        </p>
                     </div>

                     <div className='rounded-xl bg-white p-6 shadow-sm'>
                        <h3 className='mb-2 text-xl font-bold text-gray-900'>
                           Whole-Person Wellness
                        </h3>
                        <p className='text-gray-700'>
                           We consider all aspects of health—physical, mental,
                           and emotional—in our approach to nutrition,
                           recognizing that these elements are deeply
                           interconnected.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

const ValueCard = ({
   icon,
   title,
   description,
}: {
   icon: React.ReactNode;
   title: string;
   description: string;
}) => (
   <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md'>
      <div className='mb-4'>{icon}</div>
      <h3 className='mb-3 text-xl font-bold text-gray-900'>{title}</h3>
      <p className='text-gray-700'>{description}</p>
   </div>
);

export default AboutPage;
