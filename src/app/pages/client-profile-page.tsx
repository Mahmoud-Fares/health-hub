import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { getErrorMessage } from '@/shared/lib/utils';
import { Patient } from '@/shared/types';

import { useClientProfile } from '@/features/profile/api/hooks';
import { ContactInfo } from '@/features/profile/components/contact-info';
import { MedicalInfo } from '@/features/profile/components/medical-info';
import { PersonalInfo } from '@/features/profile/components/personal-info';
import ProfileHeader from '@/features/profile/components/profile-header';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

export default function ClientProfilePage() {
   const { slug } = useParams<{ slug: string }>();

   const { data: response, isLoading, error } = useClientProfile(slug);
   const client = response?.data?.user as Patient | undefined;

   if (isLoading)
      return (
         <div className='flex min-h-screen items-center justify-center'>
            <Spinner className='size-16' />
         </div>
      );

   if (error || !client) return NoClientFound({ error });

   return (
      <PageWithSidebar>
         <div className='min-h-[calc(100vh-4rem)] bg-background p-4 lg:p-8'>
            <Card>
               <ProfileHeader user={client} />

               <CardContent>
                  <div className='grid grid-cols-1 gap-8 pt-6 lg:grid-cols-2'>
                     <div className='space-y-6'>
                        <PersonalInfo user={client} />
                        <ContactInfo
                           email={client.email}
                           phone={client.phone}
                        />
                     </div>

                     <MedicalInfo user={client} />
                  </div>
               </CardContent>
            </Card>
         </div>
      </PageWithSidebar>
   );
}

const NoClientFound = ({ error }: { error: any }) => {
   const navigate = useNavigate();

   return (
      <PageWithSidebar>
         <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center p-4'>
            <Card className='w-full max-w-3xl'>
               <CardHeader>
                  <CardTitle className='text-center text-destructive'>
                     Error Loading Profile
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <p className='text-center'>
                     {getErrorMessage(error) ||
                        'Could not load client profile. Please try again later.'}
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
