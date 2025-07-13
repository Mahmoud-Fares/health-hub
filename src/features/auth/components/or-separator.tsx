export function OrSeparator() {
   return (
      <div className='flex items-center gap-3'>
         <div className='h-[1px] flex-1 bg-border' />
         <span className='text-sm uppercase text-muted-foreground'>OR</span>
         <div className='h-[1px] flex-1 bg-border' />
      </div>
   );
}
