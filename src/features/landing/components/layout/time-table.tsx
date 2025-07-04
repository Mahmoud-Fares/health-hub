import React from 'react';

const TimeTable: React.FC = () => {
   return (
      <div id='time-table' className='bg-gray-100 py-16'>
         <div className='container mx-auto px-4'>
            <div className='flex flex-wrap justify-between'>
               {/* Blog Service */}
               <div className='mb-8 w-full sm:w-full md:w-1/2 lg:w-1/3'>
                  <div className='service-time rounded-lg bg-[#2895f1] p-6 shadow-lg'>
                     <span className='info-icon mb-4 block text-2xl text-white'>
                        <i className='fa fa-file-text' aria-hidden='true'></i>
                     </span>
                     <h3 className='text-xl font-semibold text-white'>Blogs</h3>
                     <p className='text-white'>
                        Explore expert-written articles on healthy eating,
                        wellness trends, and practical nutrition tips to help
                        you lead a balanced lifestyle.
                     </p>
                  </div>
               </div>

               {/* Doctors Service */}
               <div className='mb-8 w-full sm:w-full md:w-1/2 lg:w-1/3'>
                  <div className='service-time rounded-lg bg-[#0071d1] p-6 shadow-lg'>
                     <span className='info-icon mb-4 block text-2xl text-white'>
                        <i className='fa fa-apple' aria-hidden='true'></i>
                     </span>
                     <h3 className='text-xl font-semibold text-white'>
                        Doctors
                     </h3>
                     <div className='time-table-section'>
                        <ul className='list-none text-white'>
                           <li>✅ Personalized Meal Plans</li>
                           <li>✅ Weight & Health Management</li>
                           <li>✅ Ongoing Support</li>
                        </ul>
                     </div>
                  </div>
               </div>

               {/* E-commerce Service */}
               <div className='mb-8 w-full sm:w-full md:w-1/2 lg:w-1/3'>
                  <div className='service-time rounded-lg bg-[#0060b1] p-6 shadow-lg'>
                     <span className='info-icon mb-4 block text-2xl text-white'>
                        <i
                           className='fa fa-shopping-cart'
                           aria-hidden='true'
                        ></i>
                     </span>
                     <h3 className='text-xl font-semibold text-white'>
                        E-commerce
                     </h3>
                     <p className='text-white'>
                        Dignissimos ducimus qui blanditiis sentium volta tum
                        deleniti atque cori as quos dolores et quas mole.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TimeTable;
