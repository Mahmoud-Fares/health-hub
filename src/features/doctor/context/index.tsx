import { DialogsProvider } from '@/features/doctor/context/dialogs-provider';
import { ScheduleProvider } from '@/features/doctor/context/schedule-provider';

type Props = {
   children: React.ReactNode;
};

export default function Providers({ children }: Props) {
   return (
      <ScheduleProvider>
         <DialogsProvider>{children}</DialogsProvider>
      </ScheduleProvider>
   );
}
