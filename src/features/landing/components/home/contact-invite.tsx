import { Handshake, HeartPulse, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactInvite = () => {
   return (
      <section className='rounded-3xl bg-gradient-to-br from-gray-50 via-teal-50 to-cyan-50 px-6 py-28 shadow-xl md:px-20'>
         <div className='mx-auto max-w-5xl space-y-8 text-center'>
            <h2 className='text-3xl font-extrabold text-gray-900 md:text-4xl'>
               We’re Here For You — Whoever You Are
            </h2>

            <p className='mx-auto max-w-3xl text-lg text-gray-700 md:text-xl'>
               Whether you're a{' '}
               <span className='font-semibold text-blue-800'>Doctor</span>{' '}
               looking to join our network, a{' '}
               <span className='font-semibold text-green-700'>Patient</span>{' '}
               seeking better health, or a{' '}
               <span className='font-semibold text-indigo-700'>Partner</span>{' '}
               who shares our mission — we're just one message away.
            </p>

            <div className='flex flex-col items-center justify-center gap-6 md:flex-row'>
               <div className='flex items-center gap-3 text-gray-800'>
                  <Stethoscope className='h-6 w-6 text-blue-700' />
                  <span className='font-medium'>Healthcare Professionals</span>
               </div>
               <div className='flex items-center gap-3 text-gray-800'>
                  <HeartPulse className='h-6 w-6 text-green-600' />
                  <span className='font-medium'>Patients & Users</span>
               </div>
               <div className='flex items-center gap-3 text-gray-800'>
                  <Handshake className='h-6 w-6 text-indigo-600' />
                  <span className='font-medium'>Vendors & Partners</span>
               </div>
            </div>

            <Link
               to='/contact'
               className='mt-6 inline-block rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 px-8 py-3 font-semibold text-white shadow-md transition hover:opacity-90'
            >
               Contact Us Now
            </Link>
         </div>
      </section>
   );
};

export default ContactInvite;
