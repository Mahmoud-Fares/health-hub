import { PreferencesSettings } from '@/features/settings/components/preferences-settings';
import { DoctorSettingsTabs } from '@/features/settings/types';

import ClinicSettings from './clinic-settings';
import PersonalSettings from './personal-settings';
import ProfessionalSettings from './professional-settings';

type DoctorProfileProps = {
   activeTab: DoctorSettingsTabs;
};

export function DoctorProfileSettings({ activeTab }: DoctorProfileProps) {
   if (activeTab === 'personal') return <PersonalSettings />;

   if (activeTab === 'professional') return <ProfessionalSettings />;

   if (activeTab === 'clinic') return <ClinicSettings />;

   if (activeTab === 'preferences') return <PreferencesSettings />;
}
