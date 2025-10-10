import {PlaceCardType, PlaceCard} from '../../components/place-card';
import {Offers} from '../../models/offer.ts';
import {AppRoute} from '../../components/consts.ts';
import {Link} from 'react-router-dom';

type FavoritesScreenProps = {
  places: Offers;
};

export function FavoritesScreen({places}: FavoritesScreenProps) {
  const favoritePlacesByCity = places
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
            {Object.entries(favoritePlacesByCity).map(([cityName, cityOffers]) => (
              <li className="favorites__locations-items" key={cityName}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link to={AppRoute.Main} className="locations__item-link">
                      <span>{cityName}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {cityOffers.map((place) => (
                    <PlaceCard
                      key={place.id}
                      innerType={PlaceCardType.Favourite}
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
