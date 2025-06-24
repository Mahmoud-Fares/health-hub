import { useState } from 'react';

import { X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { FormLabel } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

interface SpecialtySectionProps {
   specialties: string[];
   onSpecialtiesChange: (specialties: string[]) => void;
}

export function SpecialtySection({
   specialties,
   onSpecialtiesChange,
}: SpecialtySectionProps) {
   const [newSpecialty, setNewSpecialty] = useState('');

   const handleAddSpecialty = () => {
      if (!newSpecialty.trim()) return;

      if (specialties.includes(newSpecialty.trim())) {
         toast.error('This specialty already exists');
         return;
      }

      onSpecialtiesChange([...specialties, newSpecialty.trim()]);
      setNewSpecialty('');
   };

   const handleRemoveSpecialty = (specialty: string) => {
      toast('Not fully implemented', {
         description:
            'Specialty removal will be implemented in the next version',
      });
      onSpecialtiesChange(specialties.filter((s) => s !== specialty));
   };

   return (
      <div className='space-y-3'>
         <FormLabel>Specializations</FormLabel>
         <div className='mb-4 flex flex-wrap gap-2'>
            {specialties.map((specialty, index) => (
               <div
                  key={index}
                  className='flex items-center rounded-full bg-secondary px-3 py-1 text-secondary-foreground'
               >
                  <span className='mr-2'>{specialty}</span>
                  <Button
                     type='button'
                     variant='ghost'
                     size='icon'
                     className='h-5 w-5'
                     onClick={() => handleRemoveSpecialty(specialty)}
                  >
                     <X className='h-3 w-3' />
                  </Button>
               </div>
            ))}
         </div>

         <div className='flex gap-2'>
            <Input
               placeholder='Add a specialization'
               value={newSpecialty}
               onChange={(e) => setNewSpecialty(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                     e.preventDefault();
                     handleAddSpecialty();
                  }
               }}
            />
            <Button type='button' onClick={handleAddSpecialty}>
               Add
            </Button>
         </div>
      </div>
   );
}
