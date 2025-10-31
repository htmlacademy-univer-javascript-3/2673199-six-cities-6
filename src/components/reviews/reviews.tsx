import {Reviews} from "../../types/review.ts";
import {ReviewsList} from "./reviews-list.tsx";
import {ReviewsForm} from "../forms/review/review-form.tsx";

type ReviewsProps = {
  reviews: Reviews;
};

export function OfferReviews({ reviews }: ReviewsProps) {
  return (
    <section className="offer__reviews reviews">
      <ReviewsList reviews={reviews}/>
      <ReviewsForm/>
    </section>
  );
}
