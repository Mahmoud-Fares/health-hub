import { api } from '@/shared/lib';

export interface RegisterPayload {
   name: string;
   email: string;
   password: string;
   password_confirmation: string;
   role: 'client' | 'doctor';
   phone: string;
   gender: 'male' | 'female';
}

export interface LoginPayload {
   email: string;
   password: string;
}

export interface AuthResponse {
   status: number;
   msg: string;
   data: {
      token: string;
      name: string;
      email: string;
      role: 'client' | 'doctor';
      slug: string;
   };
}

const authService = {
   register: async (userData: RegisterPayload): Promise<AuthResponse> => {
      const response = await api.post('auth/register', userData);
      return response.data;
   },

   login: async (credentials: LoginPayload): Promise<AuthResponse> => {
      const response = await api.post('auth/login', credentials);
      return response.data;
   },

   logout: async (): Promise<{ status: number; msg: string; data: [] }> => {
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
};

export default authService;
