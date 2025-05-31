import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { TableCell, TableRow } from '@/shared/components/ui/table';

import { ViewToCurrentUser } from '@/features/auth';

import { DESKTOP_CELLS, MOBILE_INFO_CARDS } from './constants';
import { DesktopTableCell } from './desktop-table-cell';
import { MobileInfoCard } from './mobile-info-card';
import { AppointmentRowProps } from './types';
import { ViewBookingsButton } from './view-bookings-button';

export const AppointmentRow = ({
   appointment,
   doctor,
}: AppointmentRowProps) => {
   const bookingsUrl = `/appointment-bookings/${appointment.id}/${encodeURIComponent(appointment.date)}`;

   return (
      <>
         {/* Desktop Table Row */}
         <TableRow className='group hidden transition-colors hover:bg-muted/50 lg:table-row'>
            {DESKTOP_CELLS.map((cell) => (
               <DesktopTableCell
                  key={cell.key}
                  cell={cell}
                  appointment={appointment}
               />
            ))}
            <ViewToCurrentUser profile={doctor}>
               <TableCell>
                  <ViewBookingsButton url={bookingsUrl} />
               </TableCell>
            </ViewToCurrentUser>
         </TableRow>

         {/* Mobile Card View */}
         <TableRow className='lg:hidden'>
            <TableCell colSpan={DESKTOP_CELLS.length} className='p-0'>
               <div className='border-l-4 border-l-primary/20 p-6 transition-colors hover:border-l-primary/60 hover:bg-muted/30'>
                  <div className='mb-4 flex flex-wrap items-start justify-between gap-2'>
                     <div className='space-y-1'>
                        <div className='font-medium text-muted-foreground'>
                           {appointment.day}
                        </div>
                        <div className='flex items-center gap-2 text-lg font-semibold text-foreground'>
                           <Calendar className='h-5 w-5 text-primary' />
                           {appointment.date}
                        </div>
                     </div>

                     <ViewToCurrentUser profile={doctor}>
                        <Button
                           asChild
                           size='sm'
                           className='shadow-sm transition-shadow hover:shadow-md'
                        >
                           <Link
                              to={bookingsUrl}
                              className='flex items-center gap-2'
                           >
                              View
                              <ArrowRight className='h-3 w-3' />
                           </Link>
                        </Button>
                     </ViewToCurrentUser>
                  </div>

                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                     {MOBILE_INFO_CARDS.map((card) => (
                        <MobileInfoCard
                           key={card.key}
                           icon={card.icon}
                           title={card.title}
                           value={card.getValue(appointment)}
                        />
                     ))}
                  </div>
               </div>
            </TableCell>
         </TableRow>
      </>
   );
};
