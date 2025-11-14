import { PlaceCard, PlaceCardType } from '../place-card';
import { Offer, Offers } from '../../types/offer.ts';
import {ToListType} from '../place-card/card-type.ts';
import {useAppDispatch} from "../../hooks/use-app-dispatch.ts";
import {toggleFavorite} from "../../store/action.ts";
import {useState} from "react";

type PlacesListProps = {
  offers: Offers;
  type: PlaceCardType;
  onHover: ((offer: Offer | null) => void) | null;
};

export function PlacesList({ offers, type, onHover }: PlacesListProps) {
  const dispatch = useAppDispatch();

  const [pendingId, setPendingId] = useState<string | null>(null);
  const onToggleBookmark = async (id: string, next: boolean) => {
    setPendingId(id);
    try {
      await dispatch(toggleFavorite({ id, next }));
    } finally {
      setPendingId(null);
    }
  };
  const isBookmarkPending = (id: string) => pendingId === id;

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
              onToggleBookmark={onToggleBookmark}
              isBookmarkPending={isBookmarkPending(place.id)}
              {...place}
            />
          </div>
        ) : (
          <PlaceCard
            key={place.id}
            innerType={type}
            onToggleBookmark={onToggleBookmark}
            isBookmarkPending={isBookmarkPending(place.id)}
            {...place}
          />
        )
      )}
    </div>
  );
}

