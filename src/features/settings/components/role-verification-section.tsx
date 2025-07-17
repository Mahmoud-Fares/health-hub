import { Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

export default function RoleVerificationSection() {
   return (
      <Card>
         <CardHeader>
            <h2 className='text-balance text-2xl font-bold'>
               To verify you as a doctor
            </h2>
         </CardHeader>
         <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col items-center gap-2'>
               <Link
                  to='https://wa.me/201147076788'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex w-full'
               >
                  <Button
                     className='flex w-full items-center gap-2 bg-green-500 text-lg font-semibold text-white hover:bg-green-600 hover:text-white'
                     variant='outline'
                     size={'lg'}
                  >
                     <MessageCircle className='size-5 stroke-white' />
                     Contact via WhatsApp
                  </Button>
               </Link>
            </div>

            <div className='flex flex-col items-center gap-2'>
               <Link
                  to='mailto:mahmoudfaresce@gmail.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex w-full'
               >
                  <Button
                     className='flex w-full items-center gap-2 text-lg font-semibold'
                     variant='secondary'
                     size={'lg'}
                  >
                     <Mail className='h-5 w-5' />
                     Contact via Email
                  </Button>
               </Link>
            </div>
         </CardContent>
      </Card>
   );
}
