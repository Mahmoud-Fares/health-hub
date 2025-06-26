import { use } from 'react';

import { DialogsContext } from '@/features/doctor/context/dialogs-context';

export const useDialogs = () => {
   const ctx = use(DialogsContext);
   if (!ctx)
      throw new Error('useSchedule must be used within DoctorScheduleProvider');
   return ctx;
};
