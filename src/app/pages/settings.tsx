import { useState } from 'react';

import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/components/ui/tabs';

import { useAuth } from '@/features/auth';
import { isDoctor, isPatient } from '@/features/auth/utils';
import { ClientProfileSettings } from '@/features/settings/components/client-profile-settings';
import { DoctorProfileSettings } from '@/features/settings/components/doctor-profile-settings';
import { PreferencesSettings } from '@/features/settings/components/preferences-settings';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

// todo: update the current user in the auth store after saving any changes

const SettingsPage = () => {
   const { currentUser } = useAuth();
   const [activeTab, setActiveTab] = useState('personal');

   return (
      <PageWithSidebar>
         <div className='container py-10'>
            <div className='mb-8'>
               <h1 className='text-3xl font-bold'>Account Settings</h1>
               <p className='text-muted-foreground'>
                  Manage your account details and preferences
               </p>
            </div>

            <Tabs
               defaultValue={activeTab}
               onValueChange={(value) => setActiveTab(value)}
               className='space-y-6'
            >
               <TabsList className='w-full sm:w-auto'>
                  <TabsTrigger value='personal'>Personal Info</TabsTrigger>

                  {isDoctor(currentUser!) && (
                     <>
                        <TabsTrigger value='professional'>
                           Professional
                        </TabsTrigger>
                        <TabsTrigger value='clinic'>Clinic</TabsTrigger>
                     </>
                  )}

                  {isPatient(currentUser!) && (
                     <TabsTrigger value='health'>Health Info</TabsTrigger>
                  )}

                  <TabsTrigger value='preferences'>Preferences</TabsTrigger>
               </TabsList>

               <div className='space-y-6'>
                  {isDoctor(currentUser!) && (
                     <>
                        <TabsContent value='personal' className='space-y-6'>
                           <DoctorProfileSettings
                              activeTab='personal'
                              currentUser={currentUser}
                           />
                        </TabsContent>

                        <TabsContent value='professional' className='space-y-6'>
                           <DoctorProfileSettings
                              activeTab='professional'
                              currentUser={currentUser}
                           />
                        </TabsContent>

                        <TabsContent value='clinic' className='space-y-6'>
                           <DoctorProfileSettings
                              activeTab='clinic'
                              currentUser={currentUser}
                           />
                        </TabsContent>
                     </>
                  )}

                  {isPatient(currentUser!) && (
                     <>
                        <TabsContent value='personal' className='space-y-6'>
                           <ClientProfileSettings
                              activeTab='personal'
                              currentUser={currentUser}
                           />
                        </TabsContent>

                        <TabsContent value='health' className='space-y-6'>
                           <ClientProfileSettings
                              activeTab='health'
                              currentUser={currentUser}
                           />
                        </TabsContent>
                     </>
                  )}

                  <TabsContent value='preferences' className='space-y-6'>
                     <PreferencesSettings />
                  </TabsContent>
               </div>
            </Tabs>
         </div>
      </PageWithSidebar>
   );
};

export default SettingsPage;
