import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { ViewBookingsButtonProps } from './types';

export const ViewBookingsButton = ({ url }: ViewBookingsButtonProps) => (
   <Button
      asChild
      size='sm'
      variant='outline'
      className='transition-colors group-hover:bg-primary group-hover:text-primary-foreground'
   >
      <Link to={url} className='flex items-center gap-2'>
         View Bookings
         <ArrowRight className='h-3 w-3' />
      </Link>
   </Button>
);
