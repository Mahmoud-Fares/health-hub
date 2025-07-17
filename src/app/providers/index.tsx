import { NuqsAdapter } from 'nuqs/adapters/react';

import { StoreProvider } from '@/features/store/context/store-provider';

import TanstackProvider from '@/app/providers/tanstack-provider';
import { ThemeProvider } from '@/app/providers/theme-provider';

type Props = {
   children: React.ReactNode;
};

export default function Providers({ children }: Props) {
   return (
      <TanstackProvider>
         <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
            <StoreProvider>
               <NuqsAdapter>{children}</NuqsAdapter>
            </StoreProvider>
         </ThemeProvider>
      </TanstackProvider>
   );
}
