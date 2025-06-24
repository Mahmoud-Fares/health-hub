import { useParams } from 'react-router-dom';

import Spinner from '@/shared/components/spinner';
import { Card, CardContent } from '@/shared/components/ui/card';
import { DoctorProfile } from '@/shared/types/auth';

import { useDoctorProfile } from '@/features/profile/api/hooks';
import AppointmentInfo from '@/features/profile/components/appointment-info';
import { ClinicInfo } from '@/features/profile/components/clinic-info';
import { PersonalInfo } from '@/features/profile/components/personal-info';
import ProfileHeader from '@/features/profile/components/profile-header';

import { NoDoctorFound } from './no-doctor-found';

type DoctorProfileContentProps = {
   doctor: DoctorProfile;
};

export default function DoctorProfilePage() {
   const { slug } = useParams<{ slug: string }>();
   const { data: response, isLoading, error } = useDoctorProfile(slug);
   const doctor = response?.data;

   if (isLoading) return <LoadingState />;

   if (error || !doctor) return <NoDoctorFound error={error} />;

   return <DoctorProfileContent doctor={doctor} />;
}

function DoctorProfileContent({ doctor }: DoctorProfileContentProps) {
   return (
      <Card className='animate-fade-in border-none shadow-none'>
         <ProfileHeader user={doctor} />

         <CardContent className='p-0 pt-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
               <PersonalInfo user={doctor} />
               <ClinicInfo user={doctor} />
            </div>

            <AppointmentInfo doctor={doctor} />
         </CardContent>
      </Card>
   );
}

function LoadingState() {
   return (
      <div
         className='flex h-full animate-fade-in items-center justify-center'
         role='status'
         aria-label='Loading doctor profile'
      >
         <Spinner className='size-16' />
         <span className='sr-only'>Loading doctor profile...</span>
      </div>
   );
}
