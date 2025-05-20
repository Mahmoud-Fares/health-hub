import { api } from '@/shared/lib';
import { Patient } from '@/shared/types';
import { ApiResponse } from '@/shared/types/api';
import { DoctorProfile } from '@/shared/types/auth';

const profileService = {
   getDoctorProfile: async (
      doctorSlug: string
   ): Promise<ApiResponse<DoctorProfile>> => {
      const response = await api.get(`Doctor/showDoctorInfo/${doctorSlug}`);
      return response.data;
   },

   getClientProfile: async (
      patientSlug: string
   ): Promise<ApiResponse<{ user: Patient }>> => {
      const response = await api.get(`profile/users/slug/${patientSlug}`);
      return response.data;
   },
};

export default profileService;
