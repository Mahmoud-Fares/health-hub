import { api } from '@/shared/lib';
import { ApiResponse } from '@/shared/types/api';

export interface Specialty {
   id: number;
   name: string;
}

const specialtyService = {
   getAllSpecialties: async (): Promise<ApiResponse<Specialty[]>> => {
      const response = await api.get('Specialties/show');
      return response.data;
   },
};

export default specialtyService;
