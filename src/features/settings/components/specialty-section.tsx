import { useState } from 'react';

import { toast } from 'sonner';

import { useSpecialties } from '@/shared/api/specialty-hooks';
import { Button } from '@/shared/components/ui/button';
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

import { isDoctor, useAuth } from '@/features/auth';
import { useUpdateProfile } from '@/features/settings/api/hooks';

export function SpecialtySection() {
   const { currentUser } = useAuth();
   const { data, isLoading } = useSpecialties();
   const { mutate: updateProfile, isPending } = useUpdateProfile();
   const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');

   const userSpecialties = isDoctor(currentUser!)
      ? currentUser!.specialization
      : [];
   const specialties = data?.data || [];

   const handleAddSpecialty = () => {
      if (userSpecialties.includes(selectedSpecialty)) {
         toast.error('This specialty already exists');
         return;
      }
      updateProfile({ specialty: selectedSpecialty });
   };

   return (
      <div className='space-y-3'>
         <FormLabel>Specializations</FormLabel>
         <div className='mb-4 flex flex-wrap gap-2'>
            {userSpecialties.length === 0 && (
               <div className='mx-auto flex items-center justify-center rounded-full bg-secondary px-3 py-1 text-secondary-foreground'>
                  <p>No specialties added</p>
               </div>
            )}

            {userSpecialties.map((specialty: string, index: number) => (
               <div
                  key={index}
                  className='flex items-center rounded-full bg-secondary px-3 py-1 text-secondary-foreground'
               >
                  <span className='mr-2'>{specialty}</span>
               </div>
            ))}
         </div>
         <div className='flex items-end justify-between gap-2'>
            <FormField
               name='specialty'
               render={() => (
                  <FormItem className='min-w-64 flex-1'>
                     <FormLabel>Select a specialty</FormLabel>
                     <FormControl>
                        <Select
                           value={selectedSpecialty}
                           onValueChange={setSelectedSpecialty}
                           disabled={isLoading || isPending}
                        >
                           <SelectTrigger>
                              <SelectValue
                                 placeholder={
                                    isLoading
                                       ? 'Loading...'
                                       : 'Choose a specialty'
                                 }
                              />
                           </SelectTrigger>
                           <SelectContent>
                              {specialties.map(
                                 (spec: { id: number; name: string }) => (
                                    <SelectItem key={spec.id} value={spec.name}>
                                       {spec.name}
                                    </SelectItem>
                                 )
                              )}
                           </SelectContent>
                        </Select>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button
               type='button'
               onClick={handleAddSpecialty}
               disabled={isPending || !selectedSpecialty}
            >
               {isPending ? 'Adding...' : 'Add'}
            </Button>
         </div>
      </div>
   );
}
