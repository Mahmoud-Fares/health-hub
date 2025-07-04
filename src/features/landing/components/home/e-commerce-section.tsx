import { useState } from 'react';

import { useKeenSlider } from 'keen-slider/react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
   { id: 1, name: 'Protein Bar', image: '/images/protein-bar.jpeg' },
   { id: 2, name: 'Vegan Chips', image: '/images/vegan-chips.jpg' },
   { id: 3, name: 'Omega-3 Capsules', image: '/images/omega3.jpeg' },
   { id: 4, name: 'Matcha Tea', image: '/images/matcha.jpeg' },
   {
      id: 5,
      name: 'Electrolyte Water',
      image: '/images/electrolyte.jpeg',
   },
   { id: 6, name: 'Gluten-Free Cookies', image: '/images/cookies.jpeg' },
   { id: 7, name: 'Organic Granola', image: '/images/granola.jpeg' },
   { id: 8, name: 'Superfood Mix', image: '/images/superfood.jpg' },
   { id: 9, name: 'Energy Drink', image: '/images/energy-drink.jpeg' },
];

const Ecommercesec = () => {
   const [sliderRef] = useKeenSlider<HTMLDivElement>({
      loop: true,
      slides: {
         perView: 3,
         spacing: 20,
      },
      breakpoints: {
         '(max-width: 768px)': {
            slides: { perView: 1 },
         },
         '(min-width: 769px) and (max-width: 1024px)': {
            slides: { perView: 2 },
         },
      },
      renderMode: 'performance',
      created: (instance) => {
         setInterval(() => instance.next(), 1500);
      },
   });

   const [revealed, setRevealed] = useState(false);

   return (
      <section className='relative overflow-hidden bg-gradient-to-br from-blue-100 to-white py-32 text-gray-900'>
         {/* Overlay Reveal Slide */}
         <div
            className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-1000 ${
               revealed ? 'pointer-events-none' : ''
            }`}
         >
            <div className='absolute inset-0 flex h-full w-full'>
               <div
                  className={`h-full w-1/2 rounded-br-[60%] rounded-tr-[60%] bg-gradient-to-r from-gray-900 to-blue-500 transition-transform duration-1000 ease-in-out ${
                     revealed ? '-translate-x-full' : 'translate-x-0'
                  }`}
               />
               <div
                  className={`h-full w-1/2 rounded-bl-[60%] rounded-tl-[60%] bg-gradient-to-l from-blue-900 to-cyan-400 transition-transform duration-1000 ease-in-out ${
                     revealed ? 'translate-x-full' : 'translate-x-0'
                  }`}
               />
            </div>
            <div
               className={`relative z-10 cursor-pointer transition-opacity duration-1000 ${
                  revealed ? 'opacity-0' : 'opacity-100'
               }`}
               onClick={() => setRevealed(true)}
            >
               <div className='flex h-64 w-64 animate-[float_3s_ease-in-out_infinite] items-center justify-center rounded-full border-[10px] border-white bg-gradient-to-br from-white via-blue-50 to-white shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl'>
                  <span className='text-2xl font-extrabold text-blue-700 drop-shadow-md'>
                     click Here
                  </span>
               </div>
            </div>
         </div>

         {/* Carousel */}
         <div
            className={`container relative z-10 mx-auto mt-20 px-6 transition-opacity duration-1000 ${
               revealed ? 'opacity-100' : 'opacity-0'
            }`}
         >
            <div ref={sliderRef} className='keen-slider'>
               {products.map((product) => (
                  <Link
                     to='/e-commerce'
                     key={product.id}
                     className='keen-slider__slide rounded-2xl bg-white p-6 text-center shadow-xl transition-transform hover:scale-105'
                  >
                     <img
                        src={product.image}
                        alt={product.name}
                        className='mb-4 h-40 w-full object-contain'
                     />
                     <h4 className='text-lg font-semibold text-gray-700'>
                        {product.name}
                     </h4>
                  </Link>
               ))}
            </div>

            {/* CTA Button */}
            <div className='mt-24 text-center'>
               <Link
                  to='/e-commerce'
                  className='inline-flex animate-bounce items-center rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 px-10 py-4 text-xl font-bold text-white shadow-2xl transition-transform hover:scale-110'
               >
                  <ShoppingCart className='mr-2 h-6 w-6' />
                  Shop Now
               </Link>
            </div>
         </div>
      </section>
   );
};

export default Ecommercesec;
