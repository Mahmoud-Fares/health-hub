export const doctorSettingsTabsArray = [
   'personal',
   'professional',
   'clinic',
   'preferences',
   'security',
   'role_verification',
];

export type DoctorSettingsTabs = (typeof doctorSettingsTabsArray)[number];

export type PatientSettingsTabs =
   | 'personal'
   | 'health'
   | 'preferences'
   | 'security';

export type SettingsTabs = DoctorSettingsTabs | PatientSettingsTabs;
