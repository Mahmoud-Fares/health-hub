import { useMediaQuery } from '@/shared/hooks/use-media-query';
import { useUIStore } from '@/shared/stores/ui';

export const useUI = () => {
   const isMobile = useMediaQuery('(max-width: 640px)');

   const showSidebar = useUIStore((state) => state.showSidebar);
   const setShowSidebar = useUIStore((state) => state.setShowSidebar);

   return {
      showSidebar: !isMobile && showSidebar,
      setShowSidebar,
   };
};
