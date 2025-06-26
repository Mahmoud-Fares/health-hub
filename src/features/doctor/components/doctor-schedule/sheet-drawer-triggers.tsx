import AppointmentSheetDrawer from '@/features/doctor/components/appointment-sheet-drawer';
import { DeleteDialogDrawer } from '@/features/doctor/components/delete-dialog-drawer';

export default function SheetDrawerTriggers() {
   return (
      <>
         <DeleteDialogDrawer />
         <AppointmentSheetDrawer event='add' />
         <AppointmentSheetDrawer event='edit' />

         {/* if we need to use only the dialogs, we comment the above two lines and uncomment the below line */}
         {/* <DoctorScheduleDialogs /> */}
      </>
   );
}
