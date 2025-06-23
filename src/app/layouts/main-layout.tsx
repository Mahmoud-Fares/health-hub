import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Footer } from '@/app/layouts/components/footer';
import Header from '@/app/layouts/components/header';
import { MainContent } from '@/app/layouts/components/main-content';
import Sidebar from '@/app/layouts/components/sidebar';

type Props = {
   withSidebar?: boolean;
   children?: React.ReactNode;
};

export default function MainLayout({ children, withSidebar = false }: Props) {
   return (
      <>
         <ScrollRestoration />

         <div className='flex min-h-screen flex-col'>
            <Header />

            <div className='flex flex-1'>
               {withSidebar && <Sidebar />}

               <MainContent withSidebar={withSidebar}>
                  {children ?? <Outlet />}
               </MainContent>
            </div>

            <Footer />
         </div>
      </>
   );
}
