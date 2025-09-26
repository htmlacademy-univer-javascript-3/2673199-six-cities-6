import {LogoLink} from './logo-link.tsx';
import {UserHeader, UserHeaderProps} from './user-header.tsx';

type HeaderProps = {
  isLoggedIn: boolean;
  userHeaderPrompts?: UserHeaderProps;
};

export function Header({isLoggedIn, userHeaderPrompts}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <LogoLink src={'/img/logo.svg'}/>
          </div>
          {isLoggedIn
            && userHeaderPrompts
            && <UserHeader email={userHeaderPrompts.email} favoriteCount={userHeaderPrompts.favoriteCount}/>}
        </div>
      </div>
    </header>
  );
}
