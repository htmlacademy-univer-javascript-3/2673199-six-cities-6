import {OfferBookmarkButton} from '../place-card';
import {OfferReviewsMemo} from '../reviews/reviews.tsx';
import {OfferDetailed} from '../../types/offer.ts';
import {useFavorite} from '../../hooks/use-favorites.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {MarkMemo} from '../mark/mark.tsx';
import {PriceMemo} from '../price/price.tsx';
import {Rating} from '../rating/rating.tsx';

type DetailedPlaceProps = {
  detailOffer: OfferDetailed;
};

export function DetailedPlace({ detailOffer}: DetailedPlaceProps) {
  const {onToggleBookmark, isBookmarkPending} = useFavorite();
  const offerFromStore = useAppSelector((state) =>
    state.offers.offers.find((offer) => offer.id === detailOffer.id)
  );
  const isFavorite = offerFromStore?.isFavorite ?? detailOffer.isFavorite;

  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        <MarkMemo isPremium={detailOffer.isPremium} className="offer__mark"/>
        <div className="offer__name-wrapper">
          <h1 className="offer__name">{detailOffer.title}</h1>
          <OfferBookmarkButton
            isActive={isFavorite}
            onToggle={() => void onToggleBookmark(detailOffer.id, !isFavorite)}
            pending={isBookmarkPending(detailOffer.id)}
          />
        </div>
        <Rating rating={detailOffer.rating} className="offer" showValue/>
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">{detailOffer.type}</li>
          <li className="offer__feature offer__feature--bedrooms">{detailOffer.bedrooms} Bedrooms</li>
          <li className="offer__feature offer__feature--adults">Max {detailOffer.maxAdults} adults</li>
        </ul>
        <PriceMemo price={detailOffer.price} className="offer__price"/>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <ul className="offer__inside-list">
            {detailOffer.goods.map((good, idx) => (
              <li className="offer__inside-item" key={`Offer ${idx + 1}`}>{good}</li>
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
