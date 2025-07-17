import { AlertCircle, CheckCircle, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PatientData } from '@/shared/components';
import ProfileAvatar from '@/shared/components/profile-avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { CardHeader, CardTitle } from '@/shared/components/ui/card';
import { DoctorData } from '@/shared/components/view-controllers/doctor-data';
import { cn } from '@/shared/lib/utils';
import { AuthUser } from '@/shared/types';

import { ViewToCurrentUser, isDoctor, useAuth } from '@/features/auth';

interface ProfileHeaderProps {
   user: AuthUser;
}

interface ConsultationFeeProps {
   fees: string | undefined;
}

function ConsultationFee({ fees }: ConsultationFeeProps) {
   return (
      <div className='mt-4 rounded-md bg-primary/10 px-4 py-2 md:mt-0'>
         <p className='text-sm font-medium'>Consultation Fee</p>
         <p
            className='font-bold'
            aria-label={`Consultation fee: ${fees || 'Not specified'}`}
         >
            {fees || 'Not specified'}
         </p>
      </div>
   );
}

interface UserSpecializationProps {
   specialization: string[] | undefined;
}

function UserSpecialization({ specialization }: UserSpecializationProps) {
   const displayText = specialization?.length
      ? specialization.join(', ')
      : 'General Practitioner';

   return (
      <span aria-label={`Specialization: ${displayText}`}>{displayText}</span>
   );
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
   return (
      <CardHeader className='p-0'>
         <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            <div
               className={cn(
                  'flex flex-col items-center gap-4',
                  user.role === 'client' && 'sm:flex-row',
                  user.role === 'doctor' && 'md:flex-row'
               )}
            >
               <ProfileAvatar
                  profile={user}
                  className='h-20 w-20 bg-primary text-lg text-primary-foreground'
               />

               <div className='flex flex-col gap-2'>
                  <CardTitle className='text-2xl' id='doctor-name'>
                     {user.name}
                  </CardTitle>
                  <p
                     className='text-muted-foreground'
                     aria-labelledby='doctor-name'
                  >
                     {isDoctor(user) && (
                        <DoctorData user={user}>
                           <UserSpecialization
                              specialization={user.specialization}
                           />
                        </DoctorData>
                     )}

                     <PatientData user={user}>
                        <span>Patient</span>
                     </PatientData>
                  </p>

                  <VerificationBadge user={user} />

                  <ViewToCurrentUser profile={user!}>
                     <Link to='/settings'>
                        <Button size='sm' variant='outline'>
                           <Edit className='size-4 stroke-foreground' />
                           Edit Profile
                        </Button>
                     </Link>
                  </ViewToCurrentUser>
               </div>
            </div>

            {isDoctor(user) && (
               <div className='flex flex-col gap-2'>
                  <DoctorData user={user}>
                     <ConsultationFee fees={user.fees} />
                  </DoctorData>

                  <ViewToCurrentUser profile={user!}>
                     <RoleVerificationButton />
                  </ViewToCurrentUser>
               </div>
            )}
         </div>
      </CardHeader>
   );
}

export const VerificationBadge = ({ user }: { user: AuthUser }) => {
   const { currentUser } = useAuth();

   return (
      <div className='flex flex-wrap items-center gap-2'>
         {user.email_verified_at ? (
            <Badge
               variant='success'
               className='flex items-center gap-1 px-2 py-1'
            >
               <CheckCircle className='h-4 w-4 text-green-500' />
               Email Verified
            </Badge>
         ) : (
            <>
               <Badge
                  variant='warning'
                  className='flex items-center gap-1 px-2 py-1'
               >
                  <AlertCircle className='h-4 w-4 text-amber-800 dark:text-amber-200' />
                  Email Not Verified
               </Badge>
               {currentUser?.slug === user.slug && (
                  <Link to='/verify-account'>
                     <Button size='sm' variant='outline'>
                        Verify Now
                     </Button>
                  </Link>
               )}
            </>
         )}
      </div>
   );
};

const RoleVerificationButton = () => {
   const { currentUser } = useAuth();
   const isRoleVerified = isDoctor(currentUser!) && currentUser.role_activation;

   if (isRoleVerified) return null;

   return (
      <Link to='/settings?tab=role_verification'>
         <Button size='sm' variant='outline'>
            Doctor Verification
         </Button>
      </Link>
   );
};
