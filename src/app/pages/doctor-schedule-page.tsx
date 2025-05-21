import React, { useState } from 'react';

import { format, isValid, parse } from 'date-fns';
import { Calendar, Edit, Plus, Trash2 } from 'lucide-react';

import Spinner from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import { Calendar as CalendarComponent } from '@/shared/components/ui/calendar';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/shared/components/ui/dialog';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/shared/components/ui/popover';
import { Switch } from '@/shared/components/ui/switch';
import { cn } from '@/shared/lib/utils';
import { AppointmentPayload, DoctorAppointment } from '@/shared/types';

import { useAuth } from '@/features/auth';
import {
   useCreateAppointment,
   useDeleteAppointment,
   useDoctorAppointments,
   useUpdateAppointment,
} from '@/features/doctor/api/doctor-hooks';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

const DoctorSchedulePage: React.FC = () => {
   const { currentUser } = useAuth();
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
         session_duration: parseInt(
            appointment.session_duration.split(':')[1],
            10
         ),
         is_available: Boolean(appointment.is_available),
         max_patients: appointment.max_patients,
      });
      setIsUpdateDialogOpen(true);
   };

   // todo: use shadcn's dialog component with delete or cancel button instead of this
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

   // Helper function to format date for display
   const formatAppointmentDate = (dateString: string) => {
      try {
         const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
         if (isValid(parsedDate)) {
            return format(parsedDate, 'MMMM d, yyyy');
         }

         // Try another format if the first one fails
         const parsedDate2 = parse(dateString, 'yyyy-M-d', new Date());
         if (isValid(parsedDate2)) {
            return format(parsedDate2, 'MMMM d, yyyy');
         }

         return dateString;
      } catch (error) {
         return dateString;
      }
   };

   if (currentUser?.role !== 'doctor') {
      return (
         <div className='container mx-auto px-4 py-16 text-center'>
            <h1 className='mb-4 text-2xl font-bold'>Access Denied</h1>
            <p>You must be logged in as a doctor to manage schedules.</p>
         </div>
      );
   }

   return (
      <PageWithSidebar>
         <div className='container mx-auto px-4 py-8'>
            <header className='mb-8'>
               <h1 className='text-3xl font-bold'>Manage Your Schedule</h1>
               <p className='mt-2'>
                  Create and manage your availability for patient appointments
               </p>
            </header>

            {/* Date selection and add appointment section */}
            <div className='mb-8 flex flex-col gap-6 md:flex-row'>
               <div className='h-fit rounded-lg p-4 shadow-md dark:border md:w-1/3'>
                  <h2 className='mb-4 flex items-center text-lg font-medium'>
                     <Calendar className='mr-2 h-5 w-5' /> Select Date
                  </h2>
                  <div className='w-fit rounded-md border'>
                     <CalendarComponent
                        mode='single'
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        className='rounded-md'
                        disabled={(date) => {
                           const today = new Date();
                           today.setHours(0, 0, 0, 0);
                           const sevenDaysFromNow = new Date();
                           sevenDaysFromNow.setDate(today.getDate() + 7);
                           sevenDaysFromNow.setHours(23, 59, 59, 999);
                           return date < today || date > sevenDaysFromNow;
                        }}
                     />
                  </div>
                  <Button
                     onClick={handleAddNewClick}
                     className='mt-4 w-full'
                     disabled={!selectedDate}
                  >
                     <Plus className='mr-2 h-4 w-4' /> Add New Appointment
                  </Button>
               </div>

               <div className='rounded-lg dark:border md:w-2/3'>
                  <div className='rounded-lg p-6 shadow-md'>
                     <h2 className='mb-4 text-lg font-medium'>
                        Your Appointments
                     </h2>

                     {isLoading ? (
                        <div className='flex justify-center py-10'>
                           <Spinner loaderSize={16} />;
                        </div>
                     ) : isError ? (
                        <div className='rounded-md p-4 text-red-800'>
                           Failed to load appointments. Please try again later.
                        </div>
                     ) : appointments.length === 0 ? (
                        <div className='py-10 text-center text-gray-500'>
                           <p>No appointments scheduled yet.</p>
                           <p className='mt-2 text-sm'>
                              Select a date and click "Add New Appointment" to
                              get started.
                           </p>
                        </div>
                     ) : (
                        <div className='space-y-4'>
                           {appointments.map((appointment) => (
                              <div
                                 key={appointment.id}
                                 className={cn(
                                    'rounded-md border-l-4 p-4',
                                    appointment.is_available
                                       ? 'border-l-green-500 bg-green-50 text-green-900 dark:border-l-green-400 dark:bg-green-950 dark:text-green-100'
                                       : 'border-l-gray-300 bg-gray-50 text-gray-800 dark:border-l-gray-600 dark:bg-muted dark:text-muted-foreground'
                                 )}
                              >
                                 <div className='flex items-start justify-between'>
                                    <div>
                                       <h3 className='font-medium'>
                                          {formatAppointmentDate(
                                             appointment.date
                                          )}
                                       </h3>
                                       <div className='mt-1 text-sm'>
                                          <p>
                                             Time: {appointment.start_time} -{' '}
                                             {appointment.end_time}
                                          </p>
                                          <p>
                                             Session:{' '}
                                             {appointment.session_duration}{' '}
                                             minutes
                                          </p>
                                          <p>
                                             Max Patients:{' '}
                                             {appointment.max_patients}
                                          </p>
                                          <p
                                             className={
                                                appointment.is_available
                                                   ? 'text-green-600'
                                                   : 'text-gray-500'
                                             }
                                          >
                                             Status:{' '}
                                             {appointment.is_available
                                                ? 'Available'
                                                : 'Not Available'}
                                          </p>
                                       </div>
                                    </div>

                                    <DropdownMenu>
                                       <DropdownMenuTrigger asChild>
                                          <Button
                                             variant='ghost'
                                             size='sm'
                                             className='h-8 w-8 p-0'
                                          >
                                             <span className='sr-only'>
                                                Open menu
                                             </span>
                                             <svg
                                                width='15'
                                                height='15'
                                                viewBox='0 0 15 15'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                                className='h-4 w-4'
                                             >
                                                <path
                                                   d='M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z'
                                                   fill='currentColor'
                                                   fillRule='evenodd'
                                                   clipRule='evenodd'
                                                ></path>
                                             </svg>
                                          </Button>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent align='end'>
                                          <DropdownMenuItem
                                             onClick={() =>
                                                handleEditAppointment(
                                                   appointment
                                                )
                                             }
                                             className='cursor-pointer'
                                          >
                                             <Edit className='mr-2 h-4 w-4' />
                                             Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                             onClick={() =>
                                                handleDeleteAppointment(
                                                   appointment.id
                                                )
                                             }
                                             className='cursor-pointer text-red-600 focus:text-red-600'
                                          >
                                             <Trash2 className='mr-2 h-4 w-4' />
                                             Delete
                                          </DropdownMenuItem>
                                       </DropdownMenuContent>
                                    </DropdownMenu>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Add Appointment Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
               <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                     <DialogTitle>Add New Appointment</DialogTitle>
                     <DialogDescription>
                        Create a new appointment slot for patients.
                     </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitCreate}>
                     <div className='grid gap-4 py-4'>
                        <div className='grid gap-2'>
                           <Label htmlFor='date'>Date</Label>
                           <div className='flex items-center'>
                              <Input
                                 id='date'
                                 name='date'
                                 value={formData.date}
                                 onChange={handleInputChange}
                                 placeholder='YYYY-MM-DD'
                                 className='rounded-r-none'
                                 required
                              />
                              <Popover>
                                 <PopoverTrigger asChild>
                                    <Button
                                       type='button'
                                       variant='outline'
                                       className='rounded-l-none border-l-0 px-2'
                                    >
                                       <Calendar className='h-4 w-4' />
                                    </Button>
                                 </PopoverTrigger>
                                 <PopoverContent className='w-auto p-0'>
                                    <CalendarComponent
                                       mode='single'
                                       selected={selectedDate}
                                       onSelect={(date) => {
                                          handleDateSelect(date);
                                          setFormData((prev) => ({
                                             ...prev,
                                             date: date
                                                ? format(date, 'yyyy-M-d')
                                                : '',
                                          }));
                                       }}
                                       initialFocus
                                    />
                                 </PopoverContent>
                              </Popover>
                           </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                           <div className='grid gap-2'>
                              <Label htmlFor='start_time'>Start Time</Label>
                              <Input
                                 id='start_time'
                                 name='start_time'
                                 type='time'
                                 value={formData.start_time}
                                 onChange={handleInputChange}
                                 required
                              />
                           </div>
                           <div className='grid gap-2'>
                              <Label htmlFor='end_time'>End Time</Label>
                              <Input
                                 id='end_time'
                                 name='end_time'
                                 type='time'
                                 value={formData.end_time}
                                 onChange={handleInputChange}
                                 required
                              />
                           </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                           <div className='grid gap-2'>
                              <Label htmlFor='session_duration'>
                                 Session Duration (min)
                              </Label>
                              <Input
                                 id='session_duration'
                                 name='session_duration'
                                 type='number'
                                 min={15}
                                 max={120}
                                 step={15}
                                 value={formData.session_duration}
                                 onChange={handleInputChange}
                                 required
                              />
                           </div>
                           <div className='grid gap-2'>
                              <Label htmlFor='max_patients'>Max Patients</Label>
                              <Input
                                 id='max_patients'
                                 name='max_patients'
                                 type='number'
                                 min={1}
                                 value={formData.max_patients}
                                 onChange={handleInputChange}
                                 required
                              />
                           </div>
                        </div>

                        <div className='flex items-center space-x-2'>
                           <Switch
                              id='is_available'
                              checked={formData.is_available}
                              onCheckedChange={handleSwitchChange}
                           />
                           <Label htmlFor='is_available'>
                              Available for booking
                           </Label>
                        </div>
                     </div>
                     <DialogFooter>
                        <Button
                           type='button'
                           variant='outline'
                           onClick={() => setIsAddDialogOpen(false)}
                        >
                           Cancel
                        </Button>
                        <Button
                           type='submit'
                           disabled={createAppointmentMutation.isPending}
                        >
                           Create
                        </Button>
                     </DialogFooter>
                  </form>
               </DialogContent>
            </Dialog>

            {/* Update Appointment Dialog */}
            <Dialog
               open={isUpdateDialogOpen}
               onOpenChange={setIsUpdateDialogOpen}
            >
               <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                     <DialogTitle>Update Appointment</DialogTitle>
                     <DialogDescription>
                        Modify your existing appointment details.
                     </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitUpdate}>
                     <div className='grid gap-4 py-4'>
                        <div className='grid gap-2'>
                           <Label htmlFor='update-date'>Date</Label>
                           <div className='flex items-center'>
                              <Input
                                 id='update-date'
                                 name='date'
                                 value={formData.date}
                                 onChange={handleInputChange}
                                 placeholder='YYYY-MM-DD'
                                 className='rounded-r-none'
                                 required
                              />
                              <Popover>
                                 <PopoverTrigger asChild>
                                    <Button
                                       type='button'
                                       variant='outline'
                                       className='rounded-l-none border-l-0 px-2'
                                    >
                                       <Calendar className='h-4 w-4' />
                                    </Button>
                                 </PopoverTrigger>
                                 <PopoverContent className='w-auto p-0'>
                                    <CalendarComponent
                                       mode='single'
                                       selected={selectedDate}
                                       onSelect={(date) => {
                                          handleDateSelect(date);
                                          setFormData((prev) => ({
                                             ...prev,
                                             date: date
                                                ? format(date, 'yyyy-M-d')
                                                : '',
                                          }));
                                       }}
                                       initialFocus
                                    />
                                 </PopoverContent>
                              </Popover>
                           </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                           <div className='grid gap-2'>
                              <Label htmlFor='update-start_time'>
                                 Start Time
                              </Label>
                              <Input
                                 id='update-start_time'
                                 name='start_time'
                                 type='time'
                                 value={formData.start_time}
                                 onChange={handleInputChange}
                                 required
                              />
                           </div>
                           <div className='grid gap-2'>
                              <Label htmlFor='update-end_time'>End Time</Label>
                              <Input
                                 id='update-end_time'
                                 name='end_time'
                                 type='time'
                                 value={formData.end_time}
                                 onChange={handleInputChange}
                                 required
                              />
                           </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                           <div className='grid gap-2'>
                              <Label htmlFor='update-session_duration'>
                                 Session Duration (min)
                              </Label>
                              <Input
                                 id='update-session_duration'
                                 name='session_duration'
                                 type='number'
                                 min={15}
                                 max={120}
                                 step={15}
                                 value={formData.session_duration}
                                 onChange={handleInputChange}
                                 required
                              />
                           </div>
                           <div className='grid gap-2'>
                              <Label htmlFor='update-max_patients'>
                                 Max Patients
                              </Label>
                              <Input
                                 id='update-max_patients'
                                 name='max_patients'
                                 type='number'
                                 min={1}
                                 value={formData.max_patients}
                                 onChange={handleInputChange}
                                 required
                              />
                           </div>
                        </div>

                        <div className='flex items-center space-x-2'>
                           <Switch
                              id='update-is_available'
                              checked={formData.is_available}
                              onCheckedChange={handleSwitchChange}
                           />
                           <Label htmlFor='update-is_available'>
                              Available for booking
                           </Label>
                        </div>
                     </div>
                     <DialogFooter>
                        <Button
                           type='button'
                           variant='outline'
                           onClick={() => setIsUpdateDialogOpen(false)}
                        >
                           Cancel
                        </Button>
                        <Button
                           type='submit'
                           disabled={updateAppointmentMutation.isPending}
                        >
                           Update
                        </Button>
                     </DialogFooter>
                  </form>
               </DialogContent>
            </Dialog>
         </div>
      </PageWithSidebar>
   );
};

export default DoctorSchedulePage;
