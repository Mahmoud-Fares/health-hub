import { createContext } from 'react';

import { useScheduleManagement } from '@/features/doctor/hooks/use-schedule-management';

type ContextValue = ReturnType<typeof useScheduleManagement>;

export const ScheduleContext = createContext<ContextValue | undefined>(
   undefined
);
