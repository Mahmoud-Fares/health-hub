import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/shared/components/ui/pagination';

interface PaginationData {
   last_page: number;
   current_page: number;
}

interface DoctorsPaginationProps {
   pagination: PaginationData;
   onPageChange: (page: number) => void;
   className?: string;
}

export const DoctorsPagination: React.FC<DoctorsPaginationProps> = ({
   pagination,
   onPageChange,
   className,
}) => {
   if (pagination.last_page <= 1) return null;

   const renderPageNumbers = () => {
      return Array.from({ length: pagination.last_page }, (_, i) => i + 1)
         .filter((page) => {
            return (
               page === 1 ||
               page === pagination.last_page ||
               Math.abs(page - pagination.current_page) <= 1
            );
         })
         .reduce(
            (acc, page, i, filteredPages) => {
               if (i > 0 && filteredPages[i - 1] !== page - 1) {
                  acc.push('ellipsis');
               }
               acc.push(page);
               return acc;
            },
            [] as (number | string)[]
         )
         .map((page, i) =>
            page === 'ellipsis' ? (
               <PaginationItem key={`ellipsis-${i}`}>
                  <span className='px-4 py-2'>...</span>
               </PaginationItem>
            ) : (
               <PaginationItem key={page}>
                  <PaginationLink
                     isActive={page === pagination.current_page}
                     onClick={() => onPageChange(page as number)}
                  >
                     {page}
                  </PaginationLink>
               </PaginationItem>
            )
         );
   };

   return (
      <Pagination className={className}>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  onClick={() =>
                     pagination.current_page > 1 &&
                     onPageChange(pagination.current_page - 1)
                  }
                  className={
                     pagination.current_page <= 1
                        ? 'pointer-events-none opacity-50'
                        : ''
                  }
               />
            </PaginationItem>

            {renderPageNumbers()}

            <PaginationItem>
               <PaginationNext
                  onClick={() =>
                     pagination.current_page < pagination.last_page &&
                     onPageChange(pagination.current_page + 1)
                  }
                  className={
                     pagination.current_page >= pagination.last_page
                        ? 'pointer-events-none opacity-50'
                        : ''
                  }
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
};
