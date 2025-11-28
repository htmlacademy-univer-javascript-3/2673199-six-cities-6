import {ReviewsList} from './reviews-list.tsx';
import {ReviewsForm} from '../forms/review/review-form.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {Link} from 'react-router-dom';
import {useReviews} from '../../hooks/use-reviews.ts';
import {Spinner} from '../spinner/spinner.tsx';

export type OfferReviewsProps = {
  offerId: string;
}

export function OfferReviews({offerId}: OfferReviewsProps) {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const {reviews, isLoading, sendReview } = useReviews(offerId);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="offer__reviews reviews">
      <ReviewsList reviews={reviews}/>
      {authorizationStatus === AuthorizationStatus.Auth ? (<ReviewsForm onSubmit={({ rating, comment }) => void sendReview({rating, comment})}/>
      ) : (
        <p className="reviews__info">
          <Link to={AppRoute.Login}>Войдите</Link>, чтобы оставить отзыв
        </p>
      )}
    </section>
  );
}
