import { Trash2 } from 'lucide-react';

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';

import { useDialogs } from '@/features/doctor/hooks/use-dialogs';
import { useSchedule } from '@/features/doctor/hooks/use-schedule';

export default function DeleteDialog() {
   const { deleteAppointment, isDeleting } = useSchedule();

   const {
      deletingId,
      isDeleteDialogOpen,
      setIsDeleteDialogOpen,
      closeDialog,
   } = useDialogs();

   return (
      <AlertDialog
         open={isDeleteDialogOpen}
         onOpenChange={setIsDeleteDialogOpen}
      >
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle className='flex items-center gap-2'>
                  <Trash2 className='h-5 w-5 text-red-600' />
                  Delete Appointment
               </AlertDialogTitle>
               <AlertDialogDescription className='text-left'>
                  Are you sure you want to delete this appointment?
                  <span className='mt-3 flex font-medium text-red-600'>
                     This action cannot be undone.
                  </span>
               </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction
                  onClick={async () => {
                     if (deletingId) deleteAppointment(deletingId);
                     closeDialog();
                  }}
                  disabled={isDeleting}
                  className='bg-red-600 hover:bg-red-700 focus:ring-red-600'
               >
                  {isDeleting ? (
                     <div className='flex items-center gap-2'>
                        <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                        Deleting...
                     </div>
                  ) : (
                     <>
                        <Trash2 className='mr-2 h-4 w-4' />
                        Delete Appointment
                     </>
                  )}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
