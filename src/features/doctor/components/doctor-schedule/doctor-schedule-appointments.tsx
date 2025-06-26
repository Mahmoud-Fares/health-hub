import { AppointmentList } from '@/features/doctor/components/appointment-list';

export default function DoctorScheduleAppointments() {
   return (
      <div className='rounded-lg sm:p-6 sm:shadow-md'>
         <h2 className='mb-4 text-lg font-medium'>Your Appointments</h2>

         <AppointmentList />
      </div>
   );
}
