import { ChevronRight, LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/shared/lib/utils';

interface SidebarLinkProps {
   href: string;
   icon: LucideIcon;
   label: string;
}

export const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
   const location = useLocation();
   const isActive = location.pathname === href;

   return (
      <li>
         <Link
            to={href}
            className={cn(
               'flex items-center rounded-lg p-2 text-base font-normal transition-all duration-150',
               isActive
                  ? 'animate-fade-in bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted'
            )}
         >
            <Icon
               className={cn(
                  'h-5 w-5 transition duration-75',
                  isActive ? 'text-primary' : 'text-foreground'
               )}
            />
            <span className='ml-3'>{label}</span>
            {isActive && (
               <ChevronRight className='ml-auto h-4 w-4 text-primary' />
            )}
         </Link>
      </li>
   );
};
