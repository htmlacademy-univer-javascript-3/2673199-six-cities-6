import {ReviewsList} from './reviews-list.tsx';
import {ReviewsForm} from '../forms/review/review-form.tsx';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect} from 'react';
import {loadReviews} from '../../store/action.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';

export function OfferReviews() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadReviews());
  }, [dispatch]);

  const reviews = useAppSelector((state) => state.reviews);

  return (
    <section className="offer__reviews reviews">
      <ReviewsList reviews={reviews}/>
      <ReviewsForm/>
    </section>
  );
}
