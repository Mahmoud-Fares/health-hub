import { Specialty } from '@/features/specialty/api/specialty-service';

interface ActiveFiltersProps {
   searchTerm: string;
   onClearSearch: () => void;
   specialty: Specialty | null;
   onClearSpecialty: () => void;
   className?: string;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
   searchTerm,
   onClearSearch,
   specialty,
   onClearSpecialty,
   className,
}) => {
   if (!searchTerm && !specialty) return null;

   return (
      <div className={`flex items-center gap-2 ${className}`}>
         {searchTerm && (
            <div className='flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary'>
               <span>Search: {searchTerm}</span>
               <button
                  className='ml-2 text-primary/70 hover:text-primary'
                  onClick={onClearSearch}
               >
                  ×
               </button>
            </div>
         )}

         {specialty && (
            <div className='flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary'>
               <span>Specialty: {specialty.name}</span>
               <button
                  className='ml-2 text-primary/70 hover:text-primary'
                  onClick={onClearSpecialty}
               >
                  ×
               </button>
            </div>
         )}
      </div>
   );
};
