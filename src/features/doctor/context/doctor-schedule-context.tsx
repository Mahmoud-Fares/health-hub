import { ReactNode, createContext, useContext } from 'react';

import { AppointmentPayload, DoctorAppointment } from '@/shared/types';

import { useDoctorScheduleManagement } from '@/features/doctor/hooks/use-doctor-schedule-management';

interface DoctorScheduleContextValue {
   form: ReturnType<typeof useDoctorScheduleManagement>['form'];
   isAddDialogOpen: boolean;
   isEditDialogOpen: boolean;
   openAddDialog: (date?: Date) => void;
   openEditDialog: (appointment: DoctorAppointment) => void;
   closeDialog: () => void;
   editingId: number | null;
   appointments: DoctorAppointment[];
   isLoading: boolean;
   isError: boolean;
   handleDeleteAppointment: (id: number) => void;
   formatAppointmentDate: (dateString: string) => string;
   isCreating: boolean;
   isUpdating: boolean;
   createAppointment: (values: AppointmentPayload) => void;
   updateAppointment: (id: number, values: AppointmentPayload) => void;
}

const DoctorScheduleContext = createContext<
   DoctorScheduleContextValue | undefined
>(undefined);

export const DoctorScheduleProvider = ({
   children,
}: {
   children: ReactNode;
}) => {
   const scheduleManagement = useDoctorScheduleManagement();
   return (
      <DoctorScheduleContext.Provider value={scheduleManagement}>
         {children}
      </DoctorScheduleContext.Provider>
   );
};

export const useDoctorSchedule = () => {
   const ctx = useContext(DoctorScheduleContext);
   if (!ctx)
      throw new Error(
         'useDoctorSchedule must be used within DoctorScheduleProvider'
      );
   return ctx;
};
