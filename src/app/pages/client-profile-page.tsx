import { Mail, UserRound } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import Spinner from '@/shared/components/spinner';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';

import { useClientProfile } from '@/features/profile/api/hooks';
import { ClientProfile } from '@/features/profile/api/service';

import PageWithSidebar from '../layouts/page-with-sidebar';

const ClientProfilePage = () => {
   const { slug } = useParams<{ slug: string }>();
   const navigate = useNavigate();
   const { data: response, isLoading, error } = useClientProfile(slug);
   const client = response?.data?.user as ClientProfile | undefined;

   if (isLoading) return <Spinner className='min-h-screen' />;

   if (error || !client) {
      const errorMessage =
         error instanceof Error
            ? error.message
            : 'Could not load client profile. Please try again later.';
      toast.error(errorMessage);
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
                     <p className='text-center'>{errorMessage}</p>
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
   }

   return (
      <PageWithSidebar>
         <div className='min-h-[calc(100vh-4rem)] bg-background p-4 md:p-8'>
            <div className='container mx-auto'>
               <Card>
                  <CardHeader>
                     <div className='flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0'>
                        <Avatar className='h-20 w-20'>
                           <AvatarFallback className='bg-primary text-lg text-primary-foreground'>
                              {client.name.substring(0, 2).toUpperCase()}
                           </AvatarFallback>
                        </Avatar>
                        <div>
                           <CardTitle className='text-2xl'>
                              {client.name}
                           </CardTitle>
                           <p className='text-muted-foreground'>Patient</p>
                        </div>
                     </div>
                  </CardHeader>
                  <CardContent>
                     <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                        <div className='space-y-6'>
                           <div>
                              <h3 className='mb-3 flex items-center font-medium'>
                                 <UserRound className='mr-2 h-5 w-5 text-primary' />
                                 Personal Information
                              </h3>
                              <div className='grid grid-cols-2 gap-3 text-sm'>
                                 <p className='text-muted-foreground'>Age:</p>
                                 <p>{client.age || 'Not specified'}</p>
                                 <p className='text-muted-foreground'>
                                    Gender:
                                 </p>
                                 <p className='capitalize'>
                                    {client.gender || 'Not specified'}
                                 </p>
                                 <p className='text-muted-foreground'>
                                    Blood Type:
                                 </p>
                                 <p>{client.blood_type || 'Not specified'}</p>
                                 <p className='text-muted-foreground'>
                                    Weight:
                                 </p>
                                 <p>
                                    {client.weight
                                       ? `${client.weight} kg`
                                       : 'Not specified'}
                                 </p>
                                 <p className='text-muted-foreground'>
                                    Height:
                                 </p>
                                 <p>
                                    {client.height
                                       ? `${client.height} cm`
                                       : 'Not specified'}
                                 </p>
                              </div>
                           </div>

                           <div>
                              <h3 className='mb-3 flex items-center font-medium'>
                                 <Mail className='mr-2 h-5 w-5 text-primary' />
                                 Contact Information
                              </h3>
                              <div className='grid grid-cols-2 gap-3 text-sm'>
                                 <p className='text-muted-foreground'>Email:</p>
                                 <p>{client.email}</p>
                                 <p className='text-muted-foreground'>Phone:</p>
                                 <p>{client.phone}</p>
                              </div>
                           </div>
                        </div>

                        <div className='space-y-6'>
                           <div>
                              <h3 className='mb-3 font-medium'>
                                 Medical History
                              </h3>
                              <div className='rounded-md border bg-card p-3'>
                                 <p className='text-sm'>
                                    {client.medical_history ||
                                       'No medical history recorded'}
                                 </p>
                              </div>
                           </div>

                           <div>
                              <h3 className='mb-3 font-medium'>Notes</h3>
                              <div className='rounded-md border bg-card p-3'>
                                 <p className='text-sm'>
                                    {client.notes || 'No notes recorded'}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </PageWithSidebar>
   );
};

export default ClientProfilePage;
