import axios, { AxiosError } from 'axios';

import { AXIOS_CONFIG } from './config';

export const api = axios.create(AXIOS_CONFIG);

// redirect to login page if user is not authenticated
api.interceptors.response.use(
   (response) => response,
   async (error: AxiosError) => {
      const requestUrl = error.config?.url;

      // unauthorized request but not login request
      if (error.response?.status === 401 && requestUrl !== 'api/auth/login')
         window.location.replace('/login');

      return Promise.reject(error);
   }
);
