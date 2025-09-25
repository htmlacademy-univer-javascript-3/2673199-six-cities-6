import {Price} from './price.tsx';
import {Rating} from './rating.tsx';
import {BookmarkButton} from './bookmark-button.tsx';
import {PlaceTitle, PlaceTitleProps} from './place-title.tsx';
import {ImageWrapper} from './image-wrapper.tsx';
import {Mark} from './Mark.tsx';
import {PlaceCardType, ToArticleType} from './cart-type.ts';

export type PlaceCardProps = {
  type: PlaceCardType;
  mark?: string;
  imageSource: string;
  price: number;
  isBookmarked?: boolean;
  rating: number;
  placeTitleProps: PlaceTitleProps;
};

export type PlaceCard = {
  mark?: string;
  imageSource: string;
  price: number;
  isBookmarked?: boolean;
  rating: number;
  placeTitleProps: PlaceTitleProps;
};

export function PlaceCard({
  type,
  mark,
  imageSource,
  price,
  isBookmarked = false,
  rating,
  placeTitleProps,
}: PlaceCardProps) {
  return (
    <article className={`${ToArticleType(type)} place-card`}>
      <Mark contents={mark}/>
      <ImageWrapper imageSource={imageSource} type={type}/>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <Price price={price}/>
          <BookmarkButton isActive={isBookmarked}/>
        </div>
        <Rating rating={rating}/>
        <PlaceTitle
          placeName={placeTitleProps.placeName}
          placeType={placeTitleProps.placeType}
        />
      </div>
    </article>
  );
}
