import { useQueryState } from 'nuqs';

import {
   SettingsTabs,
   doctorSettingsTabsArray,
} from '@/features/settings/types';

const settingsTabsParser = {
   parse: (value: string): SettingsTabs => {
      if (doctorSettingsTabsArray.includes(value)) return value as SettingsTabs;

      return 'personal';
   },
   serialize: (value: SettingsTabs): string => value,
};

export function useSettingsTab(defaultTab: SettingsTabs = 'personal') {
   return useQueryState('tab', {
      ...settingsTabsParser,
      defaultValue: defaultTab,
      shallow: false,
   });
}
