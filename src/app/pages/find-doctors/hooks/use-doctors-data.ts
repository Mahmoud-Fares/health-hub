import { useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';

import {
   useDoctors,
   useFilterDoctorsBySpecialty,
   useSearchDoctors,
} from '@/features/doctor/api/doctor-hooks';
import { useSpecialties } from '@/features/specialty/api/specialty-hooks';
import { Specialty } from '@/features/specialty/api/specialty-service';

export const useDoctorsData = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
   const [specialty, setSpecialty] = useState<Specialty | null>(null);
   const [currentPage, setCurrentPage] = useState(1);

   // Fetch specialties
   const specialtiesQuery = useSpecialties();
   const specialties: Specialty[] = specialtiesQuery.data?.data || [];

   // Reset page when filters change
   useEffect(() => {
      setCurrentPage(1);
   }, [debouncedSearchTerm, specialty]);

   const allDoctorsQuery = useDoctors(currentPage);
   const searchDoctorsQuery = useSearchDoctors(
      debouncedSearchTerm,
      currentPage
   );
   const specialtyDoctorsQuery = useFilterDoctorsBySpecialty(
      specialty?.id.toString() || '',
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
   const doctors = activeQuery.data?.data.data || [];
   const pagination = activeQuery.data?.data.pagination;

   const handleSpecialtyChange = (value: string) => {
      if (value === 'All') {
         setSpecialty(null);
         return;
      }
      setSpecialty(specialties.find((s) => s.id.toString() === value) || null);
   };

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
   };

   return {
      searchTerm,
      setSearchTerm,
      specialty,
      setSpecialty,
      currentPage,
      specialties,
      isLoading,
      isError,
      doctors,
      pagination,
      handleSpecialtyChange,
      handlePageChange,
      refetch: activeQuery.refetch,
   };
};
