import { useEffect } from 'react';

import { useUI } from '@/shared/hooks/use-ui';

type Props = {
   children: React.ReactNode;
};

export default function PageWithSidebar({ children }: Props) {
   const { setShowSidebar } = useUI();

   useEffect(() => {
      setShowSidebar(true);
   }, [setShowSidebar]);

   return <>{children}</>;
}
