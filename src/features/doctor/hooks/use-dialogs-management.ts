import { useState } from 'react';

import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AppointmentPayload, DoctorAppointment } from '@/shared/types';

const appointmentSchema = z.object({
   date: z.string().min(1, 'Date is required'),
   start_time: z.string().min(1, 'Start time is required'),
   end_time: z.string().min(1, 'End time is required'),
   session_duration: z.coerce.number().min(15).max(120),
   is_available: z.boolean(),
   max_patients: z.coerce.number().min(1),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export const useDialogsManagement = () => {
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
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

   const [editingId, setEditingId] = useState<number | null>(null);
   const [deletingId, setDeletingId] = useState<number | null>(null);

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

   const openDeleteDialog = (appointment: DoctorAppointment) => {
      setDeletingId(appointment.id);
      setIsDeleteDialogOpen(true);
   };

   const closeDialog = () => {
      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      setIsDeleteDialogOpen(false);

      setEditingId(null);
      setDeletingId(null);
   };

   return {
      form,

      isAddDialogOpen,
      isEditDialogOpen,
      isDeleteDialogOpen,

      setIsAddDialogOpen,
      setIsEditDialogOpen,
      setIsDeleteDialogOpen,

      editingId,
      setEditingId,

      deletingId,
      setDeletingId,

      openAddDialog,
      openEditDialog,
      openDeleteDialog,
      closeDialog,
   };
};
