import React, { useRef, useState } from 'react';

import { Trash } from 'lucide-react';

import Spinner from '@/shared/components/spinner';
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';

import { useAuth } from '@/features/auth';
import {
   useDeleteProfileImage,
   useUploadProfileImage,
} from '@/features/settings/api/hooks';

export default function DoctorProfileImageUpload() {
   const { currentUser } = useAuth();
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [preview, setPreview] = useState<string | null>(null);
   const [file, setFile] = useState<File | null>(null);
   const [touched, setTouched] = useState(false);
   const { mutate: uploadImage, isPending } = useUploadProfileImage();

   if (!currentUser || currentUser.role !== 'doctor') return null;

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) {
         setFile(f);
         setPreview(URL.createObjectURL(f));
         setTouched(true);
      }
   };

   const handleRemove = () => {
      setFile(null);
      setPreview(null);
      setTouched(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
   };

   const handleApply = () => {
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);
      uploadImage(formData, {
         onSuccess: () => {
            setTouched(false);
            setFile(null);
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
         },
      });
   };

   const currentImage = preview || currentUser.image || undefined;
   const fallback = currentUser.name
      .split(' ')
      .map((n: string) => n[0].toUpperCase())
      .join('');

   return (
      <Card className='mb-6'>
         <CardContent className='flex flex-col items-center gap-4 pt-6'>
            <div className='relative'>
               <Avatar className='relative h-24 w-24'>
                  <AvatarImage src={currentImage} alt={currentUser.name} />
                  <AvatarFallback>{fallback}</AvatarFallback>
               </Avatar>
               {currentUser.image && !preview && (
                  <DeleteCurrentProfileImage className='absolute -bottom-2 -right-2' />
               )}
            </div>

            <div className='flex gap-2'>
               <Input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='max-w-52 cursor-pointer'
                  onChange={handleFileChange}
                  disabled={isPending}
               />
               {file || preview ? (
                  <Button
                     variant='outline'
                     type='button'
                     onClick={handleRemove}
                     disabled={isPending}
                  >
                     Remove
                  </Button>
               ) : null}
            </div>
            {touched && (
               <Button
                  type='button'
                  onClick={handleApply}
                  disabled={isPending || !file}
               >
                  {isPending ? 'Uploading...' : 'Apply'}
               </Button>
            )}
         </CardContent>
      </Card>
   );
}

const DeleteCurrentProfileImage = ({ className }: { className?: string }) => {
   const { mutate: deleteProfileImage, isPending } = useDeleteProfileImage();

   return (
      <Button
         variant='destructive'
         type='button'
         size='icon'
         className={cn('rounded-full', className)}
         onClick={() => deleteProfileImage()}
      >
         {!isPending && <Trash />}
         {isPending && (
            <Spinner className='h-4 w-4 border-destructive-foreground' />
         )}
      </Button>
   );
};
