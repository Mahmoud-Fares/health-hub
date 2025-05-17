import { NuqsAdapter } from 'nuqs/adapters/react';

import TanstackProvider from '@/app/providers/tanstack-provider';
import { ThemeProvider } from '@/app/providers/theme-provider';

type Props = {
   children: React.ReactNode;
};

export default function Providers({ children }: Props) {
   return (
      <TanstackProvider>
         <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <NuqsAdapter>{children}</NuqsAdapter>
         </ThemeProvider>
      </TanstackProvider>
   );
}
