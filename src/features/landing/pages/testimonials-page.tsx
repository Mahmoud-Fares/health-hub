import { Quote, Star } from 'lucide-react';

// Sample testimonial data
const testimonials = [
   {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Weight Loss Journey',
      quote: "The personalized nutrition plan completely transformed my relationship with food. I've lost 30 pounds and kept it off for over a year now! What I appreciate most is that I never feel deprived - I've learned how to enjoy my favorite foods in moderation while making healthier choices overall.",
      rating: 5,
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
      program: 'One-on-One Consultations',
      beforeImage:
         'https://images.pexels.com/photos/6551126/pexels-photo-6551126.jpeg',
      afterImage:
         'https://images.pexels.com/photos/6551127/pexels-photo-6551127.jpeg',
      results: 'Lost 30 pounds in 6 months and improved energy levels',
      longQuote:
         "Before working with NutriLife, I had tried countless diets with only temporary success. The personalized approach made all the difference. My nutritionist took the time to understand my lifestyle, preferences, and challenges. Together, we created a sustainable plan that worked for me. The regular check-ins kept me accountable, and the education I received has empowered me to make informed choices about my nutrition. This isn't just a diet - it's a complete lifestyle change that I can maintain long-term.",
   },
   {
      id: 2,
      name: 'David Chen',
      role: 'Athletic Performance',
      quote: 'As a competitive runner, the nutrition advice I received helped me improve my recovery time and performance. My race times have never been better, and I feel stronger during training. The sports nutrition program taught me how to properly fuel before, during, and after workouts.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      program: 'Nutrition for Athletes',
      results: 'Improved marathon time by 15 minutes and enhanced recovery',
      longQuote:
         "I used to think that training harder was the only way to improve my performance, but working with NutriLife showed me that nutrition plays an equally important role. My nutritionist created a periodized nutrition plan that aligned with my training cycles, helping me fuel properly for different types of workouts. I've learned strategies for pre-race nutrition, mid-race fueling, and recovery that have made a significant difference in my performance. Not only have my race times improved, but I recover faster between workouts and have more consistent energy throughout my training.",
   },
   {
      id: 3,
      name: 'Maria Rodriguez',
      role: 'Health Recovery',
      quote: 'After being diagnosed with high blood pressure, the dietary guidance I got helped me bring my numbers down naturally within 3 months! The meal plans were delicious and easy to follow, and I never felt like I was on a restrictive "diet." I\'m grateful for the knowledge and support.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      program: 'Personalized Meal Plans',
      results:
         'Reduced blood pressure from 150/95 to 125/80 without medication',
      longQuote:
         "When my doctor told me I needed to make dietary changes to address my high blood pressure, I felt overwhelmed and didn't know where to start. The team at NutriLife made the process so much easier. They created meal plans that incorporated foods I enjoy while reducing sodium and increasing potassium-rich foods that support healthy blood pressure. The recipes were delicious and family-friendly, which made it easier to stick with the changes. I'm proud to say that I've been able to manage my blood pressure through nutrition and lifestyle changes, avoiding medication. The education I received has empowered me to take control of my health.",
   },
   {
      id: 4,
      name: 'James Wilson',
      role: 'Digestive Health',
      quote: 'I struggled with IBS for years before finding NutriLife. The elimination diet protocol and subsequent reintroduction phase helped me identify my trigger foods. Now I can enjoy meals without anxiety about symptoms. The difference in my quality of life is remarkable.',
      rating: 5,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      program: 'Specialized Programs - Digestive Health',
      results: 'Identified food triggers and reduced IBS symptoms by 90%',
      longQuote:
         'Living with IBS meant that eating was often a source of anxiety rather than enjoyment. I never knew which meals would trigger symptoms, which made social situations and travel particularly stressful. Working with a nutritionist who specializes in digestive health was life-changing. Through a carefully managed elimination diet and systematic reintroduction process, we identified my specific trigger foods. I received support throughout the entire process, including meal ideas and recipes that made the elimination phase manageable. Now I have a clear understanding of which foods I need to avoid and which I can enjoy freely. I feel in control of my digestive health for the first time in years.',
   },
   {
      id: 5,
      name: 'Emma Davis',
      role: 'Plant-Based Transition',
      quote: 'Transitioning to a plant-based diet seemed daunting until I worked with NutriLife. They ensured my new diet was nutritionally complete and introduced me to delicious recipes that satisfied even my non-vegan family members. The guidance on plant-based protein sources was particularly helpful.',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      program: 'Specialized Programs - Plant-Based Nutrition',
      results:
         'Successfully transitioned to a nutritionally complete plant-based diet',
      longQuote:
         "I wanted to transition to a plant-based diet for ethical and environmental reasons, but I was concerned about getting adequate nutrition, especially protein, iron, and B12. My nutritionist at NutriLife was incredibly knowledgeable about plant-based nutrition and helped me create a well-rounded diet that met all my nutritional needs. They introduced me to new ingredients and cooking techniques that expanded my culinary horizons. The meal plans and recipes were so delicious that my family, who initially resisted the change, now regularly enjoys plant-based meals with me. I feel healthier and more energetic, and I'm confident that I'm meeting all my nutritional needs while aligning my diet with my values.",
   },
   {
      id: 6,
      name: 'Michael Chang',
      role: 'Corporate Wellness Participant',
      quote: "Our company brought in NutriLife for a corporate wellness program, and it's been transformative for our workplace. The lunch and learn sessions are informative and engaging, and many employees have made significant health improvements. As someone who travels frequently for work, the strategies for healthy eating on the road have been invaluable.",
      rating: 5,
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      program: 'Corporate Wellness Programs',
      results: 'Improved workplace health metrics and employee satisfaction',
      longQuote:
         "As the HR director who initiated our company's partnership with NutriLife, I've been thrilled with the results of our corporate wellness program. The team created a customized program that addressed the specific challenges our employees face, including long hours, frequent travel, and high-stress periods. The combination of group workshops, individual consultations, and ongoing resources has led to measurable improvements in our workplace health metrics. Employees report higher energy levels, better focus, and fewer sick days. The program has also boosted morale and created a culture of wellness within our organization. The return on investment has been clear, both in terms of healthcare costs and productivity.",
   },
];

const TestimonialsPage = () => {
   return (
      <div className='pb-20 pt-28'>
         <div className='container mx-auto px-4'>
            {/* Hero Section */}
            <div className='mb-16 text-center'>
               <h1 className='mb-6 text-4xl font-bold text-gray-900 md:text-5xl'>
                  Success Stories
               </h1>
               <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                  Real results from real clients who have transformed their
                  health and wellness with our nutrition guidance
               </p>
            </div>

            {/* Featured Testimonial */}
            <div className='mb-20 overflow-hidden rounded-2xl bg-blue-50'>
               <div className='grid grid-cols-1 lg:grid-cols-2'>
                  <div className='flex flex-col justify-center p-8 md:p-12'>
                     <div className='mb-4 flex'>
                        {Array.from({ length: testimonials[0].rating }).map(
                           (_, i) => (
                              <Star
                                 key={i}
                                 size={24}
                                 className='fill-yellow-400 text-yellow-400'
                              />
                           )
                        )}
                     </div>
                     <blockquote className='relative mb-6 text-xl italic text-gray-700 md:text-2xl'>
                        <Quote
                           size={48}
                           className='absolute -left-6 -top-6 text-blue-200 opacity-50'
                        />
                        "{testimonials[0].quote}"
                     </blockquote>
                     <div className='flex items-center'>
                        <img
                           src={testimonials[0].image}
                           alt={testimonials[0].name}
                           className='mr-4 h-16 w-16 rounded-full object-cover'
                        />
                        <div>
                           <p className='font-bold text-gray-900'>
                              {testimonials[0].name}
                           </p>
                           <p className='text-blue-600'>
                              {testimonials[0].role}
                           </p>
                           <p className='text-sm text-gray-600'>
                              {testimonials[0].program}
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className='flex flex-col justify-center bg-white p-8'>
                     <h3 className='mb-4 text-xl font-bold text-gray-900'>
                        Transformation Results
                     </h3>
                     <p className='mb-6 text-gray-700'>
                        {testimonials[0].results}
                     </p>
                     <div className='grid grid-cols-2 gap-4'>
                        <div>
                           <p className='mb-2 text-sm text-gray-600'>Before</p>
                           <img
                              src={testimonials[0].beforeImage}
                              alt='Before transformation'
                              className='h-48 w-full rounded-lg object-cover'
                           />
                        </div>
                        <div>
                           <p className='mb-2 text-sm text-gray-600'>After</p>
                           <img
                              src={testimonials[0].afterImage}
                              alt='After transformation'
                              className='h-48 w-full rounded-lg object-cover'
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Testimonial Grid */}
            <div className='mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
               {testimonials.slice(1).map((testimonial) => (
                  <TestimonialCard
                     key={testimonial.id}
                     testimonial={testimonial}
                  />
               ))}
            </div>

            {/* Client Stories */}
            <div className='mb-20'>
               <div className='mb-12 text-center'>
                  <h2 className='mb-4 text-3xl font-bold text-gray-900'>
                     Client Stories
                  </h2>
                  <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                     Detailed accounts of how our nutrition guidance has
                     impacted lives
                  </p>
               </div>

               <div className='space-y-12'>
                  {testimonials.slice(0, 3).map((testimonial) => (
                     <ClientStory
                        key={testimonial.id}
                        testimonial={testimonial}
                     />
                  ))}
               </div>
            </div>

            {/* Results by the Numbers */}
            <div className='mb-20 rounded-2xl bg-blue-600 p-8 text-white md:p-12'>
               <div className='mb-12 text-center'>
                  <h2 className='mb-4 text-3xl font-bold'>
                     Results by the Numbers
                  </h2>
                  <p className='mx-auto max-w-3xl text-xl'>
                     The impact of our nutrition programs across hundreds of
                     clients
                  </p>
               </div>

               <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
                  <StatCard
                     number='94%'
                     text='of clients achieve their primary health goal'
                  />
                  <StatCard
                     number='28 lbs'
                     text='average weight loss for weight management clients'
                  />
                  <StatCard
                     number='85%'
                     text='reduction in digestive symptoms for IBS clients'
                  />
                  <StatCard number='96%' text='client satisfaction rating' />
               </div>
            </div>

            {/* CTA Section */}
            <div className='rounded-2xl bg-gray-50 p-8 text-center md:p-12'>
               <h2 className='mb-6 text-3xl font-bold text-gray-900'>
                  Ready to Write Your Success Story?
               </h2>
               <p className='mx-auto mb-8 max-w-3xl text-xl text-gray-700'>
                  Join our community of clients who have transformed their
                  health with personalized nutrition guidance.
               </p>
               <a
                  href='/find-doctors'
                  className='inline-block rounded-full bg-blue-600 px-10 py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-blue-700'
               >
                  Book Your Consultation Today
               </a>
            </div>
         </div>
      </div>
   );
};

interface Testimonial {
   id: number;
   name: string;
   role: string;
   quote: string;
   rating: number;
   image: string;
   program: string;
   beforeImage?: string;
   afterImage?: string;
   results: string;
   longQuote: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
   <div className='flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md'>
      <div className='mb-4 flex'>
         {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
               key={i}
               size={16}
               className='fill-yellow-400 text-yellow-400'
            />
         ))}
      </div>
      <blockquote className='mb-6 flex-grow italic text-gray-700'>
         "
         {testimonial.quote.length > 200
            ? `${testimonial.quote.substring(0, 200)}...`
            : testimonial.quote}
         "
      </blockquote>
      <div className='flex items-center'>
         <img
            src={testimonial.image}
            alt={testimonial.name}
            className='mr-4 h-12 w-12 rounded-full object-cover'
         />
         <div>
            <p className='font-bold text-gray-900'>{testimonial.name}</p>
            <p className='text-sm text-blue-600'>{testimonial.role}</p>
         </div>
      </div>
   </div>
);

const ClientStory = ({ testimonial }: { testimonial: Testimonial }) => (
   <div className='rounded-xl border border-gray-100 bg-white p-8 shadow-sm'>
      <div className='flex flex-col md:flex-row'>
         <div className='mb-6 md:mb-0 md:w-1/4'>
            <img
               src={testimonial.image}
               alt={testimonial.name}
               className='mx-auto h-24 w-24 rounded-full object-cover md:mx-0 md:h-32 md:w-32'
            />
         </div>
         <div className='md:w-3/4 md:pl-8'>
            <h3 className='mb-2 text-2xl font-bold text-gray-900'>
               {testimonial.name}'s Journey
            </h3>
            <p className='mb-4 text-blue-600'>{testimonial.program}</p>
            <div className='mb-4 flex'>
               {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                     key={i}
                     size={20}
                     className='fill-yellow-400 text-yellow-400'
                  />
               ))}
            </div>
            <p className='mb-4 text-gray-700'>
               <span className='font-medium'>Results:</span>{' '}
               {testimonial.results}
            </p>
            <blockquote className='italic text-gray-700'>
               "{testimonial.longQuote}"
            </blockquote>
         </div>
      </div>
   </div>
);

const StatCard = ({ number, text }: { number: string; text: string }) => (
   <div className='rounded-xl bg-white bg-opacity-10 p-6 text-center'>
      <p className='mb-2 text-4xl font-bold'>{number}</p>
      <p className='text-lg'>{text}</p>
   </div>
);

export default TestimonialsPage;
