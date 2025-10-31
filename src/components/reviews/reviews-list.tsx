import {Reviews} from "../../types/review.ts";

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
          <li key={review.id} className="reviews__item">
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
                dateTime={new Date(review.date).toISOString().split('T')[0]}
              >
                {new Date(review.date).toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
