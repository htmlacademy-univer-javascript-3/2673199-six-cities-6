import {Offer, Offers} from '../../types/offer.ts';
import {PlacesList} from '../places-list/places-list.tsx';
import {Map} from '../map/map.tsx';
import {PlaceCardType} from '../place-card';
import {EmptyState} from "../empty-state/empty-state.tsx";
import {emptyStates} from "../consts.ts";

type CityPlacesProps = {
  activeCity: string;
  offers: Offers;
  activeOffer: Offer | null;
  onHover: (offer: Offer | null) => void;
  onToggleBookmark: (id: string, next: boolean) => void;
  isBookmarkPending: (id: string) => boolean;
};

export function CityPlaces({ activeCity, offers, activeOffer, onHover, onToggleBookmark, isBookmarkPending }: CityPlacesProps) {
  if (offers.length === 0) {
    return (
      <div className="cities__places-container cities__places-container--empty container">
        <EmptyState {...emptyStates.cities(activeCity)} />
        <div className="cities__right-section"></div>
      </div>
    );
  }

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <b className="places__found">
          {offers.length} places to stay in {activeCity}
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
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>

        <PlacesList
          offers={offers}
          type={PlaceCardType.Main}
          onHover={onHover}
          onToggleBookmark={onToggleBookmark}
          isBookmarkPending={isBookmarkPending}
        />
      </section>
      <div className="cities__right-section">
        <Map offers={offers} activeOfferId={activeOffer?.id ?? null} className="cities__map map"/>
      </div>
    </div>
  );
}
