import { z } from 'zod';

export const stringValidation = (minLength = 0, message = '') =>
   z.string().min(minLength, message);

export const emailValidation = z
   .string()
   .email('Please enter a valid email address');

export const roleValidation = z.enum(['client', 'doctor'], {
   message: 'Please select a role',
});

export const genderValidation = z.enum(['male', 'female'], {
   message: 'Please select a gender',
});

export const phoneValidation = z
   .string()
   .min(10, 'Phone number must be at least 10 characters')
   .regex(/^\+?[\d\s-]{10,}$/, 'Please enter a valid phone number');

export const passwordValidation = z
   .string()
   .min(6, 'Password must be at least 6 characters');

export const dateValidation = z.coerce.date({
   required_error: 'Date is required',
   invalid_type_error: 'Please enter a valid date',
});
