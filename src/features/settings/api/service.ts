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
   specialty?: string;
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
      const response = await api.post('profile/update', payload);
      return response.data;
   },
   uploadProfileImage: async (formData: FormData): Promise<any> => {
      const response = await api.post('/profile/update', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });

      return response.data;
   },
   deleteProfileImage: async (): Promise<any> => {
      const response = await api.delete('profile/delete-picture');

      return response.data;
   },
   deleteProfile: async (): Promise<any> => {
      const response = await api.delete('auth/user/delete');
      return response.data;
   },
   changePassword: async (payload: {
      oldPassword: string;
      newPassword: string;
      newPassword_confirmation: string;
   }): Promise<any> => {
      const response = await api.put('profile/changePassword', payload);
      return response.data;
   },
};

export default settingsService;
