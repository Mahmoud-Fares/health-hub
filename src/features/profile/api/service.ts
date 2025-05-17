import { api } from '@/shared/lib';

export interface DoctorProfile {
   id: number;
   slug: string;
   fees: string;
   bio: string | null;
   image: string | null;
   clinicaddress: string | null;
   clinicgovernate: string | null;
   clinicname: string | null;
   name: string;
   email: string;
   phone: string;
   age: number | null;
   gender: string;
   specialization: string[];
   appointments: {
      id: number;
      date: string;
      day: string;
      start_time: string;
      session_duration: string;
      max_patients: number;
      end_time: string;
      is_available: number;
   }[];
}

export interface ClientProfile {
   name: string;
   email: string;
   age: number | null;
   gender: string;
   slug: string;
   role: string;
   phone: string;
   user_id: number;
   client_id: number;
   notes: string | null;
   medical_history: string | null;
   blood_type: string | null;
   weight: number | null;
   height: number | null;
}

export interface ApiResponse<T> {
   status: number;
   msg: string;
   data: T;
}

export interface ValidationError {
   message: string;
   errors: Record<string, string[]>;
}

const profileService = {
   getDoctorProfile: async (
      doctorSlug: string
   ): Promise<ApiResponse<DoctorProfile>> => {
      const response = await api.get(`Doctor/showDoctorInfo/${doctorSlug}`);
      return response.data;
   },

   getClientProfile: async (
      patientSlug: string
   ): Promise<ApiResponse<{ user: ClientProfile }>> => {
      const response = await api.get(`profile/users/slug/${patientSlug}`);
      return response.data;
   },
};

export default profileService;
