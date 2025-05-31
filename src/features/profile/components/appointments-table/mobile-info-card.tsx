import { MobileInfoCardProps } from './types';

export const MobileInfoCard = ({
   icon: Icon,
   title,
   value,
}: MobileInfoCardProps) => (
   <div
      className={
         'flex items-center gap-3 rounded-lg border border-primary/10 bg-primary/5 p-3'
      }
   >
      <Icon className='h-5 w-5 flex-shrink-0 text-primary' />
      <div className='space-y-1'>
         <div className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            {title}
         </div>
         <div className='font-semibold text-foreground'>{value}</div>
      </div>
   </div>
);
