import { Link, useParams } from 'react-router-dom';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { DoctorProfile } from '@/shared/types/auth';

import { ViewToOthersOnly } from '@/features/auth';
import { useDoctorProfile } from '@/features/profile/api/hooks';
import { AppointmentsTable } from '@/features/profile/components/appointments-table';
import { ClinicInfo } from '@/features/profile/components/clinic-info';
import { PersonalInfo } from '@/features/profile/components/personal-info';
import ProfileHeader from '@/features/profile/components/profile-header';

import { NoDoctorFound } from './no-doctor-found';

interface DoctorProfileContentProps {
   doctor: DoctorProfile;
}

function DoctorProfileContent({ doctor }: DoctorProfileContentProps) {
   return (
      <>
         <div className='p-4 lg:p-8'>
            <Card className='mb-6 border-none'>
               <ProfileHeader user={doctor} />

               <CardContent className='pt-6'>
                  <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                     <PersonalInfo user={doctor} />
                     <ClinicInfo user={doctor} />
                  </div>

                  <section
                     className='mt-8'
                     aria-labelledby='appointments-heading'
                  >
                     <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
                        <h3 id='appointments-heading' className='font-medium'>
                           Available Appointments
                        </h3>

                        <ViewToOthersOnly profile={doctor}>
                           <Link
                              to={`/book-appointment/${doctor.slug}`}
                              aria-label={`Book appointment with Dr. ${doctor.name}`}
                           >
                              <Button className='w-full sm:w-auto'>
                                 Book Appointment
                              </Button>
                           </Link>
                        </ViewToOthersOnly>
                     </div>

                     <div className='mt-4'>
                        <AppointmentsTable
                           appointments={doctor.appointments}
                           doctor={doctor}
                        />
                     </div>
                  </section>
               </CardContent>
            </Card>
         </div>
      </>
   );
}

function LoadingState() {
   return (
      <div
         className='flex min-h-screen items-center justify-center'
         role='status'
         aria-label='Loading doctor profile'
      >
         <Spinner className='size-16' />
         <span className='sr-only'>Loading doctor profile...</span>
      </div>
   );
}

export default function DoctorProfilePage() {
   const { slug } = useParams<{ slug: string }>();
   const { data: response, isLoading, error } = useDoctorProfile(slug);
   const doctor = response?.data;

   if (isLoading) return <LoadingState />;

   if (error || !doctor) return <NoDoctorFound error={error} />;

   return <DoctorProfileContent doctor={doctor} />;
}
