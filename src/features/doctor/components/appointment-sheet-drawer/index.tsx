import { useMediaQuery } from '@/shared/hooks/use-media-query';
import { DoctorAppointment } from '@/shared/types';

import { useDialogs } from '@/features/doctor/hooks/use-dialogs';

import AppointmentDrawer from './appointment-drawer';
import AppointmentSheet from './appointment-sheet';

type Props = EditSheetDrawerProps | AddSheetDrawerProps;

type AddSheetDrawerProps = SharedProps & { event: 'add' };
type EditSheetDrawerProps = SharedProps & {
   initialValues: DoctorAppointment;
   event: 'edit';
};

type SharedProps = {
   children: React.ReactNode;
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

   // const isOpen = isAddDialogOpen || isEditDialogOpen;
   // const setIsOpen = setIsAddDialogOpen || setIsEditDialogOpen;

   const isDesktop = useMediaQuery('(min-width: 768px)');

   if (isDesktop)
      return (
         <AppointmentSheet
            open={isOpen}
            setOpen={setIsOpen}
            event={props.event}
            // initialValues={
            //    props.event === 'edit' ? props.initialValues : undefined
            // }
         >
            {props.children}
         </AppointmentSheet>
      );

   return (
      <AppointmentDrawer
         open={isOpen}
         setOpen={setIsOpen}
         event={props.event}
         // initialValues={
         //    props.event === 'edit' ? props.initialValues : undefined
         // }
      >
         {props.children}
      </AppointmentDrawer>
   );
}
