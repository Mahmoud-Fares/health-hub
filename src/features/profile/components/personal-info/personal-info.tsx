import { UserRound } from 'lucide-react';

import { DoctorData } from '@/shared/components';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';

import { isDoctor } from '@/features/auth';

import { DoctorInfoSection } from './doctor-info-section';
import { PersonalInfoSection } from './personal-info-section';
import { PersonalInfoProps } from './types';

export const PersonalInfo = ({ user }: PersonalInfoProps) => {
   return (
      <section className='space-y-6' aria-labelledby='personal-info-heading'>
         <div className='space-y-6'>
            {isDoctor(user) && (
               <DoctorData user={user}>
                  <Card className='shadow-sm transition-shadow duration-200 hover:shadow-md'>
                     <CardHeader className='pb-4'>
                        <CardTitle className='text-lg'>
                           Professional Information
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <DoctorInfoSection user={user} />
                     </CardContent>
                  </Card>
               </DoctorData>
            )}

            <Card className='shadow-sm transition-shadow duration-200 hover:shadow-md'>
               <CardHeader className='pb-4'>
                  <CardTitle
                     id='personal-info-heading'
                     className='flex items-center gap-2 text-lg'
                  >
                     <UserRound className='h-5 w-5 text-primary' />
                     Personal Information
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <PersonalInfoSection user={user} />
               </CardContent>
            </Card>
         </div>
      </section>
   );
};
