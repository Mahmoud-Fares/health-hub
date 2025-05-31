import { InfoItemProps } from './types';

export const InfoItem = ({
   icon,
   title,
   value,
   unit,
   highlight = false,
}: InfoItemProps) => {
   const displayValue = value
      ? `${value}${unit ? ` ${unit}` : ''}`
      : 'Not specified';

   const isNotSpecified = !value;

   return (
      <div
         className={`group flex items-start gap-3 rounded-lg p-4 transition-all duration-200 ${
            highlight
               ? 'border border-primary/10 bg-primary/5 hover:bg-primary/10'
               : 'bg-muted/30 hover:bg-muted/50'
         }`}
      >
         <div className='mt-0.5 flex-shrink-0' aria-hidden='true'>
            {icon}
         </div>
         <div className='min-w-0 flex-1 space-y-1'>
            <h4 className='text-sm font-semibold text-foreground transition-colors group-hover:text-primary'>
               {title}
            </h4>
            <p
               className={`text-sm leading-relaxed ${
                  isNotSpecified
                     ? 'italic text-muted-foreground'
                     : 'font-medium text-foreground'
               }`}
               aria-label={`${title}: ${displayValue}`}
            >
               {displayValue}
            </p>
         </div>
      </div>
   );
};
