import { useNavigate, useParams } from 'react-router-dom';

import { useBookAppointment } from '@/features/booking/api/booking-hooks';
import { useDoctorProfile } from '@/features/profile/api/hooks';

export const useBooking = () => {
   const { slug } = useParams<{ slug: string }>();
   const navigate = useNavigate();

   const {
      data: doctorResponse,
      isLoading: isLoadingDoctor,
      error: doctorError,
   } = useDoctorProfile(slug);

   const { mutate: bookAppointment, isPending: isBooking } =
      useBookAppointment();

   const doctor = doctorResponse?.data;
   const appointments = doctorResponse?.data.appointments || [];

   const handleBookAppointment = (
      appointmentId: number,
      slotStartTime: string
   ) => {
      if (!doctor) return;

      bookAppointment({
         doctor_id: doctor.id,
         appointment_id: appointmentId,
         slot_start_time: slotStartTime,
      });
   };

   const handleCancel = () => {
      navigate(`/doctor/${slug}`);
   };

   return {
      doctor,
      appointments,
      isLoadingDoctor,
      doctorError,
      isBooking,
      handleBookAppointment,
      handleCancel,
   };
};
