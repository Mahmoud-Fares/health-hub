import { Filter, Search } from 'lucide-react';

import { Input } from '@/shared/components/ui/input';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';

import { Specialty } from '@/features/specialty/api/specialty-service';

interface SearchFormProps {
   searchTerm: string;
   onSearchChange: (value: string) => void;
   specialty: Specialty | null;
   onSpecialtyChange: (value: string) => void;
   specialties: Specialty[];
   className?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
   searchTerm,
   onSearchChange,
   specialty,
   onSpecialtyChange,
   specialties,
   className,
}) => {
   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
   };

   return (
      <div
         className={cn(
            'sticky top-0 z-50 bg-gradient-to-r from-blue-800/90 to-blue-800 py-6 shadow-lg backdrop-blur-sm',
            'dark:from-blue-900 dark:to-gray-900 dark:text-blue-100',
            className
         )}
      >
         <div className='container mx-auto px-4'>
            <form
               onSubmit={handleSearch}
               className='mx-auto flex max-w-xl flex-col gap-3 md:flex-row'
            >
               <div className='relative flex-grow'>
                  <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-white/60' />
                  <Input
                     type='text'
                     placeholder='Search by doctor name...'
                     value={searchTerm}
                     onChange={(e) => onSearchChange(e.target.value)}
                     className='border-white/20 bg-white/10 pl-9 text-white placeholder:text-white/60 focus-visible:ring-white/30'
                  />
               </div>
               <div className='relative min-w-[180px]'>
                  <Filter className='absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-white/60' />
                  <Select
                     value={specialty?.id.toString() || 'All'}
                     onValueChange={onSpecialtyChange}
                  >
                     <SelectTrigger className='w-full border-white/20 bg-white/10 pl-9 text-white placeholder:text-white/60 focus-visible:ring-white/30'>
                        <SelectValue placeholder='All Specialties' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value='All'>All Specialties</SelectItem>
                        {specialties.map((spec) => (
                           <SelectItem key={spec.id} value={spec.id.toString()}>
                              {spec.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
            </form>
         </div>
      </div>
   );
};
