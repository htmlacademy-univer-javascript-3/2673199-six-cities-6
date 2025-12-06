import {Link} from 'react-router-dom';
import {memo, MouseEvent, useCallback} from 'react';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {useAppDispatch} from '../../hooks';
import {logoutAction} from '../../store/api-actions.ts';
import {useAppSelector} from '../../hooks';
import {setFavorites} from '../../store/reducers/favorites-slice/favorites-slice.ts';
import {setUser} from '../../store/reducers/user-slice/user-slice.ts';
import {setOffers} from '../../store/reducers/offers-slice/offers-slice.ts';

type LogoutProps = {
  onLogout: (evt: MouseEvent<HTMLAnchorElement>) => void;
}

function LogoutNavItem({onLogout}: LogoutProps) {
  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to={AppRoute.Main} onClick={onLogout}>
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
}

type UserNavItemProps = {
  to: string;
  avatarUrl?: string;
  email?: string;
  isPro?: boolean;
  favoriteCount?: number;
  label?: string;
};

function UserNavItem({to, avatarUrl, email, isPro, favoriteCount, label}: UserNavItemProps) {
  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={to}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
          {avatarUrl && <img className="user__avatar" src={avatarUrl} alt={email} />}
        </div>
        {isPro && <span className="header__user-status">Pro</span>}
        {email && <span className="header__user-name user__name">{email}</span>}
        {favoriteCount !== undefined && (
          <span className="header__favorite-count">{favoriteCount}</span>
        )}
        {label && <span className="header__login">{label}</span>}
      </Link>
    </li>
  );
}

const UserNavItemMemo = memo(UserNavItem);

export type UserHeaderProps = {
  authState: AuthorizationStatus;
};

function UserHeader({authState}: UserHeaderProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const favorites = useAppSelector((state) => state.favorites.favoriteOffers);
  const offers = useAppSelector((state) => state.offers.offers);

  const handleLogoutClick = useCallback(
    (evt: MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      dispatch(logoutAction());
      dispatch(setFavorites([]));
      dispatch(setUser(null));
      dispatch(setOffers(offers.map((offer) => ({ ...offer, isFavorite: false }))));
    },
    // зависимость от offers тут не нужна, не нужно пересоздавать функцию каждый раз при изменении offers
    // происходит просто сброс isFavorite в False
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authState === AuthorizationStatus.Auth && user !== null ? (
          <>
            <UserNavItemMemo
              to={AppRoute.Favorites}
              avatarUrl={user.avatarUrl}
              email={user.email}
              isPro={user.isPro}
              favoriteCount={favorites.length}
            />
            <LogoutNavItem onLogout={handleLogoutClick}/>
          </>
        ) : (
          <UserNavItemMemo
            to={AppRoute.Login}
            label="Sign in"
          />
        )}
      </ul>
    </nav>
  );
}

export const UserHeaderMemo = memo(UserHeader);
