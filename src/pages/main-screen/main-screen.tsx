import {useCallback, useEffect} from 'react';
import { CityPlaces } from '../../components/city-places/city-places.tsx';
import {useAppSelector} from '../../hooks';
import {useAppDispatch} from '../../hooks';
import {CitiesListMemo} from '../../components/cities-list/cities-list.tsx';
import {getSortingFunc} from '../../utils/sorting.ts';
import {fetchOffers} from '../../store/api-actions.ts';
import {setActiveCity} from '../../store/reducers/city-slice/city-slice.ts';


export function MainScreen() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchOffers();
  }, [dispatch]);

  const activeCity = useAppSelector((state) => state.city.activeCity);
  const items = useAppSelector((state) => state.offers.offers);
  const activeSortingType = useAppSelector((state) => state.city.activeSortingType);

  const filteredOffers = items
    .filter((offer) => offer.city.name === activeCity)
    .sort(getSortingFunc(activeSortingType));

  const handleCityChange = useCallback(
    (city: string) => dispatch(setActiveCity(city)),
    [dispatch]
  );

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesListMemo
        activeCity={activeCity}
        onCityChange={handleCityChange}
      />
      <CityPlaces
        activeCity={activeCity}
        offers={filteredOffers}
      />
    </main>
  );
}
