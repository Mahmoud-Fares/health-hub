import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { Footer } from '@/app/layouts/components/footer';
import Header from '@/app/layouts/components/header';
import { MainContent } from '@/app/layouts/components/main-content';
import { injectTheToken } from '@/app/utils';

type Props = {
   children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
   useEffect(() => {
      injectTheToken();
   }, []);

   return (
      <div className='flex min-h-screen flex-col'>
         <Header />

         <div className='flex flex-1'>
            {/* {showSidebar && !isMobile && <Sidebar />} */}

            <MainContent>{children ?? <Outlet />}</MainContent>
         </div>

         <Footer />
      </div>
   );
}
