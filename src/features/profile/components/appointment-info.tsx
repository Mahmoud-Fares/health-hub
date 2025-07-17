import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { DoctorProfile } from '@/shared/types/auth';

import { ViewToOthersOnly } from '@/features/auth';
import { AppointmentsTable } from '@/features/profile/components/appointments-table';

type Props = {
   doctor: DoctorProfile;
};

export default function AppointmentInfo({ doctor }: Props) {
   return (
      <section className='mt-8' aria-labelledby='appointments-heading'>
         <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
            <h3 id='appointments-heading' className='font-medium'>
               Available Appointments
            </h3>

            <ViewToOthersOnly profile={doctor}>
               <Link
                  to={`/book-appointment/${doctor.slug}`}
                  aria-label={`Book appointment with Dr. ${doctor.name}`}
               >
                  <Button className='w-full sm:w-auto'>Book Appointment</Button>
               </Link>
            </ViewToOthersOnly>
         </div>

         <div className='mt-4'>
            <AppointmentsTable
               appointments={doctor.appointments}
               doctor={doctor}
            />
         </div>
      </section>
   );
}
