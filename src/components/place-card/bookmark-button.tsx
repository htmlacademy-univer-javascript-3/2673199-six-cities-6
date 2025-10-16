export type BookmarkButtonProps = {
  isActive?: boolean;
  onToggle: () => void;
  pending?: boolean;
};

export function PlaceCardBookmarkButton({ isActive, onToggle, pending }: BookmarkButtonProps) {
  return (
    <button
      className={
        isActive
          ? 'place-card__bookmark-button place-card__bookmark-button--active button'
          : 'place-card__bookmark-button button'
      }
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
      disabled={pending}
      type="button"
    >
      {pending ? (
        <span className="place-card__bookmark-spinner" aria-label="Loading…">
          ⏳
        </span>
      ) : (
        <svg className="place-card__bookmark-icon" width={18} height={19}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
      )}
      <span className="visually-hidden">{isActive ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export function OfferBookmarkButton({ isActive, onToggle, pending }: BookmarkButtonProps) {
  return (
    <button
      className={
        isActive
          ? 'offer__bookmark-button offer__bookmark-button--active button'
          : 'offer__bookmark-button button'
      }
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
      disabled={pending}
      type="button"
    >
      {pending ? (
        <span className="offer__bookmark-spinner" aria-label="Loading…">
          ⏳
        </span>
      ) : (
        <svg className="offer__bookmark-icon" width={31} height={33}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
      )}
      <span className="visually-hidden">{isActive ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}
