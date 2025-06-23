import { Card } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

import { AppointmentBookingSection } from '@/app/pages/book-appointment/components/appointment-booking-section';
import { DoctorInfoCard } from '@/app/pages/book-appointment/components/doctor-info-card';
import { LoadingState } from '@/app/pages/book-appointment/components/loading-state';
import { useBooking } from '@/app/pages/book-appointment/hooks/use-booking';

import { NoDoctorFound } from '../no-doctor-found';

const BookAppointmentPage = () => {
   const {
      doctor,
      appointments,
      isLoadingDoctor,
      doctorError,
      isBooking,
      handleBookAppointment,
      handleCancel,
   } = useBooking();

   if (isLoadingDoctor) return <LoadingState />;

   if (doctorError || !doctor) return <NoDoctorFound error={doctorError} />;

   return (
      <>
         <div className='p-4 md:p-8'>
            <Card className='shadow-sm'>
               <DoctorInfoCard doctor={doctor} />

               <div className='p-6'>
                  <Separator />
               </div>

               <AppointmentBookingSection
                  appointments={appointments}
                  onBookAppointment={handleBookAppointment}
                  isBooking={isBooking}
                  onCancel={handleCancel}
               />
            </Card>
         </div>
      </>
   );
};

export default BookAppointmentPage;
