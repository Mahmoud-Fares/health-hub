import { Calendar, CheckCircle2, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

import { useAuth } from '@/features/auth';

export default function Home() {
   const { isAuthenticated } = useAuth();

   return (
      <>
         {/* Hero Section */}
         <section className='bg-gradient-to-b from-background to-secondary/20 py-20 md:py-32'>
            <div className='container flex flex-col items-center text-center'>
               <h1 className='mb-6 animate-fade-in text-4xl font-extrabold md:text-5xl lg:text-6xl'>
                  <span className='gradient-text'>Healthcare</span> Made Simple
               </h1>
               <p className='mb-8 max-w-2xl text-lg text-foreground/80 md:text-xl'>
                  Connect with qualified medical professionals and manage your
                  appointments with ease. Experience seamless healthcare
                  services at your fingertips.
               </p>
               <div className='flex flex-col gap-4 sm:flex-row'>
                  {isAuthenticated ? (
                     <>
                        <Link to='/find-doctors'>
                           <Button size='lg' className='font-medium'>
                              Find Doctors
                           </Button>
                        </Link>
                        <Link to='/my-appointments'>
                           <Button
                              variant='outline'
                              size='lg'
                              className='font-medium'
                           >
                              My Appointments
                           </Button>
                        </Link>
                     </>
                  ) : (
                     <>
                        <Link to='/register'>
                           <Button size='lg' className='font-medium'>
                              Get Started
                           </Button>
                        </Link>
                        <Link to='/find-doctors'>
                           <Button
                              variant='outline'
                              size='lg'
                              className='font-medium'
                           >
                              Browse Doctors
                           </Button>
                        </Link>
                     </>
                  )}
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className='bg-background py-16 md:py-24'>
            <div className='container'>
               <div className='mx-auto mb-16 max-w-3xl text-center'>
                  <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
                     Why Choose MediCare?
                  </h2>
                  <p className='text-lg text-muted-foreground'>
                     We provide a comprehensive platform for managing your
                     healthcare needs with ease and convenience.
                  </p>
               </div>

               <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                  <FeatureCard
                     icon={<Users className='h-10 w-10 text-brand-blue' />}
                     title='Qualified Specialists'
                     description='Connect with board-certified doctors across various specialties to get the care you need.'
                  />
                  <FeatureCard
                     icon={<Calendar className='h-10 w-10 text-brand-purple' />}
                     title='Easy Scheduling'
                     description='Book, reschedule, or cancel appointments quickly with our intuitive appointment system.'
                  />
                  <FeatureCard
                     icon={<Clock className='h-10 w-10 text-brand-indigo' />}
                     title='24/7 Availability'
                     description='Access healthcare information and book appointments anytime, day or night.'
                  />
               </div>
            </div>
         </section>

         {/* How It Works */}
         <section className='bg-secondary/10 py-16 md:py-24'>
            <div className='container'>
               <div className='mx-auto mb-16 max-w-3xl text-center'>
                  <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
                     How It Works
                  </h2>
                  <p className='text-lg text-muted-foreground'>
                     Get started with MediCare in just a few simple steps
                  </p>
               </div>

               <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                  <StepCard
                     number='1'
                     title='Create an Account'
                     description='Sign up and complete your profile with your medical information.'
                  />
                  <StepCard
                     number='2'
                     title='Find a Doctor'
                     description='Search for specialists based on your needs and read their profiles.'
                  />
                  <StepCard
                     number='3'
                     title='Book Appointment'
                     description='Select a convenient time slot and confirm your appointment.'
                  />
               </div>
            </div>
         </section>

         {/* Testimonials Section */}
         <section className='bg-background py-16 md:py-24'>
            <div className='container'>
               <div className='mx-auto mb-16 max-w-3xl text-center'>
                  <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
                     What Our Users Say
                  </h2>
                  <p className='text-lg text-muted-foreground'>
                     Read what patients and doctors have to say about their
                     experience with MediCare
                  </p>
               </div>

               <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                  <TestimonialCard
                     name='Sarah Johnson'
                     role='Patient'
                     content='MediCare made it so easy to find a specialist in my area. I was able to book an appointment within minutes!'
                  />
                  <TestimonialCard
                     name='Dr. Michael Chen'
                     role='Cardiologist'
                     content='As a doctor, MediCare has helped me organize my schedule and connect with patients efficiently.'
                  />
                  <TestimonialCard
                     name='Emma Thompson'
                     role='Patient'
                     content="I love how simple it is to manage all my family's medical appointments in one place. Highly recommended!"
                  />
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className='bg-primary py-16 text-primary-foreground md:py-20'>
            <div className='container text-center'>
               <div className='mx-auto max-w-3xl'>
                  <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
                     Ready to take control of your healthcare?
                  </h2>
                  <p className='mb-8 text-xl opacity-90'>
                     Join thousands of satisfied users who have simplified their
                     healthcare journey with MediCare.
                  </p>
                  <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                     {isAuthenticated ? (
                        <Link to='/find-doctors'>
                           <Button variant='secondary' size='lg'>
                              Find Doctors Now
                           </Button>
                        </Link>
                     ) : (
                        <>
                           <Link to='/register'>
                              <Button variant='secondary' size='lg'>
                                 Create Account
                              </Button>
                           </Link>
                           <Link to='/login'>
                              <Button
                                 variant='outline'
                                 size='lg'
                                 className='border-white bg-transparent hover:bg-white/20'
                              >
                                 Sign In
                              </Button>
                           </Link>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

const FeatureCard = ({
   icon,
   title,
   description,
}: {
   icon: React.ReactNode;
   title: string;
   description: string;
}) => (
   <Card className='h-full border bg-card transition-all hover:shadow-md'>
      <CardContent className='pt-6'>
         <div className='mb-4'>{icon}</div>
         <h3 className='mb-2 text-xl font-bold'>{title}</h3>
         <p className='text-muted-foreground'>{description}</p>
      </CardContent>
   </Card>
);

const StepCard = ({
   number,
   title,
   description,
}: {
   number: string;
   title: string;
   description: string;
}) => (
   <div className='flex flex-col items-center text-center'>
      <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground'>
         {number}
      </div>
      <h3 className='mb-2 text-xl font-bold'>{title}</h3>
      <p className='text-muted-foreground'>{description}</p>
   </div>
);

const TestimonialCard = ({
   name,
   role,
   content,
}: {
   name: string;
   role: string;
   content: string;
}) => (
   <Card className='h-full border bg-card transition-all hover:shadow-md'>
      <CardContent className='pt-6'>
         <div className='mb-6'>
            <CheckCircle2 className='h-10 w-10 text-primary' />
         </div>
         <p className='mb-6 italic text-foreground'>"{content}"</p>
         <div>
            <p className='font-semibold'>{name}</p>
            <p className='text-sm text-muted-foreground'>{role}</p>
         </div>
      </CardContent>
   </Card>
);
