import { api } from '@/shared/lib';
import { AppointmentPayload, DoctorAppointment } from '@/shared/types';
import { ApiResponse } from '@/shared/types/api';

const scheduleService = {
   getDoctorAppointments: async (): Promise<
      ApiResponse<DoctorAppointment[]>
   > => {
      const response = await api.get('doctor/appointments/show');
      return response.data;
   },

   createAppointment: async (
      payload: AppointmentPayload
   ): Promise<ApiResponse<DoctorAppointment>> => {
      const response = await api.post('doctor/appointments/store', payload);
      return response.data;
   },

   updateAppointment: async (
      id: number,
      payload: AppointmentPayload
   ): Promise<ApiResponse<DoctorAppointment>> => {
      const response = await api.put(
         `doctor/appointments/update/${id}`,
         payload
      );
      return response.data;
   },

   deleteAppointment: async (id: number): Promise<ApiResponse<any>> => {
      const response = await api.delete(`doctor/appointments/destroy/${id}`);
      return response.data;
   },
};

export default scheduleService;
