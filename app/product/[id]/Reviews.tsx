import StarRating from '@/components/StarRating';
import { formatDate } from '@/lib/helpers';
import { ReviewType } from '@/lib/product';
import { use } from 'react';

interface ReviewsProps {
  item: Promise<ReviewType[]>;
}

export default function Reviews({ item }: ReviewsProps) {
  const reviews = use(item);
  return (
    <section className='flex flex-col gap-5'>
      <h3 className='text-2xl'>Customer reviews</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {reviews.map((review, index) => (
          <div
            key={index}
            className=' flex flex-col gap-5 shadow-sm p-3 rounded-lg '
          >
            <StarRating rating={review.rating} />
            <p>{review.comment}</p>
            <div className='flex flex-col gap-1'>
              <span className='text-sm text-gray-400'>
                {review.reviewerName}
              </span>
              <span className='text-sm text-gray-400'>
                {formatDate(review.date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
