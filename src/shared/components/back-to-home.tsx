import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

type Props = {
   className?: string;
};

export const BackToHomeButton = ({ className }: Props) => {
   return (
      <div className={cn('flex justify-center', className)}>
         <Link to='/' viewTransition>
            <Button
               variant='outline'
               size='sm'
               className='gap-1 transition-colors'
            >
               <ChevronLeft className='h-4 w-4' />
               <span>Back to Home</span>
            </Button>
         </Link>
      </div>
   );
};
