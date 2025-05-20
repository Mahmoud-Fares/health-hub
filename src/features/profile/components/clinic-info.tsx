import { Calendar } from 'lucide-react';

import { Doctor } from '@/shared/types';

type ClinicInfoProps = {
   user: Doctor;
};

const ClinicInfo = ({ user }: ClinicInfoProps) => {
   return (
      <div className='space-y-4'>
         <h3 className='flex items-center font-medium'>
            <Calendar className='mr-2 h-5 w-5 text-primary' />
            Clinic Details
         </h3>

         <div className='grid grid-cols-2 gap-2 text-sm'>
            <p className='text-muted-foreground'>Clinic Name:</p>
            <p>{user.clinicname || 'Not specified'}</p>
            <p className='text-muted-foreground'>Address:</p>
            <p>{user.clinicaddress || 'Not specified'}</p>
            <p className='text-muted-foreground'>Governate:</p>
            <p>{user.clinicgovernate || 'Not specified'}</p>
         </div>
      </div>
   );
};

export default ClinicInfo;
