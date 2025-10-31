import {Review} from '../../types/review.ts';

type ReviewItemProps = {
  review: Review;
};

export function ReviewItem({ review }: ReviewItemProps) {
  const formattedDate = new Date(review.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt={review.user.name}
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
        {review.user.isPro && (
          <span className="reviews__user-status">Pro</span>
        )}
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(review.rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time
          className="reviews__time"
          dateTime={formattedDate.toISOString().split('T')[0]}
        >
          {formattedDate.toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
    </li>
  );
}
