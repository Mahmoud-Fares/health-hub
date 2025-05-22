import { Button } from '@/shared/components/ui/button';

import { AppointmentType } from '../hooks/use-appointments';

interface AppointmentPaginationProps {
   totalPages: number;
   currentPage: number;
   type: AppointmentType;
   onPageChange: (type: AppointmentType, page: number) => void;
}

export const AppointmentPagination = ({
   totalPages,
   currentPage,
   type,
   onPageChange,
}: AppointmentPaginationProps) => {
   if (totalPages <= 1) return null;

   return (
      <div className='mt-6 flex justify-center gap-2'>
         {Array.from({ length: totalPages }).map((_, index) => (
            <Button
               key={index}
               variant={currentPage === index + 1 ? 'default' : 'outline'}
               size='sm'
               onClick={() => onPageChange(type, index + 1)}
            >
               {index + 1}
            </Button>
         ))}
      </div>
   );
};
