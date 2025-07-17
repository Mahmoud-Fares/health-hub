import { StoreContext } from '@/features/store/context/store-context';
import { useStoreManagement } from '@/features/store/hooks/use-store-management';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
   const value = useStoreManagement();

   return <StoreContext value={{ ...value }}>{children}</StoreContext>;
};
