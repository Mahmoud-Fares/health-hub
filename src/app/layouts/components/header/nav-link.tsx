import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/shared/lib/utils';

interface NavLinkProps {
   to: string;
   label: string;
   className?: string;
   onClick?: () => void;
}

export const NavLink = ({ to, label, className, onClick }: NavLinkProps) => {
   const location = useLocation();
   const isActive = location.pathname === to;

   return (
      <Link
         to={to}
         onClick={onClick}
         className={cn(
            'relative text-sm font-medium transition-colors',
            'after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all',
            'hover:text-foreground hover:after:w-full',
            isActive ? 'text-foreground after:w-full' : 'text-foreground/60',
            className
         )}
      >
         {label}
      </Link>
   );
};
