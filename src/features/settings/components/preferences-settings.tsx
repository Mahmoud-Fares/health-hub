import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { useTheme } from '@/shared/hooks/ui/use-theme';

export function PreferencesSettings() {
   const { theme, setTheme } = useTheme();

   return (
      <Card>
         <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
               Customize how the application looks on your device
            </CardDescription>
         </CardHeader>
         <CardContent className='space-y-4'>
            <div className='flex items-center justify-between gap-2'>
               <div className='space-y-0.5'>
                  <Label htmlFor='theme-mode'>Dark mode</Label>
                  <div className='text-sm text-muted-foreground'>
                     Switch between light and dark mode
                  </div>
               </div>
               <Switch
                  id='theme-mode'
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) =>
                     setTheme(checked ? 'dark' : 'light')
                  }
               />
            </div>

            <div className='flex items-center justify-between gap-2'>
               <div className='space-y-0.5'>
                  <Label htmlFor='system-theme'>Use system theme</Label>
                  <div className='text-sm text-muted-foreground'>
                     Automatically switch theme based on your system preferences
                  </div>
               </div>
               <Switch
                  id='system-theme'
                  checked={theme === 'system'}
                  onCheckedChange={(checked) => {
                     if (checked) {
                        setTheme('system');
                     } else {
                        // Default to light if not using system
                        setTheme('light');
                     }
                  }}
               />
            </div>
         </CardContent>
      </Card>
   );
}
