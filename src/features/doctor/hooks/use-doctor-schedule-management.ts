import { useState } from 'react';

import { format, isValid, parse } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AppointmentPayload, DoctorAppointment } from '@/shared/types';

import {
   useCreateAppointment,
   useDeleteAppointment,
   useDoctorAppointments,
   useUpdateAppointment,
} from '@/features/doctor/api/doctor-hooks';

const appointmentSchema = z.object({
   date: z.string().min(1, 'Date is required'),
   start_time: z.string().min(1, 'Start time is required'),
   end_time: z.string().min(1, 'End time is required'),
   session_duration: z.coerce.number().min(15).max(120),
   is_available: z.boolean(),
   max_patients: z.coerce.number().min(1),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export const useDoctorScheduleManagement = () => {
   const form = useForm<AppointmentPayload>({
      defaultValues: {
         date: '',
         start_time: '09:00',
         end_time: '12:00',
         session_duration: 30,
         is_available: true,
         max_patients: 4,
      },
   });

   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
   const [editingId, setEditingId] = useState<number | null>(null);

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

   const openAddDialog = (date?: Date) => {
      form.reset({
         date: date ? format(date, 'yyyy-MM-dd') : '',
         start_time: '09:00',
         end_time: '12:00',
         session_duration: 30,
         is_available: true,
         max_patients: 4,
      });
      setIsAddDialogOpen(true);
      setEditingId(null);
   };

   const openEditDialog = (appointment: DoctorAppointment) => {
      form.reset({
         ...appointment,
         date: appointment.date,
         session_duration:
            typeof appointment.session_duration === 'string'
               ? (() => {
                    const [h, m] = appointment.session_duration
                       .split(':')
                       .map(Number);
                    return h * 60 + m;
                 })()
               : appointment.session_duration,
         is_available: Boolean(appointment.is_available),
      });
      setIsEditDialogOpen(true);
      setEditingId(appointment.id);
   };

   const closeDialog = () => {
      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      setEditingId(null);
   };

   const handleDeleteAppointment = (id: number) => {
      if (window.confirm('Are you sure you want to delete this appointment?')) {
         deleteAppointmentMutation.mutate(id);
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

   const createAppointment = (values: AppointmentPayload) => {
      createAppointmentMutation.mutate(values);
   };

   const updateAppointment = (id: number, values: AppointmentPayload) => {
      updateAppointmentMutation.mutate({ id, data: values });
   };

   return {
      form,

      isAddDialogOpen,
      isEditDialogOpen,
      openAddDialog,
      openEditDialog,
      closeDialog,

      appointments,
      isLoading,
      isError: isError && (error as any)?.status !== 404,

      formatAppointmentDate, // move it to a utils file

      handleDeleteAppointment,
      createAppointment,
      updateAppointment,
      isCreating: createAppointmentMutation.isPending,
      isUpdating: updateAppointmentMutation.isPending,

      editingId,
   };
};
