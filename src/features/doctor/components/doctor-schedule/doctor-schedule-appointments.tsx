import { AppointmentList } from '@/features/doctor/components/appointment-list';

export default function DoctorScheduleAppointments() {
   return (
      <div className='rounded-lg p-6 shadow-md'>
         <h2 className='mb-4 text-lg font-medium'>Your Appointments</h2>

         <AppointmentList />
      </div>
   );
}
