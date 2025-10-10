import {PlaceCard, PlaceCardType} from '../../components/place-card';
import {OfferDetailed, Offers} from '../../models/offer.ts';
import {Reviews} from '../../models/review.ts';
import {ReviewsForm} from '../../components/forms/review/review-form.tsx';

type OfferScreenProps = {
  detailOffer: OfferDetailed;
  nearPlaces: Offers;
  reviews: Reviews;
};

export function OfferScreen({detailOffer, nearPlaces, reviews}: OfferScreenProps) {
  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {detailOffer.images.map((imgUrl, index) => (
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
              <button className={`offer__bookmark-button button ${detailOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
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
            <ReviewsForm reviews={reviews}/>
          </div>
        </div>
        <section className="offer__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            {nearPlaces.map((place) => (
              <PlaceCard key={place.id} {...place} innerType={PlaceCardType.Offer} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
