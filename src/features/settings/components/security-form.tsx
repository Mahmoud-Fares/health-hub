'use no memo';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';
import { PasswordField } from '@/shared/components/ui/password-field';
import { passwordValidation, stringValidation } from '@/shared/schema';

import { useChangePassword, useDeleteProfile } from '../api/hooks';

export default function SecurityForm() {
   const securitySchema = z
      .object({
         currentPassword: stringValidation(
            1,
            'Current password is required when changing password'
         ),
         newPassword: stringValidation()
            .optional()
            .transform((val) => (val === '' ? undefined : val))
            .pipe(passwordValidation.optional()),
         confirmPassword: stringValidation().optional(),
      })
      .refine(
         (data) =>
            !data.newPassword || data.newPassword === data.confirmPassword,
         {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
         }
      )
      .refine(
         (data) =>
            !data.newPassword || data.newPassword !== data.currentPassword,
         {
            message: 'New password is the same as the current password',
            path: ['newPassword'],
         }
      );

   const form = useForm<z.infer<typeof securitySchema>>({
      resolver: zodResolver(securitySchema),
      defaultValues: {
         currentPassword: '',
         newPassword: '',
         confirmPassword: '',
      },
   });

   const changePasswordMutation = useChangePassword();

   function onSubmit(values: z.infer<typeof securitySchema>) {
      if (!values.newPassword) {
         toast.error('Please enter a new password to change.');
         return;
      }
      changePasswordMutation.mutate(
         {
            oldPassword: values.currentPassword,
            newPassword: values.newPassword!,
            newPassword_confirmation: values.confirmPassword!,
         },
         {
            onSuccess: () => form.reset(),
         }
      );
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <PasswordField
               control={form.control}
               name='currentPassword'
               label='Current Password'
               showPasswordLabel
            />

            <PasswordField
               control={form.control}
               name='newPassword'
               label='New Password'
               showPasswordLabel
            />

            <PasswordField
               control={form.control}
               name='confirmPassword'
               label='Confirm Password'
               showPasswordLabel
            />

            <div className='flex flex-wrap items-center justify-between gap-4 *:flex-1 *:sm:max-w-fit'>
               <Button
                  type='submit'
                  disabled={changePasswordMutation.isPending}
               >
                  {changePasswordMutation.isPending
                     ? 'Changing...'
                     : 'Change Password'}
               </Button>
               <DeleteAccount />
            </div>
         </form>
      </Form>
   );
}

function DeleteAccount() {
   const deleteProfileMutation = useDeleteProfile();
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button
               variant='destructive'
               disabled={deleteProfileMutation.isPending}
            >
               {deleteProfileMutation.isPending
                  ? 'Deleting...'
                  : 'Delete Account'}
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel disabled={deleteProfileMutation.isPending}>
                  Cancel
               </AlertDialogCancel>
               <AlertDialogAction
                  className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  onClick={() => deleteProfileMutation.mutate()}
                  disabled={deleteProfileMutation.isPending}
               >
                  {deleteProfileMutation.isPending
                     ? 'Deleting...'
                     : 'Delete Account'}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
