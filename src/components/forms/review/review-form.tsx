import {FormEvent, Fragment, useState} from 'react';
import {MAX_REVIEW_LEN, MIN_REVIEW_LEN} from '../../consts.ts';


export function ReviewsForm() {
  const [form, setForm] = useState({ rating: 0, comment: '' });

  const isValid = form.rating > 0
    && form.comment.trim().length >= MIN_REVIEW_LEN
    && form.comment.trim().length <= MAX_REVIEW_LEN;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    setForm({ rating: 0, comment: '' });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
          Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((stars) => (
          <Fragment key={stars}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={stars}
              id={`${stars}-stars`}
              checked={form.rating === stars}
              onChange={(e) => setForm((prev) => ({ ...prev, rating: +e.target.value }))}
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
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={form.comment}
        onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
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
          disabled={!isValid}
        >
            Submit
        </button>
      </div>
    </form>
  );
}
