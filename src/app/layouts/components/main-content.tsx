import { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

interface MainContentProps {
   children: ReactNode;
   className?: string;
}

export const MainContent = ({ children, className }: MainContentProps) => {
   return (
      <main className={cn('animate-fade-in flex-1', className)}>
         {children}
      </main>
   );
};
