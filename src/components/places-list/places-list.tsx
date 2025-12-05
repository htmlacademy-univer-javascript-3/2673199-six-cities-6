import { PlaceCardType } from '../place-card';
import { Offer, Offers } from '../../types/offer.ts';
import {ToListType} from '../place-card/card-type.ts';
import {useFavorite} from '../../hooks/use-favorites.ts';
import {PlaceCardMemo} from '../place-card/place-card.tsx';
import {memo, useCallback} from 'react';


type PlacesListProps = {
  offers: Offers;
  type: PlaceCardType;
  onHover?: ((offer: Offer | null) => void) | null;
};

export function PlacesList({ offers, type, onHover }: PlacesListProps) {
  const {onToggleBookmark, isBookmarkPending} = useFavorite();
  const handleToggleBookmark = useCallback(
    (id: string, isFavorite: boolean) => {
      void onToggleBookmark(id, !isFavorite);
    },
    [onToggleBookmark]
  );

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
              onToggleBookmark={handleToggleBookmark}
              isBookmarkPending={isBookmarkPending(place.id)}
              {...place}
            />
          </div>
        ) : (
          <PlaceCardMemo
            key={place.id}
            innerType={type}
            onToggleBookmark={handleToggleBookmark}
            isBookmarkPending={isBookmarkPending(place.id)}
            {...place}
          />
        )
      )}
    </div>
  );
}

export const PlacesListMemo = memo(PlacesList);
