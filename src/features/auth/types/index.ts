import { z } from 'zod';

import { ApiResponse } from '@/shared/types';

import { loginSchema, registerSchema } from '@/features/auth/schema';

export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;

export type AuthResponse = ApiResponse<{
   token: string;
   name: string;
   email: string;
   role: 'client' | 'doctor';
   slug: string;
}>;
