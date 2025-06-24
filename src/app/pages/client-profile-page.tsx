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

export default function ClientProfilePage() {
   const { slug } = useParams<{ slug: string }>();

   const { data: response, isLoading, error } = useClientProfile(slug);
   const client = response?.data?.user as Patient | undefined;

   if (isLoading) return <LoadingState />;

   if (error || !client) return NoClientFound({ error });

   return (
      <Card className='animate-fade-in border-none shadow-none'>
         <ProfileHeader user={client} />

         <CardContent className='grid grid-cols-1 gap-8 p-0 pt-6 lg:grid-cols-2'>
            <div className='flex flex-col gap-4 *:flex-grow'>
               <PersonalInfo user={client} />
               <ContactInfo email={client.email} phone={client.phone} />
            </div>

            <MedicalInfo user={client} />
         </CardContent>
      </Card>
   );
}

const LoadingState = () => {
   return (
      <div
         className='flex h-full animate-fade-in items-center justify-center'
         role='status'
         aria-label='Loading doctor profile'
      >
         <Spinner className='size-16' />
         <span className='sr-only'>Loading client profile...</span>
      </div>
   );
};

const NoClientFound = ({ error }: { error: any }) => {
   const navigate = useNavigate();

   return (
      <div className='flex animate-fade-in items-center justify-center p-4'>
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
   );
};
