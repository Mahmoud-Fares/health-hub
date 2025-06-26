import { ReactNode } from 'react';

import { useDialogsManagement } from '@/features/doctor/hooks/use-dialogs-management';

import { DialogsContext } from './dialogs-context';

type Props = {
   children: ReactNode;
};
export const DialogsProvider = ({ children }: Props) => {
   const dialogsManager = useDialogsManagement();

   return (
      <DialogsContext value={{ ...dialogsManager }}>{children}</DialogsContext>
   );
};
