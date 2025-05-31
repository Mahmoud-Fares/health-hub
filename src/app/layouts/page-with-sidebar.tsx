import { ReactNode, useEffect } from 'react';

import { useUI } from '@/shared/hooks/use-ui';

type PageWithSidebarProps = {
   children: ReactNode;
};

export default function PageWithSidebar({ children }: PageWithSidebarProps) {
   const { setShowSidebar } = useUI();

   useEffect(() => {
      setShowSidebar(true);

      // Cleanup function to reset sidebar state when component unmounts
      return () => {
         setShowSidebar(false);
      };
   }, [setShowSidebar]);

   return <main role='main'>{children}</main>;
}
