import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { getErrorMessage } from '@/shared/lib/utils';

interface NoDoctorFoundProps {
   error: unknown;
}

export function NoDoctorFound({ error }: NoDoctorFoundProps) {
   const navigate = useNavigate();

   const handleGoBack = () => {
      navigate(-1);
   };

   const errorMessage =
      getErrorMessage(error) ||
      'Could not load doctor profile. Please try again later.';

   return (
      <>
         <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center p-4'>
            <Card className='w-full max-w-3xl'>
               <CardContent className='pt-6'>
                  <div className='text-center'>
                     <p className='mb-4 text-destructive' role='alert'>
                        {errorMessage}
                     </p>
                     <Button
                        variant='outline'
                        onClick={handleGoBack}
                        aria-label='Go back to previous page'
                     >
                        Go Back
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </>
   );
}
