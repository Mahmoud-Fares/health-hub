import { Building, Calendar, Globe, MapPin } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Doctor } from '@/shared/types';

type ClinicInfoProps = {
   user: Doctor;
};

export function ClinicInfo({ user }: ClinicInfoProps) {
   const clinicDetails = [
      {
         label: 'Clinic Name',
         value: user.clinicname,
         icon: <Building className='h-4 w-4 text-blue-500' />,
         important: true,
      },
      {
         label: 'Address',
         value: user.clinicaddress,
         icon: <MapPin className='h-4 w-4 text-red-500' />,
         important: false,
      },
      {
         label: 'Governate',
         value: user.clinicgovernate,
         icon: <Globe className='h-4 w-4 text-green-500' />,
         important: false,
      },
   ];

   return (
      <Card className='shadow-sm transition-shadow duration-200 hover:shadow-md'>
         <CardHeader className='pb-4'>
            <CardTitle className='flex items-center gap-2 text-lg'>
               <Calendar className='h-5 w-5 text-primary' />
               Clinic Details
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className='space-y-3 md:space-y-4'>
               {clinicDetails.map(({ label, value, icon, important }) => {
                  const displayValue = value || 'Not specified';
                  const isNotSpecified = !value;

                  return (
                     <div
                        key={label}
                        className={`flex flex-col gap-2 rounded-lg border p-4 transition-all duration-200 hover:shadow-sm md:flex-row md:items-center md:justify-between md:gap-4 ${
                           important && !isNotSpecified
                              ? 'border-blue-200 bg-blue-50 hover:bg-blue-100 dark:border-blue-800/30 dark:bg-blue-950/20'
                              : 'border-border/50 bg-card hover:border-border'
                        }`}
                     >
                        <div className='flex items-center gap-3'>
                           {icon}
                           <dt className='text-sm font-semibold text-foreground'>
                              {label}
                           </dt>
                        </div>
                        <dd className='flex items-center gap-2'>
                           {!isNotSpecified ? (
                              important ? (
                                 <Badge
                                    variant='default'
                                    className='break-words font-medium'
                                 >
                                    {displayValue}
                                 </Badge>
                              ) : (
                                 <Badge
                                    variant='outline'
                                    className='break-words font-medium'
                                 >
                                    {displayValue}
                                 </Badge>
                              )
                           ) : (
                              <span className='text-sm italic text-muted-foreground'>
                                 {displayValue}
                              </span>
                           )}
                        </dd>
                     </div>
                  );
               })}
            </div>
         </CardContent>
      </Card>
   );
}
