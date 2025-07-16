import { Navigate } from 'react-router-dom';

import { AllowedTo, isDoctor, useAuth } from '@/features/auth';
import DoctorScheduleAppointments from '@/features/doctor/components/doctor-schedule/doctor-schedule-appointments';
import DoctorScheduleDateSelector from '@/features/doctor/components/doctor-schedule/doctor-schedule-date-selector';
import SheetDrawerTriggers from '@/features/doctor/components/doctor-schedule/sheet-drawer-triggers';
import Providers from '@/features/doctor/context';

export default function DoctorSchedulePage() {
   const { currentUser } = useAuth();

   if (isDoctor(currentUser!) && !currentUser.role_activation)
      return <Navigate to='/settings?tab=role_verification' />;

   return (
      <Providers>
         <AllowedTo allowedRoles={['doctor']}>
            <section className='animate-fade-in'>
               <DoctorScheduleHeader />

               <div className='mb-8 flex flex-col gap-6 lg:flex-row'>
                  <DoctorScheduleDateSelector />
                  <div className='rounded-lg lg:flex-1'>
                     <DoctorScheduleAppointments />
                  </div>
               </div>
               <SheetDrawerTriggers />
            </section>
         </AllowedTo>
      </Providers>
   );
}

const DoctorScheduleHeader = () => (
   <header className='mb-8'>
      <h1 className='text-3xl font-bold'>Manage Your Schedule</h1>
      <p className='mt-2'>
         Create and manage your availability for patient appointments
      </p>
   </header>
);
