import { useState } from 'react';

import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/components/ui/tabs';

import { useAuth } from '@/features/auth';
import { ClientProfileSettings } from '@/features/settings/components/client-profile-settings';
import { DoctorProfileSettings } from '@/features/settings/components/doctor-profile-settings';
import { PreferencesSettings } from '@/features/settings/components/preferences-settings';

import PageWithSidebar from '@/app/layouts/page-with-sidebar';

const SettingsPage = () => {
   const { currentUser } = useAuth();
   const [activeTab, setActiveTab] = useState('personal');

   const isDoctor = currentUser?.role === 'doctor';

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

                  {isDoctor ? (
                     <>
                        <TabsTrigger value='professional'>
                           Professional
                        </TabsTrigger>
                        <TabsTrigger value='clinic'>Clinic</TabsTrigger>
                     </>
                  ) : (
                     <TabsTrigger value='health'>Health Info</TabsTrigger>
                  )}

                  <TabsTrigger value='preferences'>Preferences</TabsTrigger>
               </TabsList>

               <div className='space-y-6'>
                  {isDoctor ? (
                     <>
                        <TabsContent value='personal' className='space-y-6'>
                           <DoctorProfileSettings activeTab='personal' />
                        </TabsContent>

                        <TabsContent value='professional' className='space-y-6'>
                           <DoctorProfileSettings activeTab='professional' />
                        </TabsContent>

                        <TabsContent value='clinic' className='space-y-6'>
                           <DoctorProfileSettings activeTab='clinic' />
                        </TabsContent>
                     </>
                  ) : (
                     <>
                        <TabsContent value='personal' className='space-y-6'>
                           <ClientProfileSettings activeTab='personal' />
                        </TabsContent>

                        <TabsContent value='health' className='space-y-6'>
                           <ClientProfileSettings activeTab='health' />
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
