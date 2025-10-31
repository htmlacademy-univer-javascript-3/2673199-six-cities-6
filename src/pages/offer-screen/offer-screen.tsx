import {OfferBookmarkButton, PlaceCardType} from '../../components/place-card';
import {OfferDetailed, Offers} from '../../types/offer.ts';
import {Reviews} from '../../types/review.ts';
import {useToggleBookmark} from '../../hooks.ts';
import {useState} from 'react';
import {OfferReviews} from '../../components/reviews/reviews.tsx';
import { Map } from '../../components/map/map.tsx';
import {PlacesList} from '../../components/places-list/places-list.tsx';

type OfferScreenProps = {
  detailOffer: OfferDetailed;
  nearPlaces: Offers;
  reviews: Reviews;
};

export function OfferScreen({detailOffer, nearPlaces, reviews}: OfferScreenProps) {
  const [items, setItems] = useState<Offers>(nearPlaces);
  const [offer, setOffer] = useState<OfferDetailed>(detailOffer);

  const { isPending, toggle } = useToggleBookmark();
  const handleToggleBookmark = (id: string, next: boolean) =>
    void toggle(id, next, (changedId, changedVal) => {
      setItems((prev) => prev.map((o) => (o.id === changedId ? { ...o, isFavorite: changedVal } : o)));
      setOffer((prev) =>
        prev.id === changedId ? { ...prev, isFavorite: changedVal } : prev
      );
    });

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offer.images.map((imgUrl, index) => (
              <div className="offer__image-wrapper" key={`image wrapper ${index + 1}`}>
                <img className="offer__image" src={imgUrl} alt={`Photo ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {detailOffer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{detailOffer.title}</h1>
              <OfferBookmarkButton
                isActive={offer.isFavorite}
                onToggle={() => void handleToggleBookmark(offer.id, !offer.isFavorite)}
                pending={isPending(offer.id)}
              />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: `${(detailOffer.rating / 5) * 100}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{detailOffer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{detailOffer.type}</li>
              <li className="offer__feature offer__feature--bedrooms">{detailOffer.bedrooms} Bedrooms</li>
              <li className="offer__feature offer__feature--adults">Max {detailOffer.maxAdults} adults</li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{detailOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
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
            <OfferReviews reviews={reviews}/>
          </div>
        </div>
        <Map offers={items} className="offer__map" activeOfferId={null}/>

      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <PlacesList
            offers={items}
            onHover={() => {}}
            onToggleBookmark={handleToggleBookmark}
            isBookmarkPending={isPending}
            type={PlaceCardType.Offer}
          />
        </section>
      </div>
    </main>
  );
}
