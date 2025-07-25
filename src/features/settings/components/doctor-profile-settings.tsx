import { PreferencesSettings } from '@/features/settings/components/preferences-settings';
import { DoctorSettingsTabs } from '@/features/settings/types';

import ClinicSettings from './clinic-settings';
import PersonalSettings from './personal-settings';
import ProfessionalSettings from './professional-settings';
import RoleVerificationSection from './role-verification-section';
import SecuritySettings from './security-settings';

type DoctorProfileProps = {
   activeTab: DoctorSettingsTabs;
};

export function DoctorProfileSettings({ activeTab }: DoctorProfileProps) {
   if (activeTab === 'personal') return <PersonalSettings />;

   if (activeTab === 'professional') return <ProfessionalSettings />;

   if (activeTab === 'clinic') return <ClinicSettings />;

   if (activeTab === 'preferences') return <PreferencesSettings />;

   if (activeTab === 'security') return <SecuritySettings />;

   if (activeTab === 'role_verification') return <RoleVerificationSection />;
}
