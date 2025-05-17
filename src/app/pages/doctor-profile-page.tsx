import { Calendar, Info, Mail, Phone } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/shared/components/ui/table';

import { useDoctorProfile } from '@/features/profile/api/hooks';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

const DoctorProfilePage = () => {
   const { slug } = useParams<{ slug: string }>();
   const { data: response, isLoading, error } = useDoctorProfile(slug);
   const doctor = response?.data;

   if (isLoading) {
      return (
         <div className='flex min-h-screen items-center justify-center'>
            <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary'></div>
         </div>
      );
   }

   if (error || !doctor) {
      return (
         <PageWithSidebar>
            <div className='flex min-h-screen items-center justify-center p-4'>
               <Card className='w-full max-w-3xl'>
                  <CardHeader>
                     <CardTitle className='text-center text-red-500'>
                        Error Loading Profile
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className='text-center'>
                        {error?.message ||
                           'Could not load doctor profile. Please try again later.'}
                     </p>
                  </CardContent>
               </Card>
            </div>
         </PageWithSidebar>
      );
   }

   return (
      <PageWithSidebar>
         <div className='p-4 md:p-8'>
            <div className='mx-auto'>
               <Card className='mb-6'>
                  <CardHeader className='pb-0'>
                     <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                        <div className='flex items-center space-x-4'>
                           <Avatar className='h-20 w-20'>
                              {doctor.image ? (
                                 <AvatarImage
                                    src={doctor.image}
                                    alt={doctor.name}
                                 />
                              ) : (
                                 <AvatarFallback className='bg-primary text-lg text-primary-foreground'>
                                    {doctor.name.substring(0, 2).toUpperCase()}
                                 </AvatarFallback>
                              )}
                           </Avatar>
                           <div>
                              <CardTitle className='text-2xl'>
                                 {doctor.name}
                              </CardTitle>
                              <p className='text-muted-foreground'>
                                 {doctor.specialization?.length
                                    ? doctor.specialization.join(', ')
                                    : 'General Practitioner'}
                              </p>
                           </div>
                        </div>
                        <div className='mt-4 rounded-md bg-primary/10 px-4 py-2 md:mt-0'>
                           <p className='text-sm font-medium'>
                              Consultation Fee
                           </p>
                           <p className='font-bold'>
                              {doctor.fees || 'Not specified'}
                           </p>
                        </div>
                     </div>
                  </CardHeader>
                  <CardContent className='pt-6'>
                     <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                           <div className='flex items-start space-x-2'>
                              <Info className='mt-0.5 h-5 w-5 text-primary' />
                              <div>
                                 <h3 className='font-medium'>About</h3>
                                 <p className='text-sm text-muted-foreground'>
                                    {doctor.bio || 'No bio available'}
                                 </p>
                              </div>
                           </div>

                           <div className='flex items-start space-x-2'>
                              <Mail className='mt-0.5 h-5 w-5 text-primary' />
                              <div>
                                 <h3 className='font-medium'>Email</h3>
                                 <p className='text-sm text-muted-foreground'>
                                    {doctor.email}
                                 </p>
                              </div>
                           </div>

                           <div className='flex items-start space-x-2'>
                              <Phone className='mt-0.5 h-5 w-5 text-primary' />
                              <div>
                                 <h3 className='font-medium'>Phone</h3>
                                 <p className='text-sm text-muted-foreground'>
                                    {doctor.phone}
                                 </p>
                              </div>
                           </div>

                           <div>
                              <h3 className='mb-1 font-medium'>
                                 Personal Information
                              </h3>
                              <div className='grid grid-cols-2 gap-2 text-sm'>
                                 <p className='text-muted-foreground'>Age:</p>
                                 <p>{doctor.age || 'Not specified'}</p>
                                 <p className='text-muted-foreground'>
                                    Gender:
                                 </p>
                                 <p className='capitalize'>
                                    {doctor.gender || 'Not specified'}
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className='space-y-4'>
                           <h3 className='flex items-center font-medium'>
                              <Calendar className='mr-2 h-5 w-5 text-primary' />
                              Clinic Details
                           </h3>
                           <div className='grid grid-cols-2 gap-2 text-sm'>
                              <p className='text-muted-foreground'>
                                 Clinic Name:
                              </p>
                              <p>{doctor.clinicname || 'Not specified'}</p>
                              <p className='text-muted-foreground'>Address:</p>
                              <p>{doctor.clinicaddress || 'Not specified'}</p>
                              <p className='text-muted-foreground'>
                                 Governate:
                              </p>
                              <p>{doctor.clinicgovernate || 'Not specified'}</p>
                           </div>
                        </div>
                     </div>

                     <div className='mt-8'>
                        <div className='flex items-center justify-between'>
                           <h3 className='mb-4 font-medium'>
                              Available Appointments
                           </h3>

                           <Link to={`/book-appointment/${slug}`}>
                              <Button className='mb-4'>Book Appointment</Button>
                           </Link>
                        </div>

                        {doctor.appointments &&
                        doctor.appointments.length > 0 ? (
                           <div className='overflow-x-auto'>
                              <Table>
                                 <TableHeader>
                                    <TableRow>
                                       <TableHead>Date</TableHead>
                                       <TableHead>Day</TableHead>
                                       <TableHead>Start Time</TableHead>
                                       <TableHead>End Time</TableHead>
                                       <TableHead>Session Duration</TableHead>
                                       <TableHead>Max Patients</TableHead>
                                       <TableHead>Actions</TableHead>
                                    </TableRow>
                                 </TableHeader>
                                 <TableBody>
                                    {doctor.appointments.map((appointment) => (
                                       <TableRow key={appointment.id}>
                                          <TableCell>
                                             {appointment.date}
                                          </TableCell>
                                          <TableCell>
                                             {appointment.day}
                                          </TableCell>
                                          <TableCell>
                                             {appointment.start_time}
                                          </TableCell>
                                          <TableCell>
                                             {appointment.end_time}
                                          </TableCell>
                                          <TableCell>
                                             {appointment.session_duration}
                                          </TableCell>
                                          <TableCell>
                                             {appointment.max_patients}
                                          </TableCell>
                                          <TableCell>
                                             <Link
                                                to={`/appointment-bookings/${appointment.id}/${encodeURIComponent(appointment.date)}`}
                                             >
                                                <Button
                                                   variant='outline'
                                                   size='sm'
                                                >
                                                   View Bookings
                                                </Button>
                                             </Link>
                                          </TableCell>
                                       </TableRow>
                                    ))}
                                 </TableBody>
                              </Table>
                           </div>
                        ) : (
                           <p className='text-sm text-muted-foreground'>
                              No appointments available
                           </p>
                        )}
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </PageWithSidebar>
   );
};

export default DoctorProfilePage;
