import {PlaceCardType, PlaceCard} from '../../components/place-card';
import {Offers} from '../../types/offer.ts';
import {AppRoute} from '../../components/consts.ts';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useToggleBookmark} from '../../hooks.ts';

type FavoritesScreenProps = {
  offers: Offers;
};

export function FavoritesScreen({offers}: FavoritesScreenProps) {
  const [items, setItems] = useState<Offers>(offers);
  const { isPending, toggle } = useToggleBookmark();
  const handleToggleBookmark = (id: string, next: boolean) =>
    void toggle(id, next, (changedId, changedVal) => {
      setItems((prev) => prev.map((o) => (o.id === changedId ? { ...o, isFavorite: changedVal } : o)));
    });

  const favoriteOffersByCity = items
    .filter((offer) => offer.isFavorite)
    .reduce<Record<string, Offers>>((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {});

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.entries(favoriteOffersByCity).map(([cityName, cityOffers]) => (
              <li className="favorites__locations-items" key={cityName}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link to={`${AppRoute.Main}?city=${encodeURIComponent(cityName)}`} className="locations__item-link">
                      <span>{cityName}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {cityOffers.map((place) => (
                    <PlaceCard
                      key={place.id}
                      innerType={PlaceCardType.Favorite}
                      onToggleBookmark={handleToggleBookmark}
                      isBookmarkPending={isPending(place.id)}
                      {...place}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
