import { useMediaQuery } from '@/shared/hooks/use-media-query';

import { useDialogs } from '@/features/doctor/hooks/use-dialogs';

import AppointmentDrawer from './appointment-drawer';
import AppointmentSheet from './appointment-sheet';

type Props = {
   event: 'add' | 'edit';
};

export default function AppointmentSheetDrawer(props: Props) {
   const {
      isAddDialogOpen,
      isEditDialogOpen,
      setIsAddDialogOpen,
      setIsEditDialogOpen,
   } = useDialogs();

   const isOpen = props.event === 'add' ? isAddDialogOpen : isEditDialogOpen;
   const setIsOpen =
      props.event === 'add' ? setIsAddDialogOpen : setIsEditDialogOpen;

   const isDesktop = useMediaQuery('(min-width: 768px)');

   if (isDesktop)
      return (
         <AppointmentSheet
            open={isOpen}
            setOpen={setIsOpen}
            event={props.event}
         />
      );

   return (
      <AppointmentDrawer
         open={isOpen}
         setOpen={setIsOpen}
         event={props.event}
      />
   );
}
