import {Offer, Offers} from '../../types';
import {PlacesListMemo} from '../places-list/places-list.tsx';
import {Map} from '../map/map.tsx';
import {PlaceCardType} from '../place-card';
import {EmptyState} from '../empty-state/empty-state.tsx';
import {EmptyStates} from '../../consts.ts';
import {SortingOptionsMemo} from '../sorting-options/sorting-options.tsx';
import {ScrollToTop} from '../../utils';
import {useState} from 'react';

type CityPlacesProps = {
  activeCity: string;
  offers: Offers;
};

export function CityPlaces({ activeCity, offers }: CityPlacesProps) {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  if (offers.length === 0) {
    return (
      <>
        <ScrollToTop
          deps={[activeCity]}
          getTarget={() =>
            document.querySelector(
              '.cities__places'
            )}
        />
        <div className="cities__places-container cities__places-container--empty container">
          <EmptyState {...EmptyStates.Cities(activeCity)} />
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
          getTarget={() =>
            document.querySelector(
              '.cities__places'
            )}
        />
        <section className="cities__places places">
          <b className="places__found">
            {offers.length} places to stay in {activeCity}
          </b>
          <SortingOptionsMemo/>
          <PlacesListMemo
            offers={offers}
            type={PlaceCardType.Main}
            onHover={setActiveOffer}
          />
        </section>
        <div className="cities__right-section">
          <Map offers={offers} activeOfferId={activeOffer?.id ?? null} className="cities__map map"/>
        </div>
      </div>
    </div>
  );
}
