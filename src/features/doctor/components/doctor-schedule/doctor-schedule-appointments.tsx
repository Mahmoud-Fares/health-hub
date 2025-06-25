import { AppointmentList } from '../appointment-list';

const DoctorScheduleAppointments: React.FC = () => {
   return (
      <div className='rounded-lg p-6 shadow-md'>
         <h2 className='mb-4 text-lg font-medium'>Your Appointments</h2>

         <AppointmentList />
      </div>
   );
};

export default DoctorScheduleAppointments;
