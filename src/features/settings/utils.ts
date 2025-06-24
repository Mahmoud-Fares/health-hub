import {
   Building2,
   Heart,
   LucideIcon,
   Settings,
   Stethoscope,
   User,
} from 'lucide-react';

import { AuthUser } from '@/shared/types';

import { isDoctor, isPatient } from '@/features/auth';

import { SettingsTabs } from './types';

type TabConfig = {
   value: SettingsTabs;
   label: string;
   icon: LucideIcon;
};

const DOCTOR_TABS: TabConfig[] = [
   {
      value: 'personal',
      label: 'Personal Info',
      icon: User,
   },
   {
      value: 'professional',
      label: 'Professional',
      icon: Stethoscope,
   },
   {
      value: 'clinic',
      label: 'Clinic',
      icon: Building2,
   },
   {
      value: 'preferences',
      label: 'Preferences',
      icon: Settings,
   },
];

const PATIENT_TABS: TabConfig[] = [
   {
      value: 'personal',
      label: 'Personal Info',
      icon: User,
   },
   {
      value: 'health',
      label: 'Health Info',
      icon: Heart,
   },
   {
      value: 'preferences',
      label: 'Preferences',
      icon: Settings,
   },
];

export const getSettingsTabs = (currentUser: AuthUser) => {
   if (isDoctor(currentUser!)) return DOCTOR_TABS;

   if (isPatient(currentUser!)) return PATIENT_TABS;

   return [];
};
