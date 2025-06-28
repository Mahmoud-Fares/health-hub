import { Star } from 'lucide-react';

import { ProductReview } from '@/features/store/data/products';

interface ReviewCardProps {
   review: ProductReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
   // Convert date string to readable format
   const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      });
   };

   return (
      <div className='border-b border-gray-100 py-4 last:border-0'>
         <div className='mb-2 flex items-center justify-between'>
            <div>
               <h4 className='font-medium'>{review.title}</h4>
               <div className='flex items-center'>
                  <span className='mr-2 text-sm text-gray-600'>
                     {review.userName}
                  </span>
                  <div className='flex'>
                     {Array(5)
                        .fill(null)
                        .map((_, i) => (
                           <Star
                              key={i}
                              size={14}
                              className={`${
                                 i < review.rating
                                    ? 'fill-yellow-500 text-yellow-500'
                                    : 'text-gray-300'
                              }`}
                           />
                        ))}
                  </div>
               </div>
            </div>
            <span className='text-xs text-gray-500'>
               {formatDate(review.date)}
            </span>
         </div>
         <p className='text-sm text-gray-700'>{review.comment}</p>
      </div>
   );
};

export default ReviewCard;
