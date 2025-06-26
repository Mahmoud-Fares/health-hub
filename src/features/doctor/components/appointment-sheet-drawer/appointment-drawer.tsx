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

import { AppointmentForm } from '@/features/doctor/components/appointment-form';

type Props = {
   open: boolean;
   setOpen: (open: boolean) => void;
   event: 'add' | 'edit';
};

export default function AppointmentDrawer({ open, setOpen, event }: Props) {
   const verb = event === 'edit' ? 'Editing' : 'Adding';

   return (
      <Drawer open={open} onOpenChange={setOpen}>
         <DrawerContent>
            <DrawerHeader className='sr-only'>
               <DrawerTitle>{verb} a Time Slot</DrawerTitle>
               <DrawerDescription>
                  This a form for {verb} a Time Slot
               </DrawerDescription>
            </DrawerHeader>

            <div className='px-4 pt-6'>
               <AppointmentForm type={event} />
            </div>

            <DrawerFooter className='pb-6'>
               <DrawerClose asChild>
                  <Button variant='outline'>Cancel</Button>
               </DrawerClose>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
}
