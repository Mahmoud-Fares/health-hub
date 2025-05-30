import { api } from '@/shared/lib';
import { ApiResponse, AuthUser } from '@/shared/types';

import {
   AuthResponse,
   LoginPayload,
   RegisterPayload,
} from '@/features/auth/types';

const authService = {
   register: async (userData: RegisterPayload): Promise<AuthResponse> => {
      const response = await api.post('auth/register', userData);
      return response.data;
   },

   login: async (credentials: LoginPayload): Promise<AuthResponse> => {
      const response = await api.post('auth/login', credentials);
      return response.data;
   },

   completeLogin: async (
      credentials: LoginPayload
   ): Promise<{ userData: AuthUser }> => {
      const loginResponse = await authService.login(credentials);

      if (!loginResponse || !loginResponse.data)
         throw new Error('Invalid login response');

      const { role, slug, token } = loginResponse.data;

      const userData = await authService.getCurrentUserData({
         role,
         slug,
         token,
      });

      return { userData };
   },

   completeRegister: async (
      registerData: RegisterPayload
   ): Promise<{ userData: AuthUser }> => {
      const registerResponse = await authService.register(registerData);

      if (!registerResponse || !registerResponse.data) {
         throw new Error('Invalid registration response');
      }

      const { role, slug, token } = registerResponse.data;
      const userData = await authService.getCurrentUserData({
         role,
         slug,
         token,
      });

      return { userData };
   },

   logout: async (): Promise<ApiResponse<[]>> => {
      const response = await api.post('auth/logout');
      return response.data;
   },

   deleteAccount: async (): Promise<{
      status: number;
      msg: string;
      data: [];
   }> => {
      const response = await api.delete('auth/user/delete');
      return response.data;
   },

   getCurrentUserData: async ({
      role,
      slug,
      token,
   }: {
      role: AuthUser['role'];
      slug: string;
      token: string;
   }): Promise<AuthUser> => {
      let response;

      if (role === 'client') {
         response = await api.get(`profile/users/slug/${slug}`, {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
         });

         // Handle client response structure
         const { user } = response.data.data;
         return {
            id: user.client_id,
            token,
            name: user.name,
            email: user.email,
            role: user.role,
            slug: user.slug,
            phone: user.phone,
            gender: user.gender,
            age: user.age,
            // Additional client-specific fields
            medical_history: user.medical_history,
            blood_type: user.blood_type,
            weight: user.weight,
            height: user.height,
            notes: user.notes,
         };
      } else {
         response = await api.get(`Doctor/showDoctorInfo/${slug}`, {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
         });

         // Handle doctor response structure
         const doctorData = response.data.data;
         return {
            id: doctorData.id,
            name: doctorData.name,
            email: doctorData.email,
            role: doctorData.role,
            slug: doctorData.slug,
            phone: doctorData.phone,
            gender: doctorData.gender,
            age: doctorData.age,
            token,
            // Additional doctor-specific fields
            fees: doctorData.fees,
            bio: doctorData.bio,
            image: doctorData.image,
            clinicaddress: doctorData.clinicaddress,
            clinicgovernate: doctorData.clinicgovernate,
            clinicname: doctorData.clinicname,
            specialization: doctorData.specialization,
            appointments: doctorData.appointments,
         };
      }
   },
};

export default authService;
