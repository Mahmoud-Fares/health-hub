import { TableCell } from '@/shared/components/ui/table';

import { DesktopTableCellProps } from './types';

export const DesktopTableCell = ({
   cell,
   appointment,
}: DesktopTableCellProps) => {
   const value = cell.getValue(appointment);

   if (cell.icon) {
      return (
         <TableCell className={cell.className}>
            <div className='flex items-center gap-2'>
               <cell.icon className='h-4 w-4 text-muted-foreground' />
               <span className='font-medium'>{value}</span>
            </div>
         </TableCell>
      );
   }

   return <TableCell className={cell.className}>{value}</TableCell>;
};
