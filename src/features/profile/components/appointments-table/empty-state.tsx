import { Calendar } from 'lucide-react';

export const EmptyState = () => {
   return (
      <div className='flex flex-col items-center justify-center px-6 py-16 text-center'>
         <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted/30'>
            <Calendar className='h-10 w-10 text-muted-foreground/50' />
         </div>
         <h3 className='mb-2 text-xl font-semibold text-foreground'>
            No Appointments Available
         </h3>
         <p className='max-w-md leading-relaxed text-muted-foreground'>
            There are currently no appointments scheduled. Check back later or
            contact support for assistance.
         </p>
      </div>
   );
};
