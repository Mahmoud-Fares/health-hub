import React from 'react';

import {
   Facebook,
   Instagram,
   Mail,
   Phone,
   Twitter,
   Youtube,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import ChatBot from '@/features/landing/components/chat-bot';
import ScrollToTopButton from '@/features/landing/components/scroll-to-top-button';

const Footer = () => {
   return (
      <footer className='bg-gray-900 pb-8 pt-16 text-white'>
         <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
               <div>
                  <a href=''>
                     <img
                        src='/images/health hub removed TRY.png'
                        style={{ width: '375px', height: '72px' }}
                        alt='logo'
                        className='relative -ml-6'
                     />
                  </a>
                  <p className='mb-4 mt-6 text-gray-300'>
                     Empowering healthier lives through nutrition education,
                     fitness guidance, and personalized wellness plans.
                  </p>
                  <div className='flex space-x-4'>
                     <SocialIcon icon={<Facebook size={20} />} />
                     <SocialIcon icon={<Twitter size={20} />} />
                     <SocialIcon icon={<Instagram size={20} />} />
                     <SocialIcon icon={<Youtube size={20} />} />
                  </div>
               </div>

               {/* Quick Links */}
               <div>
                  <h3 className='mb-4 text-2xl font-bold text-blue-300'>
                     Quick Links
                  </h3>
                  <ul className='ml-2 space-y-4'>
                     <FooterLink to='/articles' label='Articles' />
                     <FooterLink to='/workout-videos' label='Workout Videos' />
                     <FooterLink to='/services' label='Services' />
                     <FooterLink to='/about' label='About Us' />
                     <FooterLink to='/testimonials' label='Testimonials' />
                  </ul>
               </div>
               <div>
                  <h3 className='mb-4 text-2xl font-bold text-blue-300'>
                     {' '}
                     Features
                  </h3>

                  <ul className='space-y-4'>
                     <FooterLink
                        to='/calculators'
                        label='Nutrition Calculators'
                     />
                     <FooterLink to='/food-scanner' label='Food Scanner' />
                     <FooterLink to='/store' label='E-Commerce' />
                     <FooterLink to='/find-doctors' label='Book Appointment' />
                     <FooterLink to='/findDr' label='Find Doctors' />
                  </ul>
               </div>

               {/* Contact Info */}

               <div>
                  <h3 className='mb-4 text-2xl font-bold text-blue-300'>
                     Contact Us
                  </h3>
                  <ul className='space-y-4 text-sm text-gray-300'>
                     <li className='group flex flex-wrap items-center gap-3'>
                        <div className='rounded-full bg-blue-100 p-2'>
                           <Mail size={18} className='text-blue-600' />
                        </div>
                        <a
                           href='mailto:healthhub.team@example.com'
                           className='font-medium text-gray-300 transition group-hover:text-white'
                        >
                           healthhub.team@example.com
                        </a>
                     </li>
                     <li className='group flex flex-wrap items-center gap-3'>
                        <div className='rounded-full bg-green-100 p-2'>
                           <Phone size={18} className='text-green-600' />
                        </div>
                        <a
                           href='https://wa.me/201234567890'
                           target='_blank'
                           rel='noopener noreferrer'
                           className='font-medium text-gray-300 transition group-hover:text-white'
                        >
                           +20 123 456 7890 (WhatsApp)
                        </a>
                     </li>
                     <li className='group flex flex-wrap items-center gap-3'>
                        <div className='rounded-full bg-blue-200 p-2'>
                           <Facebook size={18} className='text-blue-700' />
                        </div>
                        <a
                           href='https://facebook.com/healthhub.official'
                           target='_blank'
                           rel='noopener noreferrer'
                           className='font-medium text-gray-300 transition group-hover:text-white'
                        >
                           facebook.com/healthhub.official
                        </a>
                     </li>
                     <li className='group flex flex-wrap items-center gap-3'>
                        <div className='rounded-full bg-pink-100 p-2'>
                           <Instagram size={18} className='text-pink-600' />
                        </div>
                        <a
                           href='https://instagram.com/healthhub.official'
                           target='_blank'
                           rel='noopener noreferrer'
                           className='font-medium text-gray-300 transition group-hover:text-white'
                        >
                           instagram.com/healthhub.official
                        </a>
                     </li>
                  </ul>
               </div>
            </div>

            <hr className='my-8 border-gray-800' />

            <div className='flex flex-col items-center justify-between md:flex-row'>
               <p className='text-sm text-gray-400'>
                  &copy; {new Date().getFullYear()} HealthHub. All rights
                  reserved.
               </p>
               <div className='mt-4 flex space-x-6 md:mt-0'>
                  <Link
                     to='/privacy-policy'
                     className='text-sm text-gray-400 hover:text-white'
                  >
                     Privacy Policy
                  </Link>
                  <Link
                     to='/terms-of-service'
                     className='text-sm text-gray-400 hover:text-white'
                  >
                     Terms of Service
                  </Link>
                  <Link
                     to='/sitemap'
                     className='text-sm text-gray-400 hover:text-white'
                  >
                     Sitemap
                  </Link>
               </div>
            </div>
         </div>
         <ScrollToTopButton />
         <ChatBot/>
      </footer>
   );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
   <a
      href='#'
      className='rounded-full bg-gray-800 p-2 transition-colors duration-300 hover:bg-blue-600'
   >
      {icon}
   </a>
);

const FooterLink = ({ to, label }: { to: string; label: string }) => (
   <li>
      <Link
         to={to}
         className='text-gray-300 transition-colors duration-300 hover:text-blue-400'
      >
         {label}
      </Link>
   </li>
);

export default Footer;
