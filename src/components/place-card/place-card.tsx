import {PriceMemo} from '../price/price.tsx';
import {Rating} from '../rating/rating.tsx';
import {PlaceCardBookmarkButton} from '../bookmark-button/bookmark-button.tsx';
import {PlaceTitle} from './place-title.tsx';
import {ImageWrapper} from './image-wrapper.tsx';
import {MarkMemo} from '../mark/mark.tsx';
import {PlaceCardType, ToArticleType} from './card-type.ts';
import {Offer} from '../../types/offer.ts';
import {memo} from 'react';

export type OfferProps = {
  innerType: PlaceCardType;
  onToggleBookmark: (id: string, next: boolean) => void;
  isBookmarkPending?: boolean;
} & Offer;

export function PlaceCard(offerProps: OfferProps) {
  return (
    <article className={`${ToArticleType(offerProps.innerType)} place-card`}>
      <MarkMemo isPremium={offerProps.isPremium} className="place-card__mark"/>
      <ImageWrapper
        imageSource={offerProps.previewImage}
        type={offerProps.innerType}
      />
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <PriceMemo price={offerProps.price} className="place-card__price"/>
          <PlaceCardBookmarkButton
            isActive={offerProps.isFavorite}
            pending={offerProps.isBookmarkPending}
            onToggle={() => void offerProps.onToggleBookmark(offerProps.id, !offerProps.isFavorite)}
          />
        </div>
        <Rating rating={offerProps.rating} className="place-card" showValue={false}/>
        <PlaceTitle
          placeName={offerProps.title}
          placeType={offerProps.type}
          id={offerProps.id}
        />
      </div>
    </article>
  );
}

export const PlaceCardMemo = memo(PlaceCard);
