import {PlaceCardType} from '../../components/place-card';
import {Offers} from '../../types/offer.ts';
import {AppRoute, emptyStates} from '../../consts.ts';
import {Link} from 'react-router-dom';
import {EmptyState} from '../../components/empty-state/empty-state.tsx';
import {PlacesList} from '../../components/places-list/places-list.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect} from 'react';
import {loadOffers} from '../../store/action.ts';

export function FavoritesScreen() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);

  const items = useAppSelector((state) => state.offers);

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
        {Object.keys(favoriteOffersByCity).length === 0 ?
          <EmptyState {...emptyStates.favorites} /> :
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
                  <PlacesList
                    offers={cityOffers}
                    type={PlaceCardType.Favorite}
                    onHover={null}
                  />
                </li>
              ))}
            </ul>
          </section>}
      </div>
    </main>
  );
}
