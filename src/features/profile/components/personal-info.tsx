import { Info, Mail, Phone, UserRound } from 'lucide-react';

import { DoctorData, PatientData } from '@/shared/components';
import { AuthUser, Doctor, Patient } from '@/shared/types';

import { isDoctor, isPatient } from '@/features/auth';

interface InfoItemProps {
   icon: React.ReactNode;
   title: string;
   value: string | number | undefined;
   unit?: string;
}

const InfoItem = ({ icon, title, value, unit }: InfoItemProps) => (
   <div className='flex items-start space-x-2'>
      {icon}
      <div>
         <h3 className='font-medium'>{title}</h3>
         <p className='text-sm text-muted-foreground'>
            {value ? `${value}${unit ? ` ${unit}` : ''}` : 'Not specified'}
         </p>
      </div>
   </div>
);

interface PersonalInfoSectionProps {
   user: AuthUser;
}

const PersonalInfoSection = ({ user }: PersonalInfoSectionProps) => (
   <div className='grid grid-cols-2 gap-3 text-sm'>
      <p className='text-muted-foreground'>Age:</p>
      <p>{user.age || 'Not specified'}</p>
      <p className='text-muted-foreground'>Gender:</p>
      <p className='capitalize'>{user.gender || 'Not specified'}</p>
   </div>
);

interface DoctorInfoSectionProps {
   user: Doctor;
}

const DoctorInfoSection = ({ user }: DoctorInfoSectionProps) => (
   <div className='space-y-4'>
      <InfoItem
         icon={<Info className='mt-0.5 h-5 w-5 text-primary' />}
         title='About'
         value={user.bio}
      />
      <InfoItem
         icon={<Mail className='mt-0.5 h-5 w-5 text-primary' />}
         title='Email'
         value={user.email}
      />
      <InfoItem
         icon={<Phone className='mt-0.5 h-5 w-5 text-primary' />}
         title='Phone'
         value={user.phone}
      />
   </div>
);

interface PatientInfoSectionProps {
   user: Patient;
}

const PatientInfoSection = ({ user }: PatientInfoSectionProps) => (
   <div className='grid grid-cols-2 gap-3 text-sm'>
      <p className='text-muted-foreground'>Blood Type:</p>
      <p>{user.blood_type || 'Not specified'}</p>
      <p className='text-muted-foreground'>Weight:</p>
      <p>{user.weight ? `${user.weight} kg` : 'Not specified'}</p>
      <p className='text-muted-foreground'>Height:</p>
      <p>{user.height ? `${user.height} cm` : 'Not specified'}</p>
   </div>
);

interface PersonalInfoProps {
   user: AuthUser;
}

const PersonalInfo = ({ user }: PersonalInfoProps) => {
   return (
      <div className='space-y-6'>
         {isDoctor(user) && (
            <DoctorData user={user}>
               <DoctorInfoSection user={user} />
            </DoctorData>
         )}

         <div>
            <h3 className='mb-3 flex items-center font-medium'>
               <UserRound className='mr-2 h-5 w-5 text-primary' />
               Personal Information
            </h3>
            <PersonalInfoSection user={user} />
         </div>

         {isPatient(user) && (
            <PatientData user={user}>
               <PatientInfoSection user={user} />
            </PatientData>
         )}
      </div>
   );
};

export default PersonalInfo;
