import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export function Footer() {
   const currentYear = new Date().getFullYear();

   return (
      <footer className='border-t bg-background pt-12'>
         <div className='container grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4'>
            <div className='space-y-4'>
               <h3 className='gradient-text text-lg font-bold'>MediCare</h3>
               <p className='max-w-xs text-sm text-muted-foreground'>
                  Your trusted platform for connecting with healthcare
                  professionals and managing appointments online.
               </p>
            </div>

            <div>
               <h4 className='mb-4 font-bold text-foreground'>Quick Links</h4>
               <ul className='space-y-2'>
                  <li>
                     <Link
                        to='/'
                        className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                     >
                        Home
                     </Link>
                  </li>
                  <li>
                     <Link
                        to='/find-doctors'
                        className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                     >
                        Find Doctors
                     </Link>
                  </li>
                  <li>
                     <Link
                        to='/my-appointments'
                        className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                     >
                        My Appointments
                     </Link>
                  </li>
               </ul>
            </div>

            <div>
               <h4 className='mb-4 font-bold text-foreground'>Resources</h4>
               <ul className='space-y-2'>
                  <li>
                     <a
                        href='#'
                        className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                     >
                        Help Center
                     </a>
                  </li>
                  <li>
                     <a
                        href='#'
                        className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                     >
                        Privacy Policy
                     </a>
                  </li>
                  <li>
                     <a
                        href='#'
                        className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                     >
                        Terms of Service
                     </a>
                  </li>
               </ul>
            </div>

            <div className='md:col-span-3 lg:col-span-1'>
               <h4 className='mb-4 font-bold text-foreground'>Stay Updated</h4>
               <form className='flex flex-col flex-wrap gap-2 sm:flex-row'>
                  <input
                     type='email'
                     placeholder='Your email'
                     className='flex-1 rounded-md border bg-background px-4 py-2 text-sm'
                  />
                  <Button type='submit'>Subscribe</Button>
               </form>
            </div>
         </div>

         <div className='container mt-8 border-t p-8 text-center text-sm text-muted-foreground'>
            <p>&copy; {currentYear} MediCare. All rights reserved.</p>
         </div>
      </footer>
   );
}
