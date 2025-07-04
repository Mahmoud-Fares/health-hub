import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

const ContactUs = () => {
   return (
      <div className='min-h-screen bg-gradient-to-br from-white to-blue-50 px-4 py-24 md:px-16'>
         <div className='mx-auto max-w-5xl text-center'>
            {/* Heading */}
            <motion.h1
               className='mb-6 text-4xl font-extrabold tracking-tight text-blue-800 md:text-5xl'
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
            >
               Get in Touch With Us
            </motion.h1>

            {/* Call to Collaborate Section */}
            <div className='mt-14 rounded-3xl border border-blue-200 bg-white px-8 py-10 text-left shadow-xl'>
               <motion.h2
                  className='mb-6 text-3xl font-bold text-blue-900 md:text-4xl'
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
               >
                  🤝 Interested in Partnering with Health Hub?
               </motion.h2>

               <p className='mb-4 text-base leading-relaxed text-gray-700 md:text-lg'>
                  Whether you're a certified{' '}
                  <span className='font-semibold text-blue-700'>doctor</span>,
                  licensed
                  <span className='font-semibold text-blue-700'>
                     {' '}
                     nutritionist
                  </span>
                  , experienced
                  <span className='font-semibold text-blue-700'>
                     {' '}
                     fitness coach
                  </span>
                  , or a reputable
                  <span className='font-semibold text-blue-700'>
                     {' '}
                     health product provider
                  </span>
                  , we’re always excited to build meaningful collaborations.
               </p>

               <div className='mb-4 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-5 shadow-sm'>
                  <p className='font-medium text-blue-900'>
                     🌱 If you're passionate about improving lives through
                     wellness, nutrition, and health education — you're exactly
                     who we’re looking for.
                  </p>
               </div>

               <p className='mb-6 text-base leading-relaxed text-gray-700 md:text-lg'>
                  Our community is growing, and we believe in working with
                  like-minded professionals who are ready to make an impact.
               </p>

               <div className='mb-8 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-5 shadow-sm'>
                  <p className='font-medium text-yellow-800'>
                     💬 Have feedback, suggestions, or even a complaint? We
                     value your input and would love to hear from you.
                  </p>
               </div>
            </div>

            {/* Contact Options */}
            <div className='mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2'>
               <ContactCard
                  icon={<Mail className='text-blue-600' />}
                  title='Email'
                  content='Send us an email directly'
                  link='mailto:healthhub.team@example.com'
                  label='healthhub.team@example.com'
               />
               <ContactCard
                  icon={<Phone className='text-green-600' />}
                  title='WhatsApp'
                  content='Message us on WhatsApp'
                  link='https://wa.me/201234567890'
                  label='+20 123 456 7890'
               />
               <ContactCard
                  icon={<Facebook className='text-blue-700' />}
                  title='Facebook'
                  content='Follow and message us'
                  link='https://facebook.com/healthhub.official'
                  label='@healthhub.official'
               />
               <ContactCard
                  icon={<Instagram className='text-pink-600' />}
                  title='Instagram'
                  content='Follow us for daily tips'
                  link='https://instagram.com/healthhub.official'
                  label='@healthhub.official'
               />
            </div>
         </div>
      </div>
   );
};

const ContactCard = ({
   icon,
   title,
   content,
   link,
   label,
}: {
   icon: React.ReactNode;
   title: string;
   content: string;
   link: string;
   label: string;
}) => (
   <motion.a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
   >
      <div className='shrink-0 rounded-full bg-blue-100 p-3 shadow-inner'>
         {icon}
      </div>
      <div>
         <h3 className='mb-1 text-xl font-bold text-blue-900'>{title}</h3>
         <p className='text-sm text-gray-600'>{content}</p>
         <span className='mt-2 block text-sm font-medium text-blue-600'>
            {label}
         </span>
      </div>
   </motion.a>
);

export default ContactUs;
