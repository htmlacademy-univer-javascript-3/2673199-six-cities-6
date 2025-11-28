import {Price} from './price.tsx';
import {Rating} from './rating.tsx';
import {PlaceCardBookmarkButton} from './bookmark-button.tsx';
import {PlaceTitle} from './place-title.tsx';
import {ImageWrapper} from './image-wrapper.tsx';
import {Mark} from './mark.tsx';
import {PlaceCardType, ToArticleType} from './card-type.ts';
import {Offer} from '../../types/offer.ts';

export type OfferProps = {
  innerType: PlaceCardType;
  onToggleBookmark: (id: string, next: boolean) => void;
  isBookmarkPending?: boolean;
} & Offer;

export function PlaceCard(offerProps: OfferProps) {
  return (
    <article className={`${ToArticleType(offerProps.innerType)} place-card`}>
      <Mark isPremium={offerProps.isPremium}/>
      <ImageWrapper
        imageSource={offerProps.previewImage}
        type={offerProps.innerType}
      />
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <Price price={offerProps.price} />
          <PlaceCardBookmarkButton
            isActive={offerProps.isFavorite}
            pending={offerProps.isBookmarkPending}
            onToggle={() => void offerProps.onToggleBookmark(offerProps.id, !offerProps.isFavorite)}
          />
        </div>
        <Rating rating={offerProps.rating} />
        <PlaceTitle
          placeName={offerProps.title}
          placeType={offerProps.type}
          id={offerProps.id}
        />
      </div>
    </article>
  );
}
