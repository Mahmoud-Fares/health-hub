import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

export type AccessDeniedProps = {
   title?: string;
   message?: string;
   actionLabel?: string;
   onAction?: () => void;
   className?: string;
};

export const AccessDenied: React.FC<AccessDeniedProps> = ({
   title = 'Access Denied',
   message = 'You do not have permission to view this page.',
   actionLabel,
   onAction,
   className,
}) => {
   const navigate = useNavigate();
   return (
      <div
         className={cn(
            'flex flex-col items-center justify-center rounded-lg border bg-background px-4 py-16 shadow-sm',
            className
         )}
      >
         <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10'>
            <AlertTriangle className='h-8 w-8 text-destructive' />
         </div>

         <h2 className='mb-2 text-2xl font-bold text-foreground'>{title}</h2>
         <p className='mb-6 text-muted-foreground'>{message}</p>

         {actionLabel && onAction ? (
            <Button variant='default' onClick={onAction}>
               {actionLabel}
            </Button>
         ) : (
            <Button variant='default' onClick={() => navigate(-1)}>
               Go back
            </Button>
         )}
      </div>
   );
};
