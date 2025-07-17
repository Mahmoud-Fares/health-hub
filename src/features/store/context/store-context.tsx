import { createContext } from 'react';

import { useStoreManagement } from '@/features/store/hooks/use-store-management';

type ContextType = ReturnType<typeof useStoreManagement>;

export const StoreContext = createContext<ContextType | undefined>(undefined);
