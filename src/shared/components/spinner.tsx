import { cn } from '@/shared/lib/utils';

type SpinnerProps = {
   className?: string;
   loaderSize?: number;
};

export default function Spinner({ className, loaderSize = 5 }: SpinnerProps) {
   return (
      <div className={cn('flex items-center justify-center', className)}>
         <div
            className={cn(
               'size-5 animate-spin rounded-full border-b-2 border-t-2 border-primary',
               `size-${loaderSize}`
            )}
         ></div>
      </div>
   );
}
