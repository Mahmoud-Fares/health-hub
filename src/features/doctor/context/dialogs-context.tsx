import { createContext } from 'react';

import { useDialogsManagement } from '@/features/doctor/hooks/use-dialogs-management';

type ContextValue = ReturnType<typeof useDialogsManagement>;

export const DialogsContext = createContext<ContextValue | undefined>(
   undefined
);
