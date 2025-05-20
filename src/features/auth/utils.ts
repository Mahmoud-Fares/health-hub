import { AuthUser, Doctor, Patient } from '@/shared/types';

export function isDoctor(user: AuthUser): user is Doctor {
   return user.role === 'doctor';
}

export function isPatient(user: AuthUser): user is Patient {
   return user.role === 'client';
}
