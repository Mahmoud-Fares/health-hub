import { UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const Appointment = () => {
   return (
      <section className='rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 px-4 py-24 text-white md:px-16'>
         <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2'>
            {/* LEFT TEXT AREA */}
            <div className='space-y-6'>
               <h2 className='text-3xl font-extrabold leading-tight md:text-4xl'>
                  Ready to Transform Your Health?
               </h2>
               <p className='max-w-md text-lg text-white/90 md:text-xl'>
                  Our certified nutritionists and health coaches are ready to
                  help you achieve your wellness goals with personalized plans
                  and real results.
               </p>
               <Link
                  to='/FindDR'
                  className='mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold text-blue-600 shadow-md transition hover:opacity-90'
               >
                  Meet Our Doctors
               </Link>
            </div>

            {/* RIGHT DASHBOARD-LIKE MOCKUP */}
            <div className='space-y-6 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md md:p-8'>
               {/* STEP 1: Choose Doctor */}
               <div>
                  <p className='mb-2 text-sm font-medium text-white/80'>
                     Step 1: Choose Your Doctor
                  </p>
                  <div className='grid grid-cols-2 gap-4'>
                     {[1, 2, 3, 4].map((id) => (
                        <div
                           key={id}
                           className='flex h-16 cursor-pointer items-center gap-4 rounded-xl bg-white/20 px-4 transition hover:bg-white/30'
                        >
                           {/* Doctor Icon Bubble */}
                           <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/30 shadow-sm'>
                              <UserRound className='h-5 w-5 text-white' />
                           </div>
                           {/* Name Placeholder */}
                           <div className='h-2 flex-1 rounded bg-white/30' />
                        </div>
                     ))}
                  </div>
               </div>

               {/* STEP 2: Choose Day */}
               <div>
                  <p className='mb-2 text-sm font-medium text-white/80'>
                     Step 2: Select a Day
                  </p>
                  <div className='flex justify-between text-xs font-semibold tracking-wide'>
                     {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                        <div
                           key={day}
                           className='mx-1 w-full rounded-md bg-white/10 px-3 py-2 text-center transition hover:bg-white/20'
                        >
                           {day}
                        </div>
                     ))}
                  </div>
               </div>

               {/* STEP 3: Choose Time Slot */}
               <div>
                  <p className='mb-2 text-sm font-medium text-white/80'>
                     Step 3: Pick a Time
                  </p>
                  <div className='grid grid-cols-3 gap-4 text-center text-sm font-medium'>
                     {['10:00 AM', '12:00 PM', '02:00 PM'].map((time) => (
                        <div
                           key={time}
                           className='rounded-md bg-white/10 py-2 text-white/90 transition hover:bg-white/20'
                        >
                           {time}
                        </div>
                     ))}
                  </div>
               </div>

               {/* FINAL STEP: CTA */}
               <Link
                  to='/find-doctors'
                  className='block w-full rounded-full bg-white py-2.5 text-center font-semibold text-blue-600 shadow transition hover:bg-gray-100'
               >
                  Book Appointment
               </Link>
            </div>
         </div>
      </section>
   );
};

export default Appointment;
