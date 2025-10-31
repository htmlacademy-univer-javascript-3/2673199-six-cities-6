import {Reviews} from '../../types/review.ts';
import {ReviewItem} from './review.tsx';

type ReviewsListProps = {
  reviews: Reviews;
};

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
