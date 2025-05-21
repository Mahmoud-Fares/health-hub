import { cn } from '@/shared/lib/utils';

interface HeroSectionProps {
   className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
   return (
      <div
         className={cn(
            'pt-12 text-white',
            'bg-gradient-to-r from-blue-800/90 to-blue-800',
            'dark:from-blue-900 dark:to-gray-900 dark:text-blue-100',
            className
         )}
      >
         <div className='container mx-auto px-4 text-center'>
            <h1 className='mb-4 text-3xl font-bold md:text-4xl'>
               Find the Right Doctor
            </h1>
            <p className='mx-auto max-w-2xl text-lg opacity-90 md:text-xl'>
               Search our network of qualified healthcare professionals to find
               the care you need.
            </p>
         </div>
      </div>
   );
};
