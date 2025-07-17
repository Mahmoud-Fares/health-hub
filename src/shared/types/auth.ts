import { DoctorAppointment } from '.';

type User = {
   id: number;
   slug: string;
   name: string;
   email: string;
   image?: string;
   age?: number;
   role: 'client' | 'doctor' | 'deactivated';
   gender?: string;
   token: string;
   phone?: string;
   email_verified_at?: string;
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
   role_activation: boolean;
};

export type DoctorProfile = Doctor & {
   appointments: DoctorAppointment[];
};

export type AuthUser = Patient | DoctorProfile;
