import {Link} from 'react-router-dom';
import {MouseEvent} from 'react';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {LogoLink} from './logo-link.tsx';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {logoutAction} from '../../store/api-actions.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';

export type UserHeaderProps = {
  authState: AuthorizationStatus;
};

export function UserHeader({authState}: UserHeaderProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const favorites = useAppSelector((state) => state.favorites.favoriteOffers);

  const handleLogoutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <>
      <LogoLink src={'/img/logo.svg'}/>

      <nav className="header__nav">
        <ul className="header__nav-list">
          {authState === AuthorizationStatus.Auth && user !== null ? (
            <>
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    {user.avatarUrl && (
                      <img
                        className="user__avatar"
                        src={user.avatarUrl}
                        alt={user.email}
                      />
                    )}
                  </div>
                  {user.isPro && (
                    <span className="header__user-status">Pro</span>
                  )}
                  <span className="header__user-name user__name">{user.email}</span>
                  <span className="header__favorite-count">{favorites.length}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to={AppRoute.Main} onClick={handleLogoutClick}>
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </>
          ) : (
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
