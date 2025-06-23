import Spinner from '@/shared/components/spinner';

export const LoadingState = () => {
   return (
      <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center py-20'>
         <Spinner className='size-16' />
      </div>
   );
};
