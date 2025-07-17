import { z } from 'zod';

import { phoneValidation, stringValidation } from '@/shared/schema';

export const orderItemSchema = z.object({
   address: stringValidation(5, 'Address must be at least 5 characters'),
   phone: phoneValidation,
});
