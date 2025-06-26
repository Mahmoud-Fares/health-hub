import { useMediaQuery } from '@/shared/hooks/use-media-query';

import DeleteDialog from './delete-dialog';
import DeleteDrawer from './delete-drawer';

export const DeleteDialogDrawer = () => {
   const isDesktop = useMediaQuery('(min-width: 768px)');

   if (isDesktop) return <DeleteDialog />;

   return <DeleteDrawer />;
};
