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
import {
   DoctorSettingsTabs,
   PatientSettingsTabs,
   SettingsTabs,
} from '@/features/settings/types';
import { getSettingsTabs } from '@/features/settings/utils';

export default function SettingsPage() {
   const { currentUser } = useAuth();
   const [activeTab, setActiveTab] = useState<SettingsTabs>('personal');

   const TABS = getSettingsTabs(currentUser!);

   return (
      <div className='animate-fade-in'>
         <div className='mb-8'>
            <h1 className='text-3xl font-bold'>Account Settings</h1>
            <p className='text-muted-foreground'>
               Manage your account details and preferences
            </p>
         </div>

         <Tabs
            defaultValue={activeTab}
            onValueChange={(value) => setActiveTab(value as SettingsTabs)}
            className='space-y-6'
         >
            <TabsList>
               {TABS.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger key={value} value={value} className='flex gap-2'>
                     <Icon size={16} className='hidden text-primary sm:flex' />
                     {label}
                  </TabsTrigger>
               ))}
            </TabsList>

            <div className='space-y-6'>
               {TABS.map(({ value }) => (
                  <TabsContent
                     key={value}
                     value={value}
                     className='animate-fade-in space-y-6'
                  >
                     <TabContent tabValue={value} />
                  </TabsContent>
               ))}
            </div>
         </Tabs>
      </div>
   );
}

const TabContent = ({ tabValue }: { tabValue: SettingsTabs }) => {
   const { currentUser } = useAuth();

   if (isDoctor(currentUser!))
      return (
         <DoctorProfileSettings activeTab={tabValue as DoctorSettingsTabs} />
      );

   if (isPatient(currentUser!))
      return (
         <ClientProfileSettings activeTab={tabValue as PatientSettingsTabs} />
      );
};
