import { MapPin, Monitor } from 'lucide-react';

import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';

export type SessionType = 'online' | 'in-place';

type Props = {
   sessionType: SessionType;
   handleSessionTypeChange: (sessionType: SessionType) => void;
};

export const SessionTypeSelector = ({
   sessionType,
   handleSessionTypeChange,
}: Props) => {
   return (
      <div>
         <h3 className='mb-3 text-lg font-medium'>Session Type</h3>
         <RadioGroup
            value={sessionType}
            onValueChange={handleSessionTypeChange}
            className='grid grid-cols-2 gap-4'
         >
            <label
               htmlFor='online'
               className='flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-muted'
            >
               <div className='flex items-center gap-2'>
                  <RadioGroupItem value='online' id='online' />
                  <Monitor className='h-5 w-5 text-muted-foreground' />
                  <span className='font-medium'>Online Session</span>
               </div>
            </label>

            <label
               htmlFor='in-place'
               className='flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-muted'
            >
               <div className='flex items-center gap-2'>
                  <RadioGroupItem value='in-place' id='in-place' />
                  <MapPin className='h-5 w-5 text-muted-foreground' />
                  <span className='font-medium'>In-Place Session</span>
               </div>
            </label>
         </RadioGroup>
      </div>
   );
};
