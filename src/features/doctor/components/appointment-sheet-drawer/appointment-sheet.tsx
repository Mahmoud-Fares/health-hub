import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from '@/shared/components/ui/sheet';

import { AppointmentForm } from '@/features/doctor/components/appointment-form';

type Props = {
   open: boolean;
   setOpen: (open: boolean) => void;
   event: 'add' | 'edit';
};

export default function AppointmentSheet({ open, setOpen, event }: Props) {
   const verb = event === 'edit' ? 'Editing' : 'Adding';

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetContent>
            <SheetHeader className='sr-only'>
               <SheetTitle>{verb} a Time Slot</SheetTitle>
               <SheetDescription>
                  This a form for {verb} a Time Slot
               </SheetDescription>
            </SheetHeader>

            <AppointmentForm type={event} />
         </SheetContent>
      </Sheet>
   );
}
