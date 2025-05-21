import { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

interface MainContentProps {
   children: ReactNode;
   className?: string;
}

export const MainContent = ({ children, className }: MainContentProps) => {
   return (
      <main className={cn('flex-1 animate-fade-in', className)}>
         {children}
      </main>
   );
};
