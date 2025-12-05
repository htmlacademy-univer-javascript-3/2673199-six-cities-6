import {FormEvent, Fragment, useState} from 'react';
import {ReviewLen} from '../../../consts.ts';
import {useDispatch} from 'react-redux';
import {setError} from '../../../store/reducers/user-slice/user-slice.ts';

export type rating = 0 | 1 | 2 | 3 | 4 | 5;

export type ReviewInfoForm = {
  rating: rating;
  comment: string;
}

export type LoginFormProps = {
  onSubmit: (data: { rating: rating; comment: string }) => Promise<void>;
};

export function ReviewsForm({onSubmit}: LoginFormProps) {
  const [form, setForm] = useState<ReviewInfoForm>({ rating: 0, comment: '' });
  const [pending, setPending] = useState(false);
  const [error, setErrorLocal] = useState<string | null>(null);
  const dispatch = useDispatch();

  const isValid = form.rating > 0
    && form.comment.trim().length >= ReviewLen.Min
    && form.comment.trim().length <= ReviewLen.Max;

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!isValid || pending) {
      return;
    }
    setErrorLocal(null);
    setPending(true);
    (async () => {
      try {
        await onSubmit({ rating: form.rating, comment: form.comment.trim() });
        setForm({ rating: 0, comment: '' });
      } catch {
        dispatch(setError(null));
        setErrorLocal('There was an error submitting the form!');
      } finally {
        setPending(false);
      }
    })();
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
              onChange={(evt) => setForm((prev) => ({ ...prev, rating: +evt.target.value as rating}))}
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
        onChange={(evt) => setForm((prev) => ({ ...prev, comment: evt.target.value }))}
      >
      </textarea>

      {error && <p className="reviews__error">{error}</p>}

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
