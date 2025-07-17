import { use } from 'react';

import { StoreContext } from '@/features/store/context/store-context';

export const useStore = () => {
   const ctx = use(StoreContext);
   if (!ctx) throw new Error('useStore must be used within StoreProvider');
   return ctx;
};
