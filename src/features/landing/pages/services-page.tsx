import React from 'react';

import {
   ArrowRight,
   BarChart,
   Calendar,
   Check,
   Coffee,
   FileText,
   User,
   Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
   return (
      <div className='pb-20 pt-28'>
         <div className='container mx-auto px-4'>
            {/* Hero Section */}
            <div className='mb-16 text-center'>
               <h1 className='mb-6 text-4xl font-bold text-gray-900 md:text-5xl'>
                  Our Services
               </h1>
               <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                  Comprehensive nutrition and wellness services tailored to your
                  unique needs and goals
               </p>
            </div>

            {/* Services Grid */}
            <div className='mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
               <ServiceCard
                  icon={<User className='text-blue-600' size={32} />}
                  title='One-on-One Consultations'
                  description='Personalized nutrition guidance with our certified dietitians and nutritionists.'
                  features={[
                     'Initial 60-minute comprehensive assessment',
                     'Customized nutrition plan',
                     'Follow-up sessions to track progress',
                     'Email support between sessions',
                  ]}
                  price='$120'
                  unit='per session'
                  linkTo='/find-doctors'
               />
               <ServiceCard
                  icon={<Users className='text-blue-600' size={32} />}
                  title='Group Nutrition Workshops'
                  description='Interactive sessions covering essential nutrition topics in a supportive group setting.'
                  features={[
                     'Small groups of 5-10 participants',
                     'Focused on specific topics (e.g., meal prep, sports nutrition)',
                     'Hands-on activities and demonstrations',
                     'Take-home resources and recipes',
                  ]}
                  price='$45'
                  unit='per workshop'
                  linkTo='/find-doctors'
               />
               <ServiceCard
                  icon={<Calendar className='text-blue-600' size={32} />}
                  title='8-Week Transformation Program'
                  description='Comprehensive program for sustainable lifestyle changes and lasting results.'
                  features={[
                     'Initial assessment and goal setting',
                     'Weekly one-on-one coaching sessions',
                     'Customized meal plans and recipes',
                     'Exercise recommendations',
                     'Ongoing support and accountability',
                  ]}
                  price='$699'
                  unit='full program'
                  linkTo='/find-doctors'
                  featured={true}
               />
               <ServiceCard
                  icon={<FileText className='text-blue-600' size={32} />}
                  title='Personalized Meal Plans'
                  description='Custom meal plans designed around your preferences, needs, and lifestyle.'
                  features={[
                     '7-day meal plans with recipes',
                     'Grocery shopping lists',
                     'Accommodations for dietary restrictions',
                     'Nutritional analysis of all meals',
                     'One revision included',
                  ]}
                  price='$150'
                  unit='per plan'
                  linkTo='/find-doctors'
               />
               <ServiceCard
                  icon={<BarChart className='text-blue-600' size={32} />}
                  title='Nutrition for Athletes'
                  description='Specialized nutrition strategies to optimize athletic performance and recovery.'
                  features={[
                     'Performance nutrition assessment',
                     'Pre/post workout nutrition plans',
                     'Hydration strategies',
                     'Supplement recommendations (if appropriate)',
                     'Periodized nutrition plans for training cycles',
                  ]}
                  price='$150'
                  unit='per session'
                  linkTo='/find-doctors'
               />
               <ServiceCard
                  icon={<Coffee className='text-blue-600' size={32} />}
                  title='Corporate Wellness Programs'
                  description='Nutrition and wellness programs designed for workplace health promotion.'
                  features={[
                     'Lunch and learn presentations',
                     'Group workshops',
                     'Health screenings',
                     'Individual employee consultations',
                     'Customized to company needs and goals',
                  ]}
                  price='Custom'
                  unit='pricing'
                  linkTo='/contact'
               />
            </div>

            {/* Specialized Programs */}
            <div className='mb-20'>
               <div className='mb-12 text-center'>
                  <h2 className='mb-4 text-3xl font-bold text-gray-900'>
                     Specialized Programs
                  </h2>
                  <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                     Targeted nutrition support for specific health concerns and
                     goals
                  </p>
               </div>

               <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                  <SpecializedProgramCard
                     title='Weight Management'
                     description='Sustainable approach to weight loss or gain with personalized strategies that fit your lifestyle.'
                     image='https://images.pexels.com/photos/6551144/pexels-photo-6551144.jpeg'
                     linkTo='/find-doctors'
                  />
                  <SpecializedProgramCard
                     title='Digestive Health'
                     description='Support for IBS, GERD, food sensitivities, and other digestive concerns through dietary modifications.'
                     image='https://images.pexels.com/photos/6157056/pexels-photo-6157056.jpeg'
                     linkTo='/find-doctors'
                  />
                  <SpecializedProgramCard
                     title='Plant-Based Nutrition'
                     description='Guidance for vegetarian and vegan diets to ensure nutritional adequacy and optimal health.'
                     image='https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg'
                     linkTo='/find-doctors'
                  />
                  <SpecializedProgramCard
                     title='Prenatal & Postpartum Nutrition'
                     description='Specialized nutrition support for pregnancy, breastfeeding, and postpartum recovery.'
                     image='https://images.pexels.com/photos/5759905/pexels-photo-5759905.jpeg'
                     linkTo='/find-doctors'
                  />
               </div>
            </div>

            {/* Process Section */}
            <div className='mb-20 rounded-2xl bg-blue-50 p-8 md:p-12'>
               <div className='mb-12 text-center'>
                  <h2 className='mb-4 text-3xl font-bold text-gray-900'>
                     Our Process
                  </h2>
                  <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                     How we work with you to achieve your nutrition and health
                     goals
                  </p>
               </div>

               <div className='mx-auto max-w-4xl'>
                  <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                     <ProcessStep
                        number='01'
                        title='Assessment'
                        description='We begin with a comprehensive assessment of your current health status, nutrition habits, lifestyle, and goals.'
                     />
                     <ProcessStep
                        number='02'
                        title='Personalized Plan'
                        description='Based on your assessment, we create a customized nutrition plan tailored to your unique needs and preferences.'
                     />
                     <ProcessStep
                        number='03'
                        title='Implementation & Support'
                        description='We provide ongoing guidance, accountability, and adjustments to ensure you achieve lasting results.'
                     />
                  </div>
               </div>
            </div>

            {/* FAQ Section */}
            <div className='mb-20'>
               <div className='mb-12 text-center'>
                  <h2 className='mb-4 text-3xl font-bold text-gray-900'>
                     Frequently Asked Questions
                  </h2>
                  <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                     Answers to common questions about our services
                  </p>
               </div>

               <div className='mx-auto max-w-3xl'>
                  <div className='space-y-6'>
                     <FAQItem
                        question='How do I know which service is right for me?'
                        answer='The best service for you depends on your specific goals, health concerns, and preferences. Our one-on-one consultations are a great starting point as they allow us to assess your needs and recommend the most appropriate services. You can also book a free 15-minute discovery call to discuss your situation and get personalized recommendations.'
                     />
                     <FAQItem
                        question='Do you accept insurance?'
                        answer='Some of our services may be covered by insurance, particularly medical nutrition therapy for specific health conditions. We can provide you with the necessary documentation to submit to your insurance provider for potential reimbursement. We recommend checking with your insurance company about coverage for nutrition services before your appointment.'
                     />
                     <FAQItem
                        question='How long will it take to see results?'
                        answer='The timeline for results varies depending on your starting point, goals, and consistency with implementing recommendations. Some clients notice improvements in energy and digestion within a few weeks, while significant changes in body composition or health markers may take 2-3 months or longer. We focus on sustainable, long-term changes rather than quick fixes.'
                     />
                     <FAQItem
                        question='Do I need to follow a specific diet to work with you?'
                        answer="No, we don't promote one-size-fits-all diets. Our approach is to work with your food preferences, cultural background, and lifestyle to create a sustainable nutrition plan. We believe the best diet is one that you can maintain long-term while meeting your nutritional needs and supporting your health goals."
                     />
                     <FAQItem
                        question='Can you accommodate dietary restrictions or food allergies?'
                        answer='Absolutely! We have experience working with various dietary restrictions, food allergies, and intolerances. Whether you follow a vegetarian, vegan, gluten-free, or other specialized diet by choice or necessity, we can create a nutrition plan that meets your needs while ensuring nutritional adequacy.'
                     />
                  </div>
               </div>
            </div>

            {/* CTA Section */}
            <div className='rounded-2xl bg-blue-600 p-8 text-center text-white md:p-12'>
               <h2 className='mb-6 text-3xl font-bold'>
                  Ready to Transform Your Health?
               </h2>
               <p className='mx-auto mb-8 max-w-3xl text-xl'>
                  Book a consultation with one of our nutrition experts and take
                  the first step toward your health goals.
               </p>
               <Link
                  to='/find-doctors'
                  className='inline-block rounded-full bg-white px-10 py-3 text-lg font-bold text-blue-600 transition-all duration-300 hover:bg-gray-100'
               >
                  Book Your Appointment Today
               </Link>
            </div>
         </div>
      </div>
   );
};

const ServiceCard = ({
   icon,
   title,
   description,
   features,
   price,
   unit,
   linkTo,
   featured = false,
}: {
   icon: React.ReactNode;
   title: string;
   description: string;
   features: string[];
   price: string;
   unit: string;
   linkTo: string;
   featured?: boolean;
}) => (
   <div
      className={`flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 ${
         featured
            ? 'z-10 scale-105 transform border-blue-500 shadow-md md:scale-105'
            : 'border-gray-100 hover:shadow-md'
      }`}
   >
      {featured && (
         <div className='bg-blue-600 py-2 text-center font-medium text-white'>
            Most Popular
         </div>
      )}
      <div className='flex-grow p-6'>
         <div className='mb-4'>{icon}</div>
         <h3 className='mb-3 text-xl font-bold text-gray-900'>{title}</h3>
         <p className='mb-6 text-gray-700'>{description}</p>
         <ul className='mb-6 space-y-2'>
            {features.map((feature, index) => (
               <li key={index} className='flex items-start'>
                  <Check
                     size={18}
                     className='mr-2 mt-1 flex-shrink-0 text-blue-600'
                  />
                  <span className='text-gray-700'>{feature}</span>
               </li>
            ))}
         </ul>
      </div>
      <div className='border-t border-gray-100 p-6'>
         <div className='mb-4 flex items-center justify-between'>
            <div>
               <span className='text-2xl font-bold text-gray-900'>{price}</span>
               <span className='text-sm text-gray-600'> {unit}</span>
            </div>
            <Link
               to={linkTo}
               className={`flex items-center font-medium ${
                  featured
                     ? 'text-blue-600 hover:text-blue-700'
                     : 'text-gray-700 hover:text-gray-900'
               }`}
            >
               Learn More <ArrowRight size={16} className='ml-1' />
            </Link>
         </div>
         <Link
            to={linkTo}
            className={`block rounded-full px-4 py-2 text-center font-medium transition-colors duration-300 ${
               featured
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
         >
            Book Now
         </Link>
      </div>
   </div>
);

const SpecializedProgramCard = ({
   title,
   description,
   image,
   linkTo,
}: {
   title: string;
   description: string;
   image: string;
   linkTo: string;
}) => (
   <div className='flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md md:flex-row'>
      <div className='md:w-2/5'>
         <img src={image} alt={title} className='h-full w-full object-cover' />
      </div>
      <div className='flex flex-col justify-between p-6 md:w-3/5'>
         <div>
            <h3 className='mb-3 text-xl font-bold text-gray-900'>{title}</h3>
            <p className='mb-4 text-gray-700'>{description}</p>
         </div>
         <Link
            to={linkTo}
            className='inline-flex items-center font-medium text-blue-600 hover:text-blue-700'
         >
            Learn More <ArrowRight size={16} className='ml-1' />
         </Link>
      </div>
   </div>
);

const ProcessStep = ({
   number,
   title,
   description,
}: {
   number: string;
   title: string;
   description: string;
}) => (
   <div className='rounded-xl bg-white p-6 text-center shadow-sm'>
      <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white'>
         {number}
      </div>
      <h3 className='mb-3 text-xl font-bold text-gray-900'>{title}</h3>
      <p className='text-gray-700'>{description}</p>
   </div>
);

const FAQItem = ({
   question,
   answer,
}: {
   question: string;
   answer: string;
}) => (
   <div className='rounded-xl bg-white p-6 shadow-sm'>
      <h3 className='mb-3 text-lg font-bold text-gray-900'>{question}</h3>
      <p className='text-gray-700'>{answer}</p>
   </div>
);

export default ServicesPage;
