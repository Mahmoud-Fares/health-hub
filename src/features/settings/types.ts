export type DoctorSettingsTabs =
   | 'personal'
   | 'professional'
   | 'clinic'
   | 'preferences';

export type PatientSettingsTabs = 'personal' | 'health' | 'preferences';

export type SettingsTabs = DoctorSettingsTabs | PatientSettingsTabs;
