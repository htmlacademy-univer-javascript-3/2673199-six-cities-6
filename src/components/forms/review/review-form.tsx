import {Reviews} from '../../../models/review.ts';

type ReviewsFormProps = {
  reviews: Reviews;
};

export function ReviewsForm({ reviews }: ReviewsFormProps) {
  return (
    <section className="offer__reviews reviews">
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

      <form className="reviews__form form" action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>
        <div className="reviews__rating-form form__rating">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={stars}
                id={`${stars}-stars`}
                type="radio"
              />
              <label
                htmlFor={`${stars}-stars`}
                className="reviews__rating-label form__rating-label"
                title={
                  ['terribly', 'badly', 'not bad', 'good', 'perfect'][5 - stars]
                }
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </div>
          ))}
        </div>

        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
        >
        </textarea>

        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe your stay
            with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
