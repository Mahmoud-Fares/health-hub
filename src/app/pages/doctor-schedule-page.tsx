import React from 'react';

import { useAuth } from '@/features/auth';
import { DeleteDialog } from '@/features/doctor/components/appointment-sheet-drawer/delete-dialog-drawer';
import DoctorScheduleAppointments from '@/features/doctor/components/doctor-schedule/doctor-schedule-appointments';
import DoctorScheduleDateSelector from '@/features/doctor/components/doctor-schedule/doctor-schedule-date-selector';
import Providers from '@/features/doctor/context';

const DoctorScheduleHeader = () => (
   <header className='mb-8'>
      <h1 className='text-3xl font-bold'>Manage Your Schedule</h1>
      <p className='mt-2'>
         Create and manage your availability for patient appointments
      </p>
   </header>
);

const DoctorSchedulePage: React.FC = () => {
   const { currentUser } = useAuth();

   if (currentUser?.role !== 'doctor') {
      return (
         <div className='container mx-auto px-4 py-16 text-center'>
            <h1 className='mb-4 text-2xl font-bold'>Access Denied</h1>
            <p>You must be logged in as a doctor to manage schedules.</p>
         </div>
      );
   }

   return (
      <Providers>
         <section className='animate-fade-in'>
            <DoctorScheduleHeader />

            <div className='mb-8 flex flex-col gap-6 lg:flex-row'>
               <DoctorScheduleDateSelector />
               <div className='rounded-lg lg:flex-1'>
                  <DoctorScheduleAppointments />
               </div>
            </div>

            <DeleteDialog />

            {/* <DoctorScheduleDialogs /> */}
         </section>
      </Providers>
   );
};

export default DoctorSchedulePage;
