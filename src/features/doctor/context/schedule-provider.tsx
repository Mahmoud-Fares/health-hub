import { ReactNode } from 'react';

import { useScheduleManagement } from '@/features/doctor/hooks/use-schedule-management';

import { ScheduleContext } from './schedule-context';

type Props = {
   children: ReactNode;
};
export const ScheduleProvider = ({ children }: Props) => {
   const scheduleManager = useScheduleManagement();

   return (
      <ScheduleContext value={{ ...scheduleManager }}>
         {children}
      </ScheduleContext>
   );
};
