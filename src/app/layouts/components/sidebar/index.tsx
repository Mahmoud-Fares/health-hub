import { Calendar, Home, Settings, User, Users } from 'lucide-react';

import { useAuth } from '@/features/auth';

import { SidebarLink } from './sidebar-link';

const Sidebar = () => {
   const { currentUser } = useAuth();

   const isDoctor = currentUser?.role === 'doctor';
   const isClient = currentUser?.role === 'client';

   const nav = [
      {
         name: 'Home',
         href: '/',
         icon: Home,
      },
      {
         name: 'Find Doctors',
         href: '/find-doctors',
         icon: Users,
      },
      {
         name: 'My Appointments',
         href: '/my-appointments',
         icon: Calendar,
      },
      ...(isDoctor && currentUser?.slug
         ? [
              {
                 name: 'My Profile',
                 href: `/doctor/${currentUser.slug}`,
                 icon: User,
              },
              {
                 name: 'Manage Schedule',
                 href: '/doctor/schedule',
                 icon: Calendar,
              },
           ]
         : []),
      ...(isClient && currentUser?.slug
         ? [
              {
                 name: 'My Profile',
                 href: `/client/${currentUser.slug}`,
                 icon: User,
              },
           ]
         : []),
   ];

   return (
      <aside className='sticky top-16 hidden h-screen w-64 animate-slide-in-left border-r bg-background md:block'>
         <div className='h-full overflow-y-auto px-3 py-4'>
            <ul className='space-y-1'>
               {nav.map((item) => (
                  <SidebarLink
                     key={item.name}
                     href={item.href}
                     icon={item.icon}
                     label={item.name}
                  />
               ))}
            </ul>

            <div className='mt-4 border-t border-gray-200 pt-4 dark:border-gray-700'>
               <ul className='space-y-1'>
                  <SidebarLink
                     href='/settings'
                     icon={Settings}
                     label='Settings'
                  />
               </ul>
            </div>
         </div>
      </aside>
   );
};

export default Sidebar;
