import {Price} from './price.tsx';
import {Rating} from './rating.tsx';
import {BookmarkButton} from './bookmark-button.tsx';
import {PlaceTitle} from './place-title.tsx';
import {ImageWrapper} from './image-wrapper.tsx';
import {Mark} from './mark.tsx';
import {PlaceCardType, ToArticleType} from './card-type.ts';
import {Offer} from '../../models/offer.ts';

export type OfferProps = {
  innerType: PlaceCardType;
} & Offer;

export function PlaceCard(offerProps: OfferProps) {
  return (
    <article className={`${ToArticleType(offerProps.innerType)} place-card`}>
      <Mark isPremium={offerProps.isPremium}/>
      <ImageWrapper imageSource={offerProps.previewImage} type={offerProps.innerType}/>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <Price price={offerProps.price} />
          <BookmarkButton isActive={offerProps.isFavorite}/>
        </div>
        <Rating rating={offerProps.rating} />
        <PlaceTitle
          placeName={offerProps.title}
          placeType={offerProps.type}
        />
      </div>
    </article>
  );
}
