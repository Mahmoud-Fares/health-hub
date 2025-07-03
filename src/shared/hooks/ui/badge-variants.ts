import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
   'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
   {
      variants: {
         variant: {
            default:
               'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
            secondary:
               'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive:
               'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
            outline: 'text-foreground',
            warning:
               'border-transparent bg-amber-200/80 text-amber-800 shadow dark:bg-amber-900/30 dark:text-amber-200',
            success:
               'border-transparent bg-green-100 text-green-800 shadow hover:bg-green-200 dark:bg-green-900/20 dark:text-green-200 dark:hover:bg-green-900/30',
         },
      },
      defaultVariants: {
         variant: 'default',
      },
   }
);
