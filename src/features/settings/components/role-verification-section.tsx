import { Mail, MessageCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from '@/shared/components/ui/card';

export default function RoleVerificationSection() {
   return (
      <Card>
         <CardHeader className='pb-8 text-center'>
            <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10'>
               <Shield className='h-8 w-8 text-primary' />
            </div>
            <h2 className='text-2xl font-semibold text-foreground'>
               Doctor Verification
            </h2>
            <p className='mt-2 text-sm text-muted-foreground'>
               Choose your preferred method to get verified
            </p>
         </CardHeader>

         <CardContent className='flex flex-col gap-4 sm:flex-row'>
            <WhatsAppButton />
            <EmailButton />
         </CardContent>

         <CardFooter>
            <p className='text-center text-sm text-muted-foreground'>
               Verification typically takes 24-48 hours. You'll receive
               confirmation once approved.
            </p>
         </CardFooter>
      </Card>
   );
}

const WhatsAppButton = () => (
   <Link
      to='https://wa.me/201147076788'
      target='_blank'
      rel='noopener noreferrer'
      className='block w-full'
   >
      <Button
         className='h-16 w-full justify-start gap-4 bg-[#25D366] text-white transition-all duration-200 hover:bg-[#25D366]/90'
         variant='default'
         size='lg'
      >
         <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/20'>
            <MessageCircle className='h-5 w-5' />
         </div>
         <div className='text-left'>
            <div className='font-medium'>WhatsApp</div>
            <div className='text-sm opacity-90'>Quick response</div>
         </div>
      </Button>
   </Link>
);

const EmailButton = () => (
   <Link
      to='mailto:mahmoudfaresce@gmail.com'
      target='_blank'
      rel='noopener noreferrer'
      className='block w-full'
   >
      <Button
         className='h-16 w-full justify-start gap-4 bg-secondary text-secondary-foreground transition-all duration-200 hover:bg-secondary/70'
         variant='secondary'
         size='lg'
      >
         <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-muted'>
            <Mail className='h-5 w-5 text-muted-foreground' />
         </div>
         <div className='text-left'>
            <div className='font-medium'>Email</div>
            <div className='text-sm text-muted-foreground'>
               Professional contact
            </div>
         </div>
      </Button>
   </Link>
);
