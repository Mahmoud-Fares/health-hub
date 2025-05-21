import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { getErrorMessage } from '@/shared/lib/utils';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

export const NoDoctorFound = ({ error }: { error: any }) => {
   const navigate = useNavigate();

   return (
      <PageWithSidebar>
         <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center p-4'>
            <Card className='w-full max-w-3xl'>
               <CardContent className='pt-6'>
                  <p className='text-center text-destructive'>
                     {getErrorMessage(error) ||
                        'Could not load doctor profile. Please try again later.'}
                  </p>
                  <div className='mt-4 flex justify-center'>
                     <Button variant='outline' onClick={() => navigate(-1)}>
                        Go Back
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </PageWithSidebar>
   );
};
