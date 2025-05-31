import { Doctor, DoctorAppointment } from '@/shared/types';

export type AppointmentsTableProps = {
   appointments: DoctorAppointment[];
   doctor: Doctor;
};

export type AppointmentRowProps = {
   appointment: DoctorAppointment;
   doctor: Doctor;
};

export type DesktopCell = {
   key: string;
   getValue: (appointment: DoctorAppointment) => string | number;
   className: string;
   icon?: React.ElementType;
};

export type MobileInfoCardProps = {
   icon: React.ElementType;
   title: string;
   value: string | number;
};

export type DesktopTableCellProps = {
   cell: DesktopCell;
   appointment: DoctorAppointment;
};

export type ViewBookingsButtonProps = {
   url: string;
};
