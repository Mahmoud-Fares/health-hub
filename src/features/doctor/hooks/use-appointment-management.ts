import { useState } from 'react';

import { AxiosError } from 'axios';
import { format, isValid, parse } from 'date-fns';

import { AppointmentPayload, DoctorAppointment } from '@/shared/types';

import {
   useCreateAppointment,
   useDeleteAppointment,
   useDoctorAppointments,
   useUpdateAppointment,
} from '@/features/doctor/api/doctor-hooks';

export const useAppointmentManagement = () => {
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      undefined
   );
   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
   const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
   const [selectedAppointment, setSelectedAppointment] =
      useState<DoctorAppointment | null>(null);
   const [formData, setFormData] = useState<Partial<AppointmentPayload>>({
      date: '',
      start_time: '',
      end_time: '',
      session_duration: 30,
      is_available: true,
      max_patients: 4,
   });

   const {
      data: appointmentsResponse,
      isLoading,
      isError,
      error,
   } = useDoctorAppointments();
   const createAppointmentMutation = useCreateAppointment();
   const updateAppointmentMutation = useUpdateAppointment();
   const deleteAppointmentMutation = useDeleteAppointment();

   const appointments = appointmentsResponse?.data || [];

   const handleAddNewClick = () => {
      setFormData({
         date: selectedDate ? format(selectedDate, 'yyyy-M-d') : '',
         start_time: '09:00',
         end_time: '12:00',
         session_duration: 30,
         is_available: true,
         max_patients: 4,
      });
      setIsAddDialogOpen(true);
   };

   const handleEditAppointment = (appointment: DoctorAppointment) => {
      setSelectedAppointment(appointment);

      setFormData({
         date: appointment.date,
         start_time: appointment.start_time,
         end_time: appointment.end_time,
         session_duration: parseInt(appointment.session_duration.split(':')[1]),
         is_available: Boolean(appointment.is_available),
         max_patients: appointment.max_patients,
      });
      setIsUpdateDialogOpen(true);
   };

   // todo: make it use a shadcn dialog instead
   const handleDeleteAppointment = (id: number) => {
      if (window.confirm('Are you sure you want to delete this appointment?')) {
         deleteAppointmentMutation.mutate(id);
      }
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      if (type === 'number') {
         setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
      } else {
         setFormData((prev) => ({ ...prev, [name]: value }));
      }
   };

   const handleSwitchChange = (checked: boolean) => {
      setFormData((prev) => ({ ...prev, is_available: checked }));
   };

   const handleDateSelect = (date: Date | undefined) => {
      if (date && isValid(date)) {
         setSelectedDate(date);
         setFormData((prev) => ({ ...prev, date: format(date, 'yyyy-M-d') }));
      }
   };

   const handleSubmitCreate = (e: React.FormEvent) => {
      e.preventDefault();
      createAppointmentMutation.mutate(formData as AppointmentPayload);
      setIsAddDialogOpen(false);
   };

   const handleSubmitUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedAppointment) {
         updateAppointmentMutation.mutate({
            id: selectedAppointment.id,
            data: formData as AppointmentPayload,
         });
         setIsUpdateDialogOpen(false);
      }
   };

   const formatAppointmentDate = (dateString: string) => {
      try {
         const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
         if (isValid(parsedDate)) {
            return format(parsedDate, 'MMMM d, yyyy');
         }

         const parsedDate2 = parse(dateString, 'yyyy-M-d', new Date());
         if (isValid(parsedDate2)) {
            return format(parsedDate2, 'MMMM d, yyyy');
         }

         return dateString;
      } catch (error) {
         return dateString;
      }
   };

   return {
      selectedDate,
      isAddDialogOpen,
      isUpdateDialogOpen,
      selectedAppointment,
      formData,
      appointments,
      isLoading,
      isError: isError && (error as AxiosError).status !== 404,
      setIsAddDialogOpen,
      setIsUpdateDialogOpen,
      handleAddNewClick,
      handleEditAppointment,
      handleDeleteAppointment,
      handleInputChange,
      handleSwitchChange,
      handleDateSelect,
      handleSubmitCreate,
      handleSubmitUpdate,
      formatAppointmentDate,
      isCreating: createAppointmentMutation.isPending,
      isUpdating: updateAppointmentMutation.isPending,
   };
};
