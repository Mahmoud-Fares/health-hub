import { cn } from '@/shared/lib/utils';

type SpinnerProps = {
   className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
   return (
      <div className={cn('flex items-center justify-center', className)}>
         <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary'></div>
      </div>
   );
}
