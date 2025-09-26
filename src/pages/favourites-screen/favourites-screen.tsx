import {PlaceCardType, PlaceCard} from '../../components/place-card';

type FavoritesScreenProps = {
  places: PlaceCard[];
};

export function FavoritesScreen({places}: FavoritesScreenProps) {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {places.filter((x) => x.isBookmarked).map((place) => (
                  <PlaceCard
                    key={'1'}
                    type={PlaceCardType.Favourite}
                    mark={place.mark}
                    imageSource={place.imageSource}
                    price={place.price}
                    isBookmarked={place.isBookmarked}
                    rating={place.rating}
                    placeTitleProps={place.placeTitleProps}
                  />
                ))}
              </div>
            </li>

            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Cologne</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {places.filter((x) => x.isBookmarked).map((place) => (
                  <PlaceCard
                    key={'1'}
                    type={PlaceCardType.Favourite}
                    mark={place.mark}
                    imageSource={place.imageSource}
                    price={place.price}
                    isBookmarked={place.isBookmarked}
                    rating={place.rating}
                    placeTitleProps={place.placeTitleProps}
                  />))}
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
