import {Reviews} from '../../types';
import {ReviewItem} from './review.tsx';
import {MAX_REVIEWS_LEN} from '../../consts.ts';

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
        {reviews.slice(reviews.length - MAX_REVIEWS_LEN, reviews.length).map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
