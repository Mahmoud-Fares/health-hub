import { Outlet, ScrollRestoration } from 'react-router-dom';

import { useUI } from '@/shared/hooks/use-ui';

import { Footer } from '@/app/layouts/components/footer';
import Header from '@/app/layouts/components/header';
import { MainContent } from '@/app/layouts/components/main-content';
import Sidebar from '@/app/layouts/components/sidebar';

type Props = {
   children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
   const { showSidebar } = useUI();

   return (
      <>
         <ScrollRestoration />

         <div className='flex min-h-screen flex-col'>
            <Header />

            <div className='flex flex-1'>
               {showSidebar && <Sidebar />}

               <MainContent>{children ?? <Outlet />}</MainContent>
            </div>

            <Footer />
         </div>
      </>
   );
}
