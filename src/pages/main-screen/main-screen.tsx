import {useEffect, useState} from 'react';
import { Offer } from '../../types/offer.ts';
import { CityPlaces } from '../../components/city-places/city-places.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {loadOffers, setActiveCity} from '../../store/action.ts';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {getSortingFunc} from '../../utils/sorting.ts';


export function MainScreen() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);

  const activeCity = useAppSelector((state) => state.activeCity);
  const items = useAppSelector((state) => state.offers);
  const activeSortingType = useAppSelector((state) => state.activeSortingType);

  const filteredOffers = items
    .filter((offer) => offer.city.name === activeCity)
    .sort(getSortingFunc(activeSortingType));

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList
        activeCity={activeCity}
        onCityChange={(city) => dispatch(setActiveCity(city))}
      />
      <div className="cities">
        <CityPlaces
          activeCity={activeCity}
          offers={filteredOffers}
          activeOffer={activeOffer}
          onHover={setActiveOffer}
        />
      </div>
    </main>
  );
}
