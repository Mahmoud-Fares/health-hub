export type { ApiResponse } from './api';

// Auth types
export type { AuthUser, Doctor, Patient } from './auth';

// Appointment types
export type { DoctorAppointment } from './appointment';

// Booking types
export interface AvailableSlot {
   time: string;
   available: boolean;
}

export interface BookAppointmentPayload {
   doctor_id: number;
   appointment_id: number;
   slot_start_time: string;
}

export interface BookingResponse {
   id: number;
   appointment_id: number;
   doctor_id: number;
   client_id: number;
   status: 'pending' | 'confirmed' | 'cancelled';
   slot_start_time: string;
   slot_end_time: string;
   appointment: {
      start_time: string;
      end_time: string;
      capacity: number;
      available_capacity: number;
      meeting_link: string | null;
   };
   doctor: {
      id: number;
      name: string;
      specialties: string[];
   };
}

// Client bookings types
export interface ClientBooking {
   id: number;
   appointment_id: number;
   doctor_id: number;
   client_id: number;
   status: 'pending' | 'confirmed' | 'served' | 'cancelled';
   'slot_start_time||session_start_time'?: string;
   'slot_end_time||session_end_time'?: string;
   google_meet_link?: string | null;
   booking_time: string;
   appointment: {
      start_time: string;
      end_time: string;
      date: string;
   };
   doctor: {
      id: number;
      name: string;
      specialties: string[];
   };
   client: {
      id: number;
      name: string;
      email: string;
      phone: string;
      age: number;
      gender: string;
   };
}

export interface PaginatedResponse<T> {
   data: T[];
   links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
   };
   meta: {
      current_page: number;
      total_pages: number;
      total_items: number;
      items_per_page: number;
   };
}

export interface ClientBookingsResponse {
   data: PaginatedResponse<ClientBooking>;
}

// Doctor appointment booking management types
export interface BookingClient {
   name: string;
   email: string;
   phone: string;
}

export interface BookingSlot {
   booking_id: number;
   slot_start_time: string;
   slot_end_time: string;
   google_meet_link: string | null;
   clients: BookingClient[];
}

export interface AppointmentBooking {
   appointment_id: number;
   status: 'confirmed' | 'served';
   slots: BookingSlot[];
   appointment: {
      start_time: string;
      end_time: string;
      capacity: number;
      available_capacity: number;
   };
   doctor: {
      id: number;
      name: string;
      specialties: string[];
   };
}

export type AppointmentBookingsResponse = PaginatedResponse<AppointmentBooking>;

// these were in the feature/doctor/api/schedule-service.ts file
//
// this is moved to the shared/types/appointment.ts file
// export interface DoctorAppointment {
//    id: number;
//    doctor_name: string;
//    date: string;
//    day: string;
//    start_time: string;
//    end_time: string;
//    session_duration: string;
//    is_available: number | boolean;
//    max_patients: number;
// }

export interface AppointmentPayload {
   date: string;
   start_time: string;
   end_time: string;
   session_duration: number;
   is_available: boolean;
   max_patients: number;
}
