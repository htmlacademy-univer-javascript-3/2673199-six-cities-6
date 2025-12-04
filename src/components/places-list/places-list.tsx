import { PlaceCardType } from '../place-card';
import { Offer, Offers } from '../../types/offer.ts';
import {ToListType} from '../place-card/card-type.ts';
import {useFavorite} from '../../hooks/use-favorites.ts';
import {PlaceCardMemo} from '../place-card/place-card.tsx';
import {memo} from 'react';


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
            <PlaceCardMemo
              innerType={type}
              onToggleBookmark={() => void onToggleBookmark(place.id, !place.isFavorite)}
              isBookmarkPending={isBookmarkPending(place.id)}
              {...place}
            />
          </div>
        ) : (
          <PlaceCardMemo
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

export const PlacesListMemo = memo(PlacesList);
