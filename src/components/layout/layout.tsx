import {Outlet} from 'react-router-dom';
import {UserHeader, UserHeaderProps} from './user-header.tsx';
import {LogoLink} from './logo-link.tsx';
import {ReactNode} from 'react';

type LayoutBaseProps = {
  headerContent?: ReactNode;
};

function LayoutBase({headerContent}: LayoutBaseProps) {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            {headerContent}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export function Layout() {
  return (
    <LayoutBase headerContent={<LogoLink src="/img/logo.svg" />} />
  );
}

type layoutUserPrompts = {
  userHeaderPrompts: UserHeaderProps;
};

export function LayoutWithUser({userHeaderPrompts}: layoutUserPrompts) {
  return (
    <LayoutBase
      headerContent={
        <UserHeader
          email={userHeaderPrompts.email}
          favoriteCount={userHeaderPrompts.favoriteCount}
          authState={userHeaderPrompts.authState}
        />
      }
    />
  );
}
