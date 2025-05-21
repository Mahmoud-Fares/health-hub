import { cn } from '@/shared/lib/utils';

type SpinnerProps = {
   className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
   return (
      <div
         className={cn(
            'size-5 animate-spin rounded-full border-b-2 border-t-2 border-primary',
            className
         )}
      ></div>
   );
}
