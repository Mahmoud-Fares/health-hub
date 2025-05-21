import { Info } from 'lucide-react';

import ProfileAvatar from '@/shared/components/profile-avatar';
import {
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Doctor } from '@/shared/types';

interface DoctorInfoCardProps {
   doctor: Doctor;
}

export const DoctorInfoCard = ({ doctor }: DoctorInfoCardProps) => {
   return (
      <>
         <CardHeader>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
               <div className='flex items-center space-x-4'>
                  <ProfileAvatar profile={doctor} />
                  <div>
                     <CardTitle className='text-2xl'>{doctor.name}</CardTitle>
                     <CardDescription>
                        {doctor.specialization?.length
                           ? doctor.specialization.join(', ')
                           : 'General Practitioner'}
                     </CardDescription>
                  </div>
               </div>
               <div className='mt-4 rounded-md bg-primary/10 px-4 py-2 md:mt-0'>
                  <p className='text-sm font-medium'>Consultation Fee</p>
                  <p className='font-bold'>{doctor.fees || 'Not specified'}</p>
               </div>
            </div>
         </CardHeader>

         <CardContent className='space-y-6 pb-0'>
            <div className='flex flex-col space-y-2'>
               <div className='flex items-start space-x-2'>
                  <Info className='mt-0.5 h-5 w-5 text-primary' />
                  <div>
                     <h3 className='font-medium'>About</h3>
                     <p className='text-sm text-muted-foreground'>
                        {doctor.bio || 'No bio available'}
                     </p>
                  </div>
               </div>

               <div className='flex items-start space-x-2'>
                  <Info className='mt-0.5 h-5 w-5 text-primary' />
                  <div>
                     <h3 className='font-medium'>Clinic</h3>
                     <p className='text-sm text-muted-foreground'>
                        {doctor.clinicname || 'No clinic information'}
                        {doctor.clinicaddress && `, ${doctor.clinicaddress}`}
                        {doctor.clinicgovernate &&
                           `, ${doctor.clinicgovernate}`}
                     </p>
                  </div>
               </div>
            </div>
         </CardContent>
      </>
   );
};
