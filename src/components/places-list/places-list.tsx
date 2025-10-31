import { PlaceCard, PlaceCardType } from '../place-card';
import { Offer, Offers } from '../../types/offer.ts';
import {ToListType} from "../place-card/card-type.ts";

type PlacesListProps = {
  offers: Offers;
  type: PlaceCardType;
  onHover: (offer: Offer | null) => void;
  onToggleBookmark: (id: string, next: boolean) => void;
  isBookmarkPending: (id: string) => boolean;
};

export function PlacesList({ offers, type, onHover, onToggleBookmark, isBookmarkPending }: PlacesListProps) {
  return (
    <div className={ToListType(type)}>
      {offers.map((place) => (
        <div
          key={place.id}
          onMouseEnter={() => onHover(place)}
          onMouseLeave={() => onHover(null)}
        >
          <PlaceCard
            innerType={type}
            onToggleBookmark={onToggleBookmark}
            isBookmarkPending={isBookmarkPending(place.id)}
            {...place}
          />
        </div>
      ))}
    </div>
  );
}
