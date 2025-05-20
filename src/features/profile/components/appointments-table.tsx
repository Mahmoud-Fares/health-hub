import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/shared/components/ui/table';

interface Appointment {
   id: number;
   date: string;
   day: string;
   start_time: string;
   end_time: string;
   session_duration: string;
   max_patients: number;
}

interface AppointmentsTableProps {
   appointments: Appointment[];
   doctorSlug: string;
}

const AppointmentsTable = ({ appointments }: AppointmentsTableProps) => {
   if (!appointments?.length) {
      return (
         <p className='text-sm text-muted-foreground'>
            No appointments available
         </p>
      );
   }

   return (
      <div className='overflow-x-auto'>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Session Duration</TableHead>
                  <TableHead>Max Patients</TableHead>
                  <TableHead>Actions</TableHead>
               </TableRow>
            </TableHeader>

            <TableBody>
               {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                     <TableCell>{appointment.date}</TableCell>
                     <TableCell>{appointment.day}</TableCell>
                     <TableCell>{appointment.start_time}</TableCell>
                     <TableCell>{appointment.end_time}</TableCell>
                     <TableCell>{appointment.session_duration}</TableCell>
                     <TableCell>{appointment.max_patients}</TableCell>
                     <TableCell>
                        <Link
                           to={`/appointment-bookings/${appointment.id}/${encodeURIComponent(
                              appointment.date
                           )}`}
                        >
                           <Button variant='outline' size='sm'>
                              View Bookings
                           </Button>
                        </Link>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
};

export default AppointmentsTable;
