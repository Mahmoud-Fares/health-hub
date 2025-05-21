import { Link, useParams } from 'react-router-dom';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

import { useDoctorProfile } from '@/features/profile/api/hooks';
import AppointmentsTable from '@/features/profile/components/appointments-table';
import ClinicInfo from '@/features/profile/components/clinic-info';
import PersonalInfo from '@/features/profile/components/personal-info';
import ProfileHeader from '@/features/profile/components/profile-header';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

import { NoDoctorFound } from './no-doctor-found';

export default function DoctorProfilePage() {
   const { slug } = useParams<{ slug: string }>();
   const { data: response, isLoading, error } = useDoctorProfile(slug);
   const doctor = response?.data;

   if (isLoading)
      return (
         <div className='flex min-h-screen items-center justify-center'>
            <Spinner className='size-16' />
         </div>
      );

   if (error || !doctor) return <NoDoctorFound error={error} />;

   return (
      <PageWithSidebar>
         <div className='p-4 md:p-8'>
            <Card className='mb-6'>
               <ProfileHeader user={doctor} />

               <CardContent className='pt-6'>
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                     <PersonalInfo user={doctor} />

                     <ClinicInfo user={doctor} />
                  </div>

                  <div className='mt-8'>
                     <div className='flex items-center justify-between'>
                        <h3 className='mb-4 font-medium'>
                           Available Appointments
                        </h3>

                        <Link to={`/book-appointment/${slug}`}>
                           <Button className='mb-4'>Book Appointment</Button>
                        </Link>
                     </div>

                     <AppointmentsTable
                        appointments={doctor.appointments}
                        doctorSlug={slug!}
                     />
                  </div>
               </CardContent>
            </Card>
         </div>
      </PageWithSidebar>
   );
}
