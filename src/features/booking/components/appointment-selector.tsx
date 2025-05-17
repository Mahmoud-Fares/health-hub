import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';
import { DoctorAppointment } from '@/shared/types';

interface AppointmentSelectorProps {
   appointments: Omit<DoctorAppointment, 'doctor_name'>[];
   onAppointmentSelect: (appointment: DoctorAppointment) => void;
   selectedAppointmentId: number | null;
}

const AppointmentSelector = ({
   appointments,
   onAppointmentSelect,
   selectedAppointmentId,
}: AppointmentSelectorProps) => {
   return (
      <div className='space-y-4'>
         <div className='flex items-center space-x-2 text-primary'>
            <Calendar className='h-5 w-5' />
            <h3 className='font-medium'>Available Appointment Days</h3>
         </div>

         <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {appointments.map((appointment) => {
               // Format appointment date for display
               let formattedDate;
               try {
                  formattedDate = format(
                     new Date(appointment.date),
                     'EEE, MMM d, yyyy'
                  );
               } catch (e) {
                  formattedDate = appointment.date;
               }

               return (
                  <Card
                     key={appointment.id}
                     className={cn(
                        'cursor-pointer transition-all hover:border-primary',
                        selectedAppointmentId === appointment.id &&
                           'border-2 border-primary'
                     )}
                     onClick={() =>
                        onAppointmentSelect({
                           ...appointment,
                           doctor_name: 'name',
                        })
                     }
                  >
                     <CardContent className='p-4'>
                        <div className='flex flex-col space-y-2'>
                           <div className='flex items-center justify-between'>
                              <div className='flex items-center space-x-2'>
                                 <Calendar className='h-4 w-4 text-primary' />
                                 <span className='font-medium'>
                                    {formattedDate}
                                 </span>
                              </div>
                              {selectedAppointmentId === appointment.id && (
                                 <Badge className='bg-primary'>Selected</Badge>
                              )}
                           </div>

                           <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                              <Clock className='h-4 w-4' />
                              <span>
                                 {appointment.start_time} -{' '}
                                 {appointment.end_time}
                              </span>
                           </div>

                           <div className='text-xs text-muted-foreground'>
                              Session: {appointment.session_duration} mins
                           </div>

                           <div className='text-xs text-muted-foreground'>
                              Available slots: {appointment.max_patients}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               );
            })}
         </div>

         {appointments.length === 0 && (
            <p className='text-center text-muted-foreground'>
               No appointments available
            </p>
         )}
      </div>
   );
};

export default AppointmentSelector;
