import {PlaceCard, PlaceCardType} from '../../components/place-card';
import {Offer, Offers} from '../../types/offer.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../components/consts.ts';
import {useState} from 'react';
import {useToggleBookmark} from '../../hooks.ts';
import {useSearchParams} from 'react-router-dom';

type MainScreenProps = {
  offers: Offers;
};

export function MainScreen({offers}: MainScreenProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCity = searchParams.get('city') ?? 'Paris';

  const [items, setItems] = useState<Offers>(offers);
  const [, setActiveOfferId] = useState<Offer | null>(null);
  const { isPending, toggle } = useToggleBookmark();

  const handleToggleBookmark = (id: string, next: boolean) =>
    void toggle(id, next, (changedId, changedVal) => {
      setItems((prev) => prev.map((o) => (o.id === changedId ? { ...o, isFavorite: changedVal } : o)));
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
              <li className="locations__item" key={cityName} onClick={() => setSearchParams({ city: cityName })}>
                <Link
                  className={`locations__item-link tabs__item ${cityName === activeCity ? 'tabs__item--active' : ''}`}
                  to={AppRoute.Main}
                >
                  <span>{cityName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {filteredOffers.length} places to stay in {activeCity}
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li
                  className="places__option places__option--active"
                  tabIndex={0}
                >
                  Popular
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              {filteredOffers.map((place) => (
                <div
                  key={place.id}
                  onMouseEnter={() => setActiveOfferId(place)}
                  onMouseLeave={() => setActiveOfferId(null)}
                >
                  <PlaceCard
                    innerType={PlaceCardType.Main}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarkPending={isPending(place.id)}
                    {...place}
                  />
                </div>
              ))}
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  );
}
