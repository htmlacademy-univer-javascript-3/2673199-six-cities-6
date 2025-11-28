import {Offer, Offers} from '../../types/offer.ts';
import {PlacesList} from '../places-list/places-list.tsx';
import {Map} from '../map/map.tsx';
import {PlaceCardType} from '../place-card';
import {EmptyState} from '../empty-state/empty-state.tsx';
import {emptyStates} from '../../consts.ts';
import {SortingOptions} from '../sorting-options/sorting-options.tsx';
import {ScrollToTop} from '../../utils/scroll-to-top.ts';

type CityPlacesProps = {
  activeCity: string;
  offers: Offers;
  activeOffer: Offer | null;
  onHover: (offer: Offer | null) => void;
};

export function CityPlaces({ activeCity, offers, activeOffer, onHover }: CityPlacesProps) {
  if (offers.length === 0) {
    return (
      <>
        <ScrollToTop
          deps={[activeCity]}
          behavior="smooth"
          getTarget={() =>
            document.querySelector(
              '.cities__places'
            )}
        />
        <div className="cities__places-container cities__places-container--empty container">
          <EmptyState {...emptyStates.cities(activeCity)} />
          <div className="cities__right-section"></div>
        </div>
      </>
    );
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <ScrollToTop
          deps={[activeCity]}
          behavior="smooth"
          getTarget={() =>
            document.querySelector(
              '.cities__places'
            )}
        />
        <section className="cities__places places">
          <b className="places__found">
            {offers.length} places to stay in {activeCity}
          </b>
          <SortingOptions/>
          <PlacesList
            offers={offers}
            type={PlaceCardType.Main}
            onHover={onHover}
          />
        </section>
        <div className="cities__right-section">
          <Map offers={offers} activeOfferId={activeOffer?.id ?? null} className="cities__map map"/>
        </div>
      </div>
    </div>
  );
}
