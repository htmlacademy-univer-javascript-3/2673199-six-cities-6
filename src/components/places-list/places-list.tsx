import { PlaceCard, PlaceCardType } from '../place-card';
import { Offer, Offers } from '../../types/offer.ts';
import {ToListType} from '../place-card/card-type.ts';
import {useFavorite} from '../../hooks/use-favorites.ts';


type PlacesListProps = {
  offers: Offers;
  type: PlaceCardType;
  onHover: ((offer: Offer | null) => void) | null;
};

export function PlacesList({ offers, type, onHover }: PlacesListProps) {
  const {onToggleBookmark, isBookmarkPending} = useFavorite();

  return (
    <div className={ToListType(type)}>
      {offers.map((place) =>
        onHover ? (
          <div
            key={place.id}
            onMouseEnter={() => onHover(place)}
            onMouseLeave={() => onHover(null)}
          >
            <PlaceCard
              innerType={type}
              onToggleBookmark={() => void onToggleBookmark(place.id, !place.isFavorite)}
              isBookmarkPending={isBookmarkPending(place.id)}
              {...place}
            />
          </div>
        ) : (
          <PlaceCard
            key={place.id}
            innerType={type}
            onToggleBookmark={() => void onToggleBookmark(place.id, !place.isFavorite)}
            isBookmarkPending={isBookmarkPending(place.id)}
            {...place}
          />
        )
      )}
    </div>
  );
}

