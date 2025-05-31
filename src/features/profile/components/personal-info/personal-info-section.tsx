import { Badge } from '@/shared/components/ui/badge';

import { PersonalInfoSectionProps } from './types';

export const PersonalInfoSection = ({ user }: PersonalInfoSectionProps) => {
   const userDetails = [
      {
         label: 'Age',
         value: user.age || 'Not specified',
         badge: !!user.age,
      },
      {
         label: 'Gender',
         value: user.gender || 'Not specified',
         badge: !!user.gender,
      },
   ];

   return (
      <div className='space-y-3 md:space-y-4'>
         {userDetails.map(({ label, value, badge }) => (
            <div
               key={label}
               className='flex flex-col gap-2 rounded-lg border border-border/50 bg-card p-4 transition-colors hover:border-border md:flex-row md:items-center md:justify-between md:gap-4'
            >
               <div className='flex items-center gap-3'>
                  <dt className='text-sm font-semibold text-foreground'>
                     {label}
                  </dt>
               </div>
               <dd className='flex items-center gap-2'>
                  {badge && value !== 'Not specified' ? (
                     <Badge
                        variant='secondary'
                        className='font-medium capitalize'
                     >
                        {value}
                     </Badge>
                  ) : (
                     <span
                        className={`text-sm ${
                           value === 'Not specified'
                              ? 'italic text-muted-foreground'
                              : 'font-medium capitalize text-foreground'
                        }`}
                     >
                        {value}
                     </span>
                  )}
               </dd>
            </div>
         ))}
      </div>
   );
};
