import { AppointmentPayload, DoctorAppointment } from '@/shared/types';

import {
   useCreateAppointment,
   useDeleteAppointment,
   useDoctorAppointments as useDoctorAppointmentsQuery,
   useUpdateAppointment,
} from '@/features/doctor/api/doctor-hooks';

export const useScheduleManagement = () => {
   const {
      data: appointmentsResponse,
      isLoading,
      isError,
      error,
   } = useDoctorAppointmentsQuery();

   const appointments: DoctorAppointment[] = appointmentsResponse?.data || [];

   const createAppointmentMutation = useCreateAppointment();
   const updateAppointmentMutation = useUpdateAppointment();
   const deleteAppointmentMutation = useDeleteAppointment();

   const createAppointment = (values: AppointmentPayload) => {
      createAppointmentMutation.mutate(values);
   };

   const updateAppointment = (id: number, values: AppointmentPayload) => {
      updateAppointmentMutation.mutate({ id, data: values });
   };

   const deleteAppointment = (id: number) => {
      deleteAppointmentMutation.mutate(id);
   };

   return {
      appointments,
      isLoading,
      isError: isError && (error as any)?.status !== 404,

      createAppointment,
      updateAppointment,
      deleteAppointment,
      isCreating: createAppointmentMutation.isPending,
      isUpdating: updateAppointmentMutation.isPending,
      isDeleting: deleteAppointmentMutation.isPending,
   };
};
