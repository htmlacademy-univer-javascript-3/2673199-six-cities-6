import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {useNavigate} from 'react-router-dom';
import {memo, MouseEvent} from 'react';

type BookmarkButtonProps = {
  isActive?: boolean;
  onToggle: () => void;
  pending?: boolean;
};

type BookmarkButtonPropsBase = BookmarkButtonProps & {
  className: string;
  iconClassName: string;
  iconWidth: number;
  iconHeight: number;
  spinnerLabel?: string;
};


function BookmarkButton({
  isActive,
  onToggle,
  pending,
  className,
  iconClassName,
  iconWidth,
  iconHeight,
  spinnerLabel = 'Loading…',
}: BookmarkButtonPropsBase) {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    onToggle();
  };
  const buttonClass = isActive ? `${className} ${className}--active button` : `${className} button`;

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={pending}
      type="button"
    >
      {pending ? (
        <span className={`${className}__spinner`} aria-label={spinnerLabel}>
          ⏳
        </span>
      ) : (
        <svg className={iconClassName} width={iconWidth} height={iconHeight}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
      )}
      <span className="visually-hidden">{isActive ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

const BookmarkButtonMemo = memo(BookmarkButton);

function PlaceCardBookmarkButton(props: Omit<BookmarkButtonProps, 'className' | 'iconClassName' | 'iconWidth' | 'iconHeight'>) {
  return (
    <BookmarkButtonMemo
      {...props}
      className="place-card__bookmark-button"
      iconClassName="place-card__bookmark-icon"
      iconWidth={18}
      iconHeight={19}
    />
  );
}

export const PlaceCardBookmarkButtonMemo = memo(PlaceCardBookmarkButton);

function OfferBookmarkButton(props: Omit<BookmarkButtonProps, 'className' | 'iconClassName' | 'iconWidth' | 'iconHeight'>) {
  return (
    <BookmarkButtonMemo
      {...props}
      className="offer__bookmark-button"
      iconClassName="offer__bookmark-icon"
      iconWidth={31}
      iconHeight={33}
    />
  );
}

export const OfferBookmarkButtonMemo = memo(OfferBookmarkButton);
