import { useEffect, useState } from 'react';

import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Sample testimonial data
const testimonials = [
   {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Weight Loss Journey',
      quote: "The personalized nutrition plan completely transformed my relationship with food. I've lost 30 pounds and kept it off for over a year now!",
      rating: 5,
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
   },
   {
      id: 2,
      name: 'David Chen',
      role: 'Athletic Performance',
      quote: 'As a competitive runner, the nutrition advice I received helped me improve my recovery time and performance. My race times have never been better.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
   },
   {
      id: 3,
      name: 'Maria Rodriguez',
      role: 'Health Recovery',
      quote: 'After being diagnosed with high blood pressure, the dietary guidance I got helped me bring my numbers down naturally within 3 months!',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
   },
];

const TestimonialSlider = () => {
   const [currentSlide, setCurrentSlide] = useState(0);

   const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
   };

   const prevSlide = () => {
      setCurrentSlide(
         (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
   };

   useEffect(() => {
      const interval = setInterval(() => {
         nextSlide();
      }, 8000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className='relative'>
         <div className='overflow-hidden'>
            <div
               className='flex transition-transform duration-500 ease-in-out'
               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
               {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className='w-full flex-shrink-0'>
                     <div className='mx-auto max-w-4xl rounded-xl border border-gray-100 bg-white p-8 shadow-sm'>
                        <div className='flex flex-col items-center md:flex-row'>
                           <div className='mb-6 flex justify-center md:mb-0 md:w-1/3'>
                              <img
                                 src={testimonial.image}
                                 alt={testimonial.name}
                                 className='h-24 w-24 rounded-full border-4 border-blue-100 object-cover md:h-32 md:w-32'
                              />
                           </div>
                           <div className='md:w-2/3 md:pl-8'>
                              <div className='mb-3 flex'>
                                 {Array.from({
                                    length: testimonial.rating,
                                 }).map((_, i) => (
                                    <Star
                                       key={i}
                                       size={20}
                                       className='fill-yellow-400 text-yellow-400'
                                    />
                                 ))}
                              </div>
                              <blockquote className='mb-4 text-xl italic text-gray-700'>
                                 "{testimonial.quote}"
                              </blockquote>
                              <div>
                                 <p className='font-bold text-gray-900'>
                                    {testimonial.name}
                                 </p>
                                 <p className='text-blue-600'>
                                    {testimonial.role}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Navigation buttons */}
         <button
            className='absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 text-gray-800 shadow-md transition-colors duration-300 hover:bg-blue-50'
            onClick={prevSlide}
            aria-label='Previous testimonial'
         >
            <ChevronLeft size={24} />
         </button>
         <button
            className='absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 text-gray-800 shadow-md transition-colors duration-300 hover:bg-blue-50'
            onClick={nextSlide}
            aria-label='Next testimonial'
         >
            <ChevronRight size={24} />
         </button>

         {/* Indicators */}
         <div className='mt-8 flex justify-center space-x-2'>
            {testimonials.map((_, index) => (
               <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                     currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
               />
            ))}
         </div>
      </div>
   );
};

export default TestimonialSlider;
