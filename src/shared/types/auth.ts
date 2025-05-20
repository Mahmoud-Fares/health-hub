import { DoctorAppointment } from '.';

type User = {
   id?: number;
   slug: string;
   name: string;
   email: string;
   image?: string;
   age?: number | null;
   role: 'client' | 'doctor';
   gender?: string;
   token: string;
   phone?: string;
};

export type Patient = User & {
   notes?: string;
   medical_history?: string;
   blood_type?: string;
   weight?: string;
   height?: string;
};

export type Doctor = User & {
   fees?: string;
   bio?: string;
   clinicaddress?: string;
   clinicgovernate?: string;
   clinicname?: string;
   specialization: string[];
};

export type DoctorWithAppointments = Doctor & {
   appointments: DoctorAppointment[];
};

export type AuthUser = Patient | DoctorWithAppointments;
