import { Control } from 'react-hook-form';

import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';

import { RegisterPayload } from '@/features/auth/types';

type RoleSelectionProps = {
   control: Control<RegisterPayload>;
};

export const RoleSelection = ({ control }: RoleSelectionProps) => {
   return (
      <FormField
         control={control}
         name='role'
         render={({ field }) => (
            <FormItem>
               <FormLabel>I am a</FormLabel>
               <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
               >
                  <FormControl>
                     <SelectTrigger>
                        <SelectValue placeholder='Select your role' />
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                     <SelectItem value='client'>Patient</SelectItem>
                     <SelectItem value='doctor'>Doctor</SelectItem>
                  </SelectContent>
               </Select>
               <FormMessage />
            </FormItem>
         )}
      />
   );
};
