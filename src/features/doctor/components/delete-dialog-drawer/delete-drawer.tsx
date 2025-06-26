import { Trash2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
} from '@/shared/components/ui/drawer';

import { useDialogs } from '@/features/doctor/hooks/use-dialogs';
import { useSchedule } from '@/features/doctor/hooks/use-schedule';

export default function DeleteDrawer() {
   const { deleteAppointment, isDeleting } = useSchedule();

   const {
      deletingId,
      isDeleteDialogOpen,
      setIsDeleteDialogOpen,
      closeDialog,
   } = useDialogs();

   return (
      <Drawer open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
         <DrawerContent>
            <DrawerHeader className='text-left'>
               <DrawerTitle className='flex items-center gap-2'>
                  <Trash2 className='h-5 w-5 text-red-600' />
                  Delete Appointment
               </DrawerTitle>
               <DrawerDescription className='text-left'>
                  Are you sure you want to delete this appointment?
                  <span className='mt-3 flex font-medium text-red-600'>
                     This action cannot be undone.
                  </span>
               </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className='pt-2'>
               <Button
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
               </Button>
               <DrawerClose asChild>
                  <Button variant='outline'>Cancel</Button>
               </DrawerClose>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
}
