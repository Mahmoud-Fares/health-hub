import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

function extractValidationErrors(error: any): string | null {
   const errors = error?.response?.data?.errors;

   if (errors && typeof errors === 'object') {
      const messages: string[] = [];
      for (const key in errors) {
         if (Array.isArray(errors[key])) {
            messages.push(...errors[key]);
         } else if (typeof errors[key] === 'string') {
            messages.push(errors[key]);
         }
      }

      return messages.join('\n');
   }
   return null;
}

function extractGeneralError(error: any): string | null {
   const data = error?.response?.data;
   if (data) {
      if (typeof data.msg === 'string') return data.msg;

      if (typeof data.message === 'string') return data.message;
   }
   if (error?.message) return error.message;

   return null;
}

export function getErrorMessage(error: any): string | null {
   const validationErrors = extractValidationErrors(error);
   if (validationErrors) return validationErrors;

   return extractGeneralError(error);
}
