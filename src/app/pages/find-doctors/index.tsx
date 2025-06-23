import React from 'react';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

import DoctorCard from '@/features/doctor/components/doctor-card';

import { ActiveFilters } from '@/app/pages/find-doctors/components/active-filters';
import { DoctorsPagination } from '@/app/pages/find-doctors/components/doctors-pagination';
import { HeroSection } from '@/app/pages/find-doctors/components/hero-section';
import { SearchForm } from '@/app/pages/find-doctors/components/search-form';
import { useDoctorsData } from '@/app/pages/find-doctors/hooks/use-doctors-data';

const FindDoctorsPage: React.FC = () => {
   const {
      searchTerm,
      setSearchTerm,
      specialty,
      setSpecialty,
      specialties,
      isLoading,
      isError,
      doctors,
      pagination,
      handleSpecialtyChange,
      handlePageChange,
      refetch,
   } = useDoctorsData();

   return (
      <>
         <div
            className={cn(
               'bg-gradient-to-r from-blue-800/90 to-blue-800',
               'dark:from-blue-900 dark:to-gray-900 dark:text-blue-100'
            )}
         >
            <HeroSection />

            <SearchForm
               searchTerm={searchTerm}
               onSearchChange={setSearchTerm}
               specialty={specialty}
               onSpecialtyChange={handleSpecialtyChange}
               specialties={specialties}
            />

            <div className='bg-background'>
               <div className='container mx-auto px-4 pt-8'>
                  {/* Status and count */}
                  <div className='mb-6 flex items-center justify-between'>
                     <h2 className='text-xl font-semibold'>
                        {pagination
                           ? `${pagination.total} Doctors found`
                           : 'Doctors'}
                     </h2>

                     <ActiveFilters
                        searchTerm={searchTerm}
                        onClearSearch={() => setSearchTerm('')}
                        specialty={specialty}
                        onClearSpecialty={() => setSpecialty(null)}
                     />
                  </div>

                  {/* Loading state */}
                  {isLoading && (
                     <div className='flex items-center justify-center py-20'>
                        <Spinner className='size-16' />
                     </div>
                  )}

                  {/* Error state */}
                  {isError && (
                     <div className='rounded-md bg-destructive/10 p-4 text-center text-destructive'>
                        <p>Failed to load doctors. Please try again later.</p>
                        <Button
                           variant='outline'
                           onClick={() => refetch()}
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
                              setSpecialty(null);
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
                  {pagination && (
                     <DoctorsPagination
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        className='my-5'
                     />
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default FindDoctorsPage;
