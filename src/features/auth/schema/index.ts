import { z } from 'zod';

import {
   emailValidation,
   genderValidation,
   passwordValidation,
   phoneValidation,
   roleValidation,
   stringValidation,
} from '@/shared/schema';

export const loginSchema = z.object({
   email: emailValidation,
   password: passwordValidation,
});

export const registerSchema = z
   .object({
      name: stringValidation(
         4,
         'Full Name must contain at least 4 character(s)'
      ).max(20, 'Full Name must contain at most 20 character(s)'),
      email: emailValidation,
      password: passwordValidation,
      password_confirmation: z.string(),
      role: roleValidation,
      phone: phoneValidation,
      gender: genderValidation,
   })
   .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords don't match",
      path: ['password_confirmation'],
   });
