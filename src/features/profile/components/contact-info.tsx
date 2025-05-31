import { Mail, Phone } from 'lucide-react';

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';

type ContactInfoProps = {
   email: string;
   phone?: string;
};

export const ContactInfo = ({ email, phone }: ContactInfoProps) => {
   const contactDetails = [
      {
         label: 'Email',
         value: email,
         icon: <Mail className='h-4 w-4 text-blue-500' />,
      },
      {
         label: 'Phone',
         value: phone || 'Not specified',
         icon: <Phone className='h-4 w-4 text-green-500' />,
      },
   ];

   return (
      <Card className='shadow-sm transition-shadow duration-200 hover:shadow-md'>
         <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>Contact Information</CardTitle>
         </CardHeader>
         <CardContent>
            <div className='space-y-3 md:space-y-4'>
               {contactDetails.map(({ label, value, icon }) => {
                  const isNotSpecified = value === 'Not specified';

                  return (
                     <div
                        key={label}
                        className='flex flex-col gap-2 rounded-lg border border-border/50 bg-card p-4 transition-colors hover:border-border md:flex-row md:items-center md:justify-between md:gap-4'
                     >
                        <div className='flex items-center gap-3'>
                           {icon}
                           <dt className='text-sm font-semibold text-foreground'>
                              {label}
                           </dt>
                        </div>
                        <dd className='flex items-center gap-2'>
                           <span
                              className={cn(
                                 'text-sm',
                                 isNotSpecified &&
                                    'italic text-muted-foreground'
                              )}
                           >
                              {value}
                           </span>
                        </dd>
                     </div>
                  );
               })}
            </div>
         </CardContent>
      </Card>
   );
};
