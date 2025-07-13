export type DoctorSettingsTabs =
   | 'personal'
   | 'professional'
   | 'clinic'
   | 'preferences'
   | 'security';

export type PatientSettingsTabs =
   | 'personal'
   | 'health'
   | 'preferences'
   | 'security';

export type SettingsTabs = DoctorSettingsTabs | PatientSettingsTabs;
