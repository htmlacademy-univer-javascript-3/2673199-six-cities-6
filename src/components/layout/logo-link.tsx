import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';

type LogoLinkProps = {
  src: string;
};

export function LogoLink({src}: LogoLinkProps) {
  return (
    <div className="header__left">
      <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
        <img
          className="header__logo"
          src={src}
          alt="6 cities logo"
          width={81}
          height={41}
        />
      </Link>
    </div>
  );
}
