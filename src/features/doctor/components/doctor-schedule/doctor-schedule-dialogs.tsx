import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '@/shared/components/ui/dialog';

import { AppointmentForm } from '@/features/doctor/components/appointment-form';
import { useDialogs } from '@/features/doctor/hooks/use-dialogs';

const DoctorScheduleDialogs: React.FC = () => {
   const { isAddDialogOpen, isEditDialogOpen, closeDialog } = useDialogs();

   return (
      <>
         {/* Add Appointment Dialog */}
         <Dialog open={isAddDialogOpen} onOpenChange={closeDialog}>
            <DialogContent className='max-w-[97%] sm:max-w-[425px]'>
               <DialogHeader>
                  <DialogTitle>Add New Appointment</DialogTitle>
                  <DialogDescription>
                     Create a new appointment slot for patients.
                  </DialogDescription>
               </DialogHeader>

               <AppointmentForm type='add' />
            </DialogContent>
         </Dialog>

         {/* Update Appointment Dialog */}
         <Dialog open={isEditDialogOpen} onOpenChange={closeDialog}>
            <DialogContent className='max-w-[97%] sm:max-w-[425px]'>
               <DialogHeader>
                  <DialogTitle>Update Appointment</DialogTitle>
                  <DialogDescription>
                     Modify your existing appointment details.
                  </DialogDescription>
               </DialogHeader>

               <AppointmentForm type='edit' />
            </DialogContent>
         </Dialog>
      </>
   );
};

export default DoctorScheduleDialogs;
