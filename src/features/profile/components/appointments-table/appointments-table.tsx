import {
   Table,
   TableBody,
   TableHead,
   TableHeader,
   TableRow,
} from '@/shared/components/ui/table';

import { ViewToCurrentUser } from '@/features/auth';

import { AppointmentRow } from './appointment-row';
import { TABLE_HEADERS } from './constants';
import { EmptyState } from './empty-state';
import { AppointmentsTableProps } from './types';

export const AppointmentsTable = ({
   appointments,
   doctor,
}: AppointmentsTableProps) => {
   if (!appointments?.length) {
      return <EmptyState />;
   }

   return (
      <div className='w-full space-y-4'>
         {/* Desktop Table */}
         <div className='hidden overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm lg:block'>
            <Table>
               <TableHeader>
                  <TableRow className='border-b border-border/50 bg-muted/30 hover:bg-muted/50'>
                     {TABLE_HEADERS.map((header) => (
                        <TableHead
                           key={header.key}
                           className={`h-14 font-semibold text-foreground ${header.className}`}
                        >
                           {header.label}
                        </TableHead>
                     ))}
                     <ViewToCurrentUser profile={doctor}>
                        <TableHead className='h-14 min-w-[120px] font-semibold text-foreground'>
                           Actions
                        </TableHead>
                     </ViewToCurrentUser>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {appointments.map((appointment, index) => (
                     <AppointmentRow
                        key={`${appointment.id}-${index}`}
                        appointment={appointment}
                        doctor={doctor}
                     />
                  ))}
               </TableBody>
            </Table>
         </div>

         {/* Mobile Card List */}
         <div className='space-y-3 lg:hidden'>
            <div className='divide-y divide-border/30 overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm'>
               <Table>
                  <TableBody>
                     {appointments.map((appointment, index) => (
                        <AppointmentRow
                           key={`${appointment.id}-mobile-${index}`}
                           appointment={appointment}
                           doctor={doctor}
                        />
                     ))}
                  </TableBody>
               </Table>
            </div>
         </div>
      </div>
   );
};
