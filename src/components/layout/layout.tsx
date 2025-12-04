import {Outlet, useLocation} from 'react-router-dom';
import {UserHeader, UserHeaderProps} from './user-header.tsx';
import {LogoLinkMemo} from './logo-link.tsx';
import {ReactNode} from 'react';
import {AppRoute} from '../../consts.ts';

type LayoutBaseProps = {
  headerContent?: ReactNode;
};


function getPageClassName(pathname: string): string {
  switch (pathname) {
    case AppRoute.Main:
      return 'page page--gray page--main';
    case AppRoute.Login:
      return 'page page--gray page--login';
    default:
      return 'page';
  }
}

function LayoutBase({headerContent}: LayoutBaseProps) {
  const location = useLocation();
  const pageClassName = getPageClassName(location.pathname);

  return (
    <div className={pageClassName}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            {headerContent}
          </div>
        </div>
      </header>

      <Outlet/>
    </div>
  );
}

export function Layout() {
  return (
    <LayoutBase
      headerContent={<LogoLinkMemo src="/img/logo.svg" />}
    />
  );
}

export function LayoutWithUser({authState}: UserHeaderProps) {
  return (
    <LayoutBase
      headerContent={<UserHeader authState={authState}/>}
    />
  );
}
