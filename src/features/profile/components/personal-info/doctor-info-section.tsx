import { Info, Mail, Phone } from 'lucide-react';

import { InfoItem } from './info-item';
import { DoctorInfoSectionProps } from './types';

export const DoctorInfoSection = ({ user }: DoctorInfoSectionProps) => {
   const doctorInfo = [
      {
         icon: <Info className='h-5 w-5 text-blue-600' />,
         title: 'About',
         value: user.bio,
         highlight: true,
      },
      {
         icon: <Mail className='h-5 w-5 text-green-600' />,
         title: 'Email',
         value: user.email,
         highlight: false,
      },
      {
         icon: <Phone className='h-5 w-5 text-purple-600' />,
         title: 'Phone',
         value: user.phone,
         highlight: false,
      },
   ];

   return (
      <div className='grid gap-4 md:gap-6'>
         {doctorInfo.map((info) => (
            <InfoItem key={info.title} {...info} />
         ))}
      </div>
   );
};
