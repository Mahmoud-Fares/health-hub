import { api } from '@/shared/lib';

export interface DoctorUpdatePayload {
   fees?: string;
   bio?: string;
   clinicaddress?: string;
   clinicgovernate?: string | null;
   clinicname?: string;
   name?: string;
   email?: string;
   phone?: string;
   age?: number | null;
   gender?: string;
   specialization?: string[];
}

export interface ClientUpdatePayload {
   name?: string;
   email?: string;
   age?: number | null;
   gender?: string;
   role?: string;
   phone?: string;
   notes?: string | null;
   medical_history?: string | null;
   blood_type?: string | null;
   weight?: number | null;
   height?: number | null;
}

const settingsService = {
   updateProfile: async (
      payload: DoctorUpdatePayload | ClientUpdatePayload
   ): Promise<any> => {
      const response = await api.put('profile/update', payload);
      return response.data;
   },
};

export default settingsService;
