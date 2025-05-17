import { env } from '@/shared/env';

export const AXIOS_CONFIG = {
   baseURL: env.API_URL,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
   },
};
