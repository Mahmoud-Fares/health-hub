import { PatientData } from '@/shared/components';
import ProfileAvatar from '@/shared/components/profile-avatar';
import { CardHeader, CardTitle } from '@/shared/components/ui/card';
import { DoctorData } from '@/shared/components/view-controllers/doctor-data';
import { AuthUser } from '@/shared/types';

import { isDoctor } from '@/features/auth';

type ProfileHeaderProps = {
   user: AuthUser;
};

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
   return (
      <CardHeader className='pb-0'>
         <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center space-x-4'>
               <ProfileAvatar
                  profile={user}
                  className='h-20 w-20 bg-primary text-lg text-primary-foreground'
               />

               <div>
                  <CardTitle className='text-2xl'>{user.name}</CardTitle>
                  <p className='text-muted-foreground'>
                     {isDoctor(user) && (
                        <DoctorData user={user}>
                           {user.specialization?.length
                              ? user.specialization.join(', ')
                              : 'General Practitioner'}
                        </DoctorData>
                     )}

                     <PatientData user={user}>Patient</PatientData>
                  </p>
               </div>
            </div>

            {isDoctor(user) && (
               <DoctorData user={user}>
                  <div className='mt-4 rounded-md bg-primary/10 px-4 py-2 md:mt-0'>
                     <p className='text-sm font-medium'>Consultation Fee</p>
                     <p className='font-bold'>{user.fees || 'Not specified'}</p>
                  </div>
               </DoctorData>
            )}
         </div>
      </CardHeader>
   );
};

export default ProfileHeader;
