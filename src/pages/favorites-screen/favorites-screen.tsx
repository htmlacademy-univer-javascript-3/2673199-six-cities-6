import {Offers} from '../../types/offer.ts';
import {emptyStates} from '../../consts.ts';
import {EmptyState} from '../../components/empty-state/empty-state.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect, useMemo} from 'react';
import {fetchFavoritesOffers} from '../../store/api-actions.ts';
import {FavoriteCityBlockMemo} from '../../components/favorite-city-block/favorite-city-block.tsx';


export function FavoritesScreen() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoritesOffers());
  }, [dispatch]);

  const items = useAppSelector((state) => state.favorites.favoriteOffers);

  const favoriteOffersByCity = useMemo(() => items.reduce<Record<string, Offers>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {}), [items]);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {Object.keys(favoriteOffersByCity).length === 0 ?
          <EmptyState {...emptyStates.favorites} /> :
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoriteOffersByCity).map(([cityName, cityOffers]) => (
                <FavoriteCityBlockMemo cityName={cityName} cityOffers={cityOffers} key={cityName} />
              ))}
            </ul>
          </section>}
      </div>
    </main>
  );
}
