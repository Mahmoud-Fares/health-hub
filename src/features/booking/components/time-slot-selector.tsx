import { Clock } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { AvailableSlot } from '@/shared/types';

interface TimeSlotSelectorProps {
   slots: AvailableSlot[];
   onSlotSelect: (slot: string) => void;
   selectedSlot: string | null;
}

const TimeSlotSelector = ({
   slots,
   onSlotSelect,
   selectedSlot,
}: TimeSlotSelectorProps) => {
   return (
      <div className='space-y-4'>
         <div className='flex items-center space-x-2 text-primary'>
            <Clock className='h-5 w-5' />
            <h3 className='font-medium'>Available Time Slots</h3>
         </div>

         <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4'>
            {slots.map((slot) => (
               <Button
                  key={slot.time}
                  variant={selectedSlot === slot.time ? 'default' : 'outline'}
                  className={cn(
                     'justify-start',
                     !slot.available &&
                        'cursor-not-allowed bg-muted opacity-50 hover:bg-muted',
                     selectedSlot === slot.time && 'ring-2 ring-primary'
                  )}
                  disabled={!slot.available}
                  onClick={() => slot.available && onSlotSelect(slot.time)}
               >
                  <Clock className='mr-2 h-4 w-4' />
                  {slot.time}
               </Button>
            ))}
         </div>

         {slots.length === 0 && (
            <p className='text-center text-muted-foreground'>
               No time slots available
            </p>
         )}
      </div>
   );
};

export default TimeSlotSelector;
