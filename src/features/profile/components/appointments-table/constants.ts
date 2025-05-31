import { Calendar, Clock, Users } from 'lucide-react';

import { DoctorAppointment } from '@/shared/types';

export const TABLE_HEADERS = [
   { key: 'date', label: 'Date', className: 'min-w-[120px]' },
   { key: 'day', label: 'Day', className: 'min-w-[100px]' },
   { key: 'startTime', label: 'Start Time', className: 'min-w-[110px]' },
   { key: 'endTime', label: 'End Time', className: 'min-w-[110px]' },
   { key: 'duration', label: 'Duration', className: 'min-w-[100px]' },
   { key: 'capacity', label: 'Capacity', className: 'min-w-[100px]' },
] as const;

export const DESKTOP_CELLS = [
   {
      key: 'date',
      icon: Calendar,
      getValue: (appointment: DoctorAppointment) => appointment.date,
      className: 'font-medium text-foreground',
   },
   {
      key: 'day',
      getValue: (appointment: DoctorAppointment) => appointment.day,
      className: 'font-medium text-muted-foreground',
   },
   {
      key: 'startTime',
      getValue: (appointment: DoctorAppointment) => appointment.start_time,
      className: 'font-mono text-sm',
   },
   {
      key: 'endTime',
      getValue: (appointment: DoctorAppointment) => appointment.end_time,
      className: 'font-mono text-sm',
   },
   {
      key: 'duration',
      icon: Clock,
      getValue: (appointment: DoctorAppointment) =>
         appointment.session_duration,
      className: '',
   },
   {
      key: 'capacity',
      icon: Users,
      getValue: (appointment: DoctorAppointment) => appointment.max_patients,
      className: '',
   },
];

export const MOBILE_INFO_CARDS = [
   {
      key: 'timeSlot',
      icon: Clock,
      title: 'Time Slot',
      getValue: (appointment: DoctorAppointment) =>
         `${appointment.start_time} - ${appointment.end_time}`,
   },
   {
      key: 'maxPatients',
      icon: Users,
      title: 'Max Patients',
      getValue: (appointment: DoctorAppointment) => appointment.max_patients,
   },
   {
      key: 'sessionDuration',
      icon: Clock,
      title: 'Session Duration',
      getValue: (appointment: DoctorAppointment) =>
         appointment.session_duration,
   },
] as const;
