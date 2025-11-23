import {ReviewsList} from './reviews-list.tsx';
import {ReviewsForm} from '../forms/review/review-form.tsx';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect} from 'react';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {fetchReviews, postReview} from '../../store/api-actions.ts';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {Link} from 'react-router-dom';

export type OfferReviewsProps = {
  offerId: string;
}

export function OfferReviews({offerId}: OfferReviewsProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchReviews({id: offerId}));
  }, [dispatch, offerId]);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const reviews = useAppSelector((state) => state.reviews);

  return (
    <section className="offer__reviews reviews">
      <ReviewsList reviews={reviews}/>
      {authorizationStatus === AuthorizationStatus.Auth ? (<ReviewsForm onSubmit={({ rating, comment }) => void dispatch(postReview({ info: {rating, comment}, id: offerId }))}/>
      ) : (
        <p className="reviews__info">
          <Link to={AppRoute.Login}>Войдите</Link>, чтобы оставить отзыв
        </p>
      )}
    </section>
  );
}
