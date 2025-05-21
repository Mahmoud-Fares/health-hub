import Spinner from '@/shared/components/spinner';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

export const LoadingState = () => {
   return (
      <PageWithSidebar>
         <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center py-20'>
            <Spinner className='size-16' />
         </div>
      </PageWithSidebar>
   );
};
