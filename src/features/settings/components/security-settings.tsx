import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';

import SecurityForm from '@/features/settings/components/security-form';

export default function SecuritySettings() {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
               Update your password to keep your account secure
            </CardDescription>
         </CardHeader>

         <CardContent>
            <SecurityForm />
         </CardContent>
      </Card>
   );
}
