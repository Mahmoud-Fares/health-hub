import { useState } from 'react';

import { Check, Info, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { DoctorAppointment } from '@/shared/types';

import {
   useBookAppointment,
   useGetAvailableSlots,
} from '@/features/booking/api/booking-hooks';
import AppointmentSelector from '@/features/booking/components/appointment-selector';
import TimeSlotSelector from '@/features/booking/components/time-slot-selector';
import { useDoctorProfile } from '@/features/profile/api/hooks';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

const BookAppointmentPage = () => {
   const { slug } = useParams<{ slug: string }>();
   const navigate = useNavigate();

   const [selectedAppointment, setSelectedAppointment] =
      useState<DoctorAppointment | null>(null);
   const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
      null
   );

   const { data: doctorResponse, isLoading: isLoadingDoctor } =
      useDoctorProfile(slug);
   const { data: slotsResponse, isLoading: isLoadingSlots } =
      useGetAvailableSlots(selectedAppointment?.id?.toString());

   const { mutate: bookAppointment, isPending: isBooking } =
      useBookAppointment();

   const doctor = doctorResponse?.data;
   const appointments = doctorResponse?.data.appointments || [];
   const availableSlots = slotsResponse?.data || [];

   const handleAppointmentSelect = (appointment: DoctorAppointment) => {
      setSelectedAppointment(appointment);
      setSelectedTimeSlot(null);
   };

   const handleTimeSlotSelect = (slot: string) => {
      setSelectedTimeSlot(slot);
   };

   const handleBookAppointment = () => {
      if (!doctor || !selectedAppointment || !selectedTimeSlot) return;

      bookAppointment({
         doctor_id: doctor.id,
         appointment_id: selectedAppointment.id,
         slot_start_time: selectedTimeSlot,
      });
   };

   if (isLoadingDoctor) {
      return (
         <PageWithSidebar>
            <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center'>
               <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary'></div>
            </div>
         </PageWithSidebar>
      );
   }

   if (!doctor) {
      return (
         <PageWithSidebar>
            <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center p-4'>
               <Card className='w-full max-w-3xl'>
                  <CardHeader>
                     <CardTitle className='text-center text-destructive'>
                        Error Loading Doctor
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className='text-center'>
                        Could not load doctor profile. Please try again later.
                     </p>
                     <div className='mt-4 flex justify-center'>
                        <Button onClick={() => navigate('/find-doctors')}>
                           Back to Find Doctors
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
         <div className='bg-background p-4 md:p-8'>
            <div className='mx-auto max-w-5xl'>
               <Card className='shadow-sm'>
                  <CardHeader>
                     <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                        <div className='flex items-center space-x-4'>
                           <Avatar className='h-16 w-16'>
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
                              <CardDescription>
                                 {doctor.specialization?.length
                                    ? doctor.specialization.join(', ')
                                    : 'General Practitioner'}
                              </CardDescription>
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

                  <CardContent className='space-y-6'>
                     <div className='flex flex-col space-y-2'>
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
                           <Info className='mt-0.5 h-5 w-5 text-primary' />
                           <div>
                              <h3 className='font-medium'>Clinic</h3>
                              <p className='text-sm text-muted-foreground'>
                                 {doctor.clinicname || 'No clinic information'}
                                 {doctor.clinicaddress &&
                                    `, ${doctor.clinicaddress}`}
                                 {doctor.clinicgovernate &&
                                    `, ${doctor.clinicgovernate}`}
                              </p>
                           </div>
                        </div>
                     </div>

                     <Separator />

                     <div>
                        <h2 className='mb-4 text-xl font-semibold'>
                           Book an Appointment
                        </h2>

                        {
                           <AppointmentSelector
                              appointments={appointments}
                              onAppointmentSelect={handleAppointmentSelect}
                              selectedAppointmentId={
                                 selectedAppointment?.id || null
                              }
                           />
                        }
                     </div>

                     {selectedAppointment && (
                        <>
                           <Separator />

                           <div>
                              {isLoadingSlots ? (
                                 <div className='flex items-center justify-center py-4'>
                                    <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary'></div>
                                 </div>
                              ) : (
                                 <TimeSlotSelector
                                    slots={availableSlots}
                                    onSlotSelect={handleTimeSlotSelect}
                                    selectedSlot={selectedTimeSlot}
                                 />
                              )}
                           </div>
                        </>
                     )}
                  </CardContent>

                  <CardFooter className='flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0'>
                     <Button
                        variant='outline'
                        onClick={() => navigate(`/doctor/${slug}`)}
                     >
                        <X className='mr-2 h-4 w-4' /> Cancel
                     </Button>

                     <Button
                        onClick={handleBookAppointment}
                        disabled={!selectedTimeSlot || isBooking}
                        className='w-full sm:w-auto'
                     >
                        {isBooking ? (
                           <div className='h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white'></div>
                        ) : (
                           <>
                              <Check className='mr-2 h-4 w-4' /> Book
                              Appointment
                           </>
                        )}
                     </Button>
                  </CardFooter>
               </Card>
            </div>
         </div>
      </PageWithSidebar>
   );
};

export default BookAppointmentPage;
