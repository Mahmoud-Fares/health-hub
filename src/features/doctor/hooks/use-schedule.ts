import { use } from 'react';

import { ScheduleContext } from '@/features/doctor/context/schedule-context';

export const useSchedule = () => {
   const ctx = use(ScheduleContext);
   if (!ctx)
      throw new Error('useSchedule must be used within DoctorScheduleProvider');
   return ctx;
};
