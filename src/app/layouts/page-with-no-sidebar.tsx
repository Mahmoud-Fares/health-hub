import { useEffect } from 'react';

import { useUI } from '@/shared/hooks/use-ui';

type Props = {
   children: React.ReactNode;
};

export default function PageWithNoSidebar({ children }: Props) {
   const { setShowSidebar } = useUI();

   useEffect(() => {
      setShowSidebar(false);
   }, [setShowSidebar]);

   return <>{children}</>;
}
