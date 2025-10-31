import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Offers, Offer } from '../../types/offer.ts';
import { CityPlaces } from '../../components/city-places/city-places.tsx';
import { useToggleBookmark } from '../../hooks.ts';

type MainScreenProps = {
  offers: Offers;
};

export function MainScreen({ offers }: MainScreenProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCity = searchParams.get('city') ?? 'Paris';
  const { isPending, toggle } = useToggleBookmark();

  const [items, setItems] = useState<Offers>(offers);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const handleToggleBookmark = (id: string, next: boolean) =>
    void toggle(id, next, (changedId, changedVal) => {
      setItems((prev) =>
        prev.map((o) => (o.id === changedId ? { ...o, isFavorite: changedVal } : o))
      );
    });

  const cities = Array.from(new Set(offers.map((offer) => offer.city.name)));
  const filteredOffers = items.filter((offer) => offer.city.name === activeCity);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((cityName) => (
              <li
                key={cityName}
                className="locations__item"
                onClick={() => setSearchParams({ city: cityName })}
              >
                <span
                  className={`locations__item-link tabs__item ${
                    cityName === activeCity ? 'tabs__item--active' : ''
                  }`}
                >
                  {cityName}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <CityPlaces
          offers={filteredOffers}
          activeOffer={activeOffer}
          onHover={setActiveOffer}
          onToggleBookmark={handleToggleBookmark}
          isBookmarkPending={isPending}
        />
      </div>
    </main>
  );
}
