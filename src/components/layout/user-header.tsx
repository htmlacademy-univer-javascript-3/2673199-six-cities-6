import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {LogoLink} from './logo-link.tsx';

export type UserHeaderProps = {
  authState: AuthorizationStatus;
  email: string | undefined;
  favoriteCount: number | undefined;
};

export function UserHeader({authState, email, favoriteCount}: UserHeaderProps) {
  return (
    <>
      <LogoLink src={'/img/logo.svg'}/>

      <nav className="header__nav">
        <ul className="header__nav-list">
          {authState === AuthorizationStatus.Auth && email !== undefined && favoriteCount !== undefined ? (
            <>
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{email}</span>
                  <span className="header__favorite-count">{favoriteCount}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to={AppRoute.Main}>
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
