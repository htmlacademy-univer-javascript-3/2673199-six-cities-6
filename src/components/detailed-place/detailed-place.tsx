import {OfferReviewsMemo} from '../reviews';
import {OfferDetailed} from '../../types';
import {useFavorite} from '../../hooks';
import {useAppSelector} from '../../hooks';
import {Mark} from '../mark/mark.tsx';
import {Price} from '../price/price.tsx';
import {Rating} from '../rating/rating.tsx';
import {useCallback} from 'react';
import {OfferBookmarkButtonMemo} from '../bookmark-button/bookmark-button.tsx';

type OfferFeatureProps = {
  classNamePart: string;
  prefix?: string;
  count?: number;
  postfix: string;
};

function OfferFeature({ classNamePart, prefix, count, postfix }: OfferFeatureProps) {
  const className = `offer__feature offer__feature--${classNamePart}`;
  let pluralLabel = postfix;
  if (count) {
    pluralLabel = count === 1 ? postfix : `${postfix}s`;
  }

  const parts = [
    prefix ? prefix : null,
    count ? count.toString() : null,
    pluralLabel
  ].filter(Boolean);

  return <li className={className}>{parts.join(' ')}</li>;
}


type DetailedPlaceProps = {
  detailOffer: OfferDetailed;
};

export function DetailedPlace({ detailOffer}: DetailedPlaceProps) {
  const {onToggleBookmark, isBookmarkPending} = useFavorite();
  const offerFromStore = useAppSelector((state) =>
    state.offers.offers.find((offer) => offer.id === detailOffer.id)
  );
  const isFavorite = offerFromStore?.isFavorite ?? detailOffer.isFavorite;
  const handleToggleBookmark = useCallback(
    () => void onToggleBookmark(detailOffer.id, !isFavorite),
    [onToggleBookmark, detailOffer.id, isFavorite]
  );

  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        <Mark isPremium={detailOffer.isPremium} className="offer__mark"/>
        <div className="offer__name-wrapper">
          <h1 className="offer__name">{detailOffer.title}</h1>
          <OfferBookmarkButtonMemo
            isActive={isFavorite}
            onToggle={handleToggleBookmark}
            pending={isBookmarkPending(detailOffer.id)}
          />
        </div>
        <Rating rating={detailOffer.rating} className="offer" showValue/>
        <ul className="offer__features">
          <OfferFeature classNamePart="entire" postfix={detailOffer.type} />
          <OfferFeature classNamePart="bedrooms" count={detailOffer.bedrooms} postfix="bedroom" />
          <OfferFeature classNamePart="adults" prefix="Max" count={detailOffer.maxAdults} postfix="adult" />
        </ul>
        <Price price={detailOffer.price} className="offer__price"/>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <ul className="offer__inside-list">
            {detailOffer.goods.map((good) => (
              <li className="offer__inside-item" key={good}>{good}</li>
            ))}
          </ul>
        </div>
        <div className="offer__host">
          <h2 className="offer__host-title">Meet the host</h2>
          <div className="offer__host-user user">
            <div
              className={`offer__avatar-wrapper user__avatar-wrapper ${
                detailOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''
              }`}
            >
              <img
                className="offer__avatar user__avatar"
                src={detailOffer.host.avatarUrl}
                width="74"
                height="74"
                alt="Host avatar"
              />
            </div>
            <span className="offer__user-name">{detailOffer.host.name}</span>
            {detailOffer.host.isPro && <span className="offer__user-status">Pro</span>}
          </div>
          <div className="offer__description">
            <p className="offer__text">{detailOffer.description}</p>
          </div>
        </div>
        <OfferReviewsMemo offerId={detailOffer.id}/>
      </div>
    </div>
  );
}
