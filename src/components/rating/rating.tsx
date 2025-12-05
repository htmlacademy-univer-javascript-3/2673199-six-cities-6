type RatingProps = {
  rating: number;
  className: string;
  showValue: boolean;
};

export function Rating({ rating, className, showValue }: RatingProps) {
  const roundedRating = Math.round(rating);

  return (
    <div className={`${className}__rating rating`}>
      <div className={`${className}__stars rating__stars`}>
        <span style={{ width: `${(roundedRating / 5) * 100}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showValue && <span className={`${className}__rating-value rating__value`}>{rating}</span>}
    </div>
  );
}
