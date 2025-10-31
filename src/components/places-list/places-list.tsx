import { PlaceCard, PlaceCardType } from '../place-card';
import { Offer, Offers } from '../../types/offer.ts';

type PlacesListProps = {
  offers: Offers;
  onHover: (offer: Offer | null) => void;
  onToggleBookmark: (id: string, next: boolean) => void;
  isBookmarkPending: (id: string) => boolean;
};

export function PlacesList({ offers, onHover, onToggleBookmark, isBookmarkPending }: PlacesListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((place) => (
        <div
          key={place.id}
          onMouseEnter={() => onHover(place)}
          onMouseLeave={() => onHover(null)}
        >
          <PlaceCard
            innerType={PlaceCardType.Main}
            onToggleBookmark={onToggleBookmark}
            isBookmarkPending={isBookmarkPending(place.id)}
            {...place}
          />
        </div>
      ))}
    </div>
  );
}
