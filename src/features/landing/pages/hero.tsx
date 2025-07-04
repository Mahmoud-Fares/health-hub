import React, { useEffect, useState } from 'react';

interface ServiceCardProps {
   icon: string;
   title: string;
   description?: string;
   items?: string[];
   bgColor: string;
   isMiddle?: boolean;
   name: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
   icon,
   title,
   description,
   items,
   bgColor,
   isMiddle = false,
}) => {
   return (
      <div className='relative w-full px-0 lg:w-1/3'>
         {isMiddle && (
            <>
               <span
                  className='absolute bottom-[-1px] left-[-70px] z-0 h-0 w-0'
                  style={{
                     borderBottom: '80px solid transparent',
                     borderRight: '70px solid #a0cff7',
                  }}
               />
               <span
                  className='absolute bottom-[-1px] right-[-70px] z-0 h-0 w-0'
                  style={{
                     borderBottom: '80px solid transparent',
                     borderLeft: '70px solid #a0cff7',
                  }}
               />
            </>
         )}

         <div
            className={`relative ${
               isMiddle ? 'min-h-[410px]' : 'min-h-[370px]'
            } z-10 -mt-[350px] p-12 transition-all duration-300 hover:shadow-2xl ${bgColor} text-white shadow-lg`}
            data-middle={isMiddle ? 'true' : 'false'}
         >
            <div className='flex flex-col items-center'>
               <span className='mb-6 text-7xl'>
                  <i className={`fa ${icon}`} aria-hidden='true'></i>
               </span>
               <h3 className='mb-4 text-4xl font-semibold text-black'>
                  {title}
               </h3>
               {description && (
                  <p className='text-center text-lg font-light'>
                     {description}
                  </p>
               )}
               {items && (
                  <ul className='ml-12 list-none space-y-4 p-0 text-center text-sm font-light'>
                     {items.map((item, index) => (
                        <li key={index} className='flex items-start text-lg'>
                           <span className='mr-2'>✅</span>
                           {item}
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         </div>
      </div>
   );
};

const HeroSection: React.FC = () => {
   const words = [
      'Welcome to Health Hub',
      'We Care Your Health!',
      'In ALL Ways',
   ];
   const speed = 150;
   const pause = 1000;

   const [text, setText] = useState('');
   const [wordIndex, setWordIndex] = useState(0);
   const [letterIndex, setLetterIndex] = useState(0);
   const [isDeleting, setIsDeleting] = useState(false);

   useEffect(() => {
      const currentWord = words[wordIndex];

      const type = () => {
         const updatedText = isDeleting
            ? currentWord.substring(0, letterIndex - 1)
            : currentWord.substring(0, letterIndex + 1);

         setText(updatedText);

         if (!isDeleting && updatedText === currentWord) {
            setTimeout(() => setIsDeleting(true), pause);
         } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
         }

         setLetterIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
      };

      const timeout = setTimeout(type, isDeleting ? speed / 2 : speed);
      return () => clearTimeout(timeout);
   }, [letterIndex, isDeleting]);

   const services = [
      {
         icon: 'fas fa-utensils',
         title: 'AI Food Scanner',
         description:
            'Snap your meal and get instant nutrition facts, ingredients, and a healthy recipe—powered by AI.',
         bgColor: 'bg-[#2895f1]',
         isMiddle: false,
         name: 'first',
      },
      {
         icon: 'fa-solid fa-apple-whole',
         title: 'Doctors',
         items: [
            'Personalized Meal Plans',
            'Weight & Health Management',
            'Ongoing Support',
         ],
         bgColor: 'bg-[#0071d1]',
         isMiddle: true,
         name: 'middle',
      },
      {
         icon: 'fa-shopping-cart',
         title: 'E-commerce',
         description:
            'Shop healthy snacks, supplements, and fitness essentials—all curated for your wellness journey.',
         bgColor: 'bg-[#0060b1]',
         isMiddle: false,
         name: 'third',
      },
   ];

   return (
      <div className="font-[\\'Poppins\\']">
         {/* Hero Section */}
         <div
            id='home'
            className='flex items-center justify-center'
            style={{
               backgroundImage: "url('/images/banner111.webp')",
               backgroundSize: 'cover',
               backgroundAttachment: 'fixed',
               backgroundPosition: '0px -12.48px',
               height: '100%',
               width: '100%',
               display: 'block',
               overflow: 'hidden',
               padding: '1em 0',
               // marginTop: '60px',
               position: 'relative',
               minHeight: '650px',
               visibility: 'visible',
               animationName: 'fadeIn',
            }}
         >
            <div className='text-center'>
               <div className='mb-4 flex justify-center'>
                  <div className='mt-[35px] flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#39b49b] bg-white'>
                     <img
                        src='/images/icon-logo.png'
                        alt='Icon'
                        className='h-16 w-16 object-contain'
                     />
                  </div>
               </div>
               <a href='/' className='typewrite'>
                  <span
                     className='text-6xl font-thin text-black'
                     style={{ fontFamily: "'Arial', sans-serif" }}
                  >
                     {text}
                  </span>
               </a>
            </div>
         </div>

         {/* Time Table Section */}
         <div id='time-table' className='time-table-section'>
            <div className='container mx-auto px-4'>
               <div className='-mx-4 flex flex-wrap items-start'>
                  {services.map((service, index) => (
                     <ServiceCard
                        key={index}
                        {...service}
                        isMiddle={service.isMiddle}
                        name={service.name}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default HeroSection;
