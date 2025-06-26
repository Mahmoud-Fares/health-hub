import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/shared/components/ui/sheet';

import { AppointmentForm } from '@/features/doctor/components/appointment-form';

type Props = {
   open: boolean;
   setOpen: (open: boolean) => void;
   children: React.ReactNode;
   event: 'add' | 'edit';
};

export default function AppointmentSheet({
   open,
   setOpen,
   children,
   event,
}: Props) {
   const verb = event === 'edit' ? 'Editing' : 'Adding';

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>{children}</SheetTrigger>

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
