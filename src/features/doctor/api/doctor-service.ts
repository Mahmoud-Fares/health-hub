import { api } from '@/shared/lib';
import { ApiResponse } from '@/shared/types/api';

export interface Doctor {
   id: number;
   slug: string;
   name: string;
   specialization: string[];
   experience_year: number | null;
   image: string | null;
   bio: string | null;
   clinicaddress: string | null;
   clinicgovernate: string | null;
   clinicname: string | null;
   fees: string | null;
}

export interface DoctorPagination {
   current_page: number;
   per_page: number;
   total: number;
   last_page: number;
}

export interface DoctorsResponse {
   data: Doctor[];
   pagination: DoctorPagination;
}

const doctorService = {
   getAllDoctors: async (page = 1): Promise<ApiResponse<DoctorsResponse>> => {
      const response = await api.get(`Doctor/allDoctors?page=${page}`);
      return response.data;
   },

   searchDoctorsByName: async (
      name: string,
      page = 1
   ): Promise<ApiResponse<DoctorsResponse>> => {
      const response = await api.get(
         `Doctor/searchByName?name=${name}&page=${page}`
      );
      return response.data;
   },

   filterDoctorsBySpecialty: async (
      specialtyId: string,
      page = 1
   ): Promise<ApiResponse<DoctorsResponse>> => {
      const response = await api.get(
         `Doctor/filterBySpecialty?specialty_id=${specialtyId}&page=${page}`
      );
      return response.data;
   },
};

export default doctorService;
