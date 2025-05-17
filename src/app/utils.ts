import { InternalAxiosRequestConfig } from 'axios';

import { api } from '@/shared/lib/axios/axios-client';

import { useAuthStore } from '@/features/auth/store';

export function injectTheToken() {
   api.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
         const token = useAuthStore.getState().currentUser?.token;
         if (token) config.headers.Authorization = `Bearer ${token}`;

         return config;
      },

      (error: any) => Promise.reject(error)
   );
}
