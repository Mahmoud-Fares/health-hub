import React from 'react';

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '@/shared/components/ui/dialog';

import { useAuth } from '@/features/auth';
import { AppointmentForm } from '@/features/doctor/components/appointment-form';
import { AppointmentList } from '@/features/doctor/components/appointment-list';
import { DateSelector } from '@/features/doctor/components/date-selector';
import { useAppointmentManagement } from '@/features/doctor/hooks/use-appointment-management';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

const DoctorSchedulePage: React.FC = () => {
   const { currentUser } = useAuth();
   const {
      selectedDate,
      isAddDialogOpen,
      isUpdateDialogOpen,
      formData,
      appointments,
      isLoading,
      isError,
      setIsAddDialogOpen,
      setIsUpdateDialogOpen,
      handleAddNewClick,
      handleEditAppointment,
      handleDeleteAppointment,
      handleInputChange,
      handleSwitchChange,
      handleDateSelect,
      handleSubmitCreate,
      handleSubmitUpdate,
      formatAppointmentDate,
      isCreating,
      isUpdating,
   } = useAppointmentManagement();

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

            <div className='mb-8 flex flex-col gap-6 lg:flex-row'>
               <DateSelector
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  onAddNewClick={handleAddNewClick}
               />

               <div className='rounded-lg dark:border lg:flex-1'>
                  <div className='rounded-lg p-6 shadow-md'>
                     <h2 className='mb-4 text-lg font-medium'>
                        Your Appointments
                     </h2>
                     <AppointmentList
                        appointments={appointments}
                        isLoading={isLoading}
                        isError={isError}
                        onEdit={handleEditAppointment}
                        onDelete={handleDeleteAppointment}
                        formatDate={formatAppointmentDate}
                     />
                  </div>
               </div>
            </div>

            {/* Add Appointment Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
               <DialogContent className='max-w-[97%] sm:max-w-[425px]'>
                  <DialogHeader>
                     <DialogTitle>Add New Appointment</DialogTitle>
                     <DialogDescription>
                        Create a new appointment slot for patients.
                     </DialogDescription>
                  </DialogHeader>
                  <AppointmentForm
                     formData={formData}
                     selectedDate={selectedDate}
                     onInputChange={handleInputChange}
                     onSwitchChange={handleSwitchChange}
                     onDateSelect={handleDateSelect}
                     onSubmit={handleSubmitCreate}
                     onCancel={() => setIsAddDialogOpen(false)}
                     submitLabel='Create'
                     isSubmitting={isCreating}
                     formId='add-appointment'
                  />
               </DialogContent>
            </Dialog>

            {/* Update Appointment Dialog */}
            <Dialog
               open={isUpdateDialogOpen}
               onOpenChange={setIsUpdateDialogOpen}
            >
               <DialogContent className='max-w-[97%] sm:max-w-[425px]'>
                  <DialogHeader>
                     <DialogTitle>Update Appointment</DialogTitle>
                     <DialogDescription>
                        Modify your existing appointment details.
                     </DialogDescription>
                  </DialogHeader>
                  <AppointmentForm
                     formData={formData}
                     selectedDate={selectedDate}
                     onInputChange={handleInputChange}
                     onSwitchChange={handleSwitchChange}
                     onDateSelect={handleDateSelect}
                     onSubmit={handleSubmitUpdate}
                     onCancel={() => setIsUpdateDialogOpen(false)}
                     submitLabel='Update'
                     isSubmitting={isUpdating}
                     formId='update-appointment'
                  />
               </DialogContent>
            </Dialog>
         </div>
      </PageWithSidebar>
   );
};

export default DoctorSchedulePage;
