import {
   Building2,
   Heart,
   Lock,
   LucideIcon,
   Settings,
   Stethoscope,
   User,
   Verified,
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
   {
      value: 'security',
      label: 'Security',
      icon: Lock,
   },
   {
      value: 'role_verification',
      label: 'Verify',
      icon: Verified,
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
   {
      value: 'security',
      label: 'Security',
      icon: Lock,
   },
];

export const getSettingsTabs = (currentUser: AuthUser) => {
   if (isDoctor(currentUser!)) {
      if (!currentUser.role_activation) return DOCTOR_TABS;

      // Hide 'role_verification' tab if user is already verified
      return DOCTOR_TABS.filter((tab) => tab.value !== 'role_verification');
   }

   if (isPatient(currentUser!)) return PATIENT_TABS;

   return [];
};
