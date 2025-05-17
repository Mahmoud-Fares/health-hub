import React, { useEffect, useState } from 'react';

import { Filter, Search } from 'lucide-react';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/shared/components/ui/pagination';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';

import {
   useDoctors,
   useFilterDoctorsBySpecialty,
   useSearchDoctors,
} from '@/features/doctor/api/doctor-hooks';
import { DoctorsResponse } from '@/features/doctor/api/doctor-service';
import DoctorCard from '@/features/doctor/components/doctor-card';
import { useSpecialties } from '@/features/specialty/api/specialty-hooks';
import { Specialty } from '@/features/specialty/api/specialty-service';

import PageWithNoSidebar from '@/app/layouts/page-with-no-sidebar';

const FindDoctorsPage: React.FC = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
   const [specialty, setSpecialty] = useState('');
   const [currentPage, setCurrentPage] = useState(1);

   // Fetch specialties
   const specialtiesQuery = useSpecialties();
   const specialties: Specialty[] = specialtiesQuery.data?.data || [];

   // Handle debounced search
   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedSearchTerm(searchTerm);
      }, 500);

      return () => clearTimeout(timer);
   }, [searchTerm]);

   // Reset page when filters change
   useEffect(() => {
      setCurrentPage(1);
   }, [debouncedSearchTerm, specialty]);

   const allDoctorsQuery = useDoctors(currentPage);
   const searchDoctorsQuery = useSearchDoctors(
      debouncedSearchTerm,
      '',
      currentPage
   );

   const specialtyDoctorsQuery = useFilterDoctorsBySpecialty(
      specialty,
      currentPage
   );

   // Determine which query result to use
   const activeQuery = specialty
      ? specialtyDoctorsQuery
      : debouncedSearchTerm
        ? searchDoctorsQuery
        : allDoctorsQuery;

   const isLoading = activeQuery.isLoading || specialtiesQuery.isLoading;
   const isError = activeQuery.isError;
   const doctors: DoctorsResponse['data'] = activeQuery.data?.data.data || [];
   const pagination = activeQuery.data?.data.pagination;

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      // The search will be handled by the debounced effect
   };

   const handleSpecialtyChange = (value: string) => {
      if (value === 'All') {
         setSpecialty('');
         return;
      }

      setSpecialty(value);
   };

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
   };

   return (
      <PageWithNoSidebar>
         <div className='pb-12'>
            {/* Hero Section */}
            <div
               className={cn(
                  'pt-12 text-white',
                  'bg-gradient-to-r from-blue-800/90 to-blue-800',
                  'dark:from-blue-900 dark:to-gray-900 dark:text-blue-100'
               )}
            >
               <div className='container mx-auto px-4 text-center'>
                  <h1 className='mb-4 text-3xl font-bold md:text-4xl'>
                     Find the Right Doctor
                  </h1>
                  <p className='mx-auto max-w-2xl text-lg opacity-90 md:text-xl'>
                     Search our network of qualified healthcare professionals to
                     find the care you need.
                  </p>
               </div>
            </div>

            {/* Sticky Search Form */}
            <div
               className={cn(
                  'sticky top-0 z-50 bg-gradient-to-r from-blue-800/90 to-blue-800 py-6 shadow-lg',
                  'dark:from-blue-900 dark:to-gray-900 dark:text-blue-100'
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
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className='border-white/20 bg-white/10 pl-9 text-white placeholder:text-white/60 focus-visible:ring-white/30'
                        />
                     </div>
                     <div className='relative min-w-[180px]'>
                        <Filter className='absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-white/60' />
                        <Select
                           value={specialty}
                           onValueChange={handleSpecialtyChange}
                        >
                           <SelectTrigger className='h-10 w-full border-white/20 bg-white/10 pl-9 text-white placeholder:text-white/60 focus-visible:ring-white/30'>
                              <SelectValue placeholder='All Specialties' />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value='All'>
                                 All Specialties
                              </SelectItem>
                              {specialties.map((spec) => (
                                 <SelectItem
                                    key={spec.name}
                                    value={specialties
                                       .findIndex((s) => spec.name === s.name)
                                       .toString()} // todo: replace with spec.id
                                 >
                                    {spec.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </form>
               </div>
            </div>

            {/* Results Section */}
            <div className='container mx-auto mt-8 px-4'>
               {/* Status and count */}
               <div className='mb-6 flex items-center justify-between'>
                  <h2 className='text-xl font-semibold'>
                     {pagination
                        ? `${pagination.total} Doctors found`
                        : 'Doctors'}
                  </h2>

                  {/* Active filters indicator */}
                  <div className='flex items-center gap-2'>
                     {debouncedSearchTerm && (
                        <div className='flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary'>
                           <span>Search: {debouncedSearchTerm}</span>
                           <button
                              className='ml-2 text-primary/70 hover:text-primary'
                              onClick={() => setSearchTerm('')}
                           >
                              ×
                           </button>
                        </div>
                     )}

                     {specialty && (
                        <div className='flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary'>
                           {/* // todo:update the state to be of type Specialty & replace this with specialty.name  */}
                           <span>Specialty: {specialty}</span>
                           <button
                              className='ml-2 text-primary/70 hover:text-primary'
                              onClick={() => setSpecialty('')}
                           >
                              ×
                           </button>
                        </div>
                     )}
                  </div>
               </div>

               {/* Loading state */}
               {isLoading && (
                  <div className='flex justify-center py-20'>
                     <Spinner />
                  </div>
               )}

               {/* Error state */}
               {isError && (
                  <div className='rounded-md bg-destructive/10 p-4 text-center text-destructive'>
                     <p>Failed to load doctors. Please try again later.</p>
                     <Button
                        variant='outline'
                        onClick={() => activeQuery.refetch()}
                        className='mt-2'
                     >
                        Retry
                     </Button>
                  </div>
               )}

               {/* Empty state */}
               {!isLoading && !isError && doctors.length === 0 && (
                  <div className='py-20 text-center'>
                     <h3 className='mb-2 text-xl font-medium'>
                        No doctors found
                     </h3>
                     <p className='mb-4 text-muted-foreground'>
                        Try adjusting your search or filter criteria
                     </p>
                     <Button
                        onClick={() => {
                           setSearchTerm('');
                           setSpecialty('');
                        }}
                     >
                        Reset Filters
                     </Button>
                  </div>
               )}

               {/* Results grid */}
               {!isLoading && !isError && doctors.length > 0 && (
                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                     {doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                     ))}
                  </div>
               )}

               {/* Pagination */}
               {pagination && pagination.last_page > 1 && (
                  <Pagination className='mt-10'>
                     <PaginationContent>
                        <PaginationItem>
                           <PaginationPrevious
                              onClick={() =>
                                 currentPage > 1 &&
                                 handlePageChange(currentPage - 1)
                              }
                              className={
                                 currentPage <= 1
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                              }
                           />
                        </PaginationItem>

                        {Array.from(
                           { length: pagination.last_page },
                           (_, i) => i + 1
                        )
                           .filter((page) => {
                              // Show first page, last page, current page, and pages close to current page
                              return (
                                 page === 1 ||
                                 page === pagination.last_page ||
                                 Math.abs(page - currentPage) <= 1
                              );
                           })
                           .reduce(
                              (acc, page, i, filteredPages) => {
                                 // Add ellipsis between non-consecutive page numbers
                                 if (
                                    i > 0 &&
                                    filteredPages[i - 1] !== page - 1
                                 ) {
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
                                       isActive={page === currentPage}
                                       onClick={() =>
                                          handlePageChange(page as number)
                                       }
                                    >
                                       {page}
                                    </PaginationLink>
                                 </PaginationItem>
                              )
                           )}

                        <PaginationItem>
                           <PaginationNext
                              onClick={() =>
                                 currentPage < pagination.last_page &&
                                 handlePageChange(currentPage + 1)
                              }
                              className={
                                 currentPage >= pagination.last_page
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                              }
                           />
                        </PaginationItem>
                     </PaginationContent>
                  </Pagination>
               )}
            </div>
         </div>
      </PageWithNoSidebar>
   );
};

export default FindDoctorsPage;
