import { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

interface MainContentProps {
   children: ReactNode;
   className?: string;
   withSidebar?: boolean;
}

export const MainContent = ({
   children,
   className,
   withSidebar = false,
}: MainContentProps) => {
   return (
      <main
         className={cn(
            'flex-1 animate-fade-in',
            withSidebar &&
               'container py-8 sm:p-10 lg:max-w-[850px] min-[1041px]:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1400px]',
            className
         )}
      >
         {children}
      </main>
   );
};
