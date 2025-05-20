export type DoctorAppointment = {
   id: number;
   doctor_name: string;
   date: string;
   day: string;
   start_time: string;
   end_time: string;
   session_duration: string;
   is_available: number | boolean;
   max_patients: number;
};
