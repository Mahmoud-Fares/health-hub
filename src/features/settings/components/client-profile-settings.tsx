import { PreferencesSettings } from '@/features/settings/components/preferences-settings';
import { PatientSettingsTabs } from '@/features/settings/types';

import HealthSettings from './health-settings';
import PersonalSettings from './personal-settings';

type ClientProfileProps = {
   activeTab: PatientSettingsTabs;
};

export const ClientProfileSettings = ({ activeTab }: ClientProfileProps) => {
   if (activeTab === 'personal') return <PersonalSettings />;

   if (activeTab === 'health') return <HealthSettings />;

   if (activeTab === 'preferences') return <PreferencesSettings />;
};
