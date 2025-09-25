type LogoLinkProps = {
  src: string;
};

export function LogoLink({ src }: LogoLinkProps) {
  return (
    <a className="header__logo-link header__logo-link--active" href="#">
      <img
        className="header__logo"
        src={src}
        alt="6 cities logo"
        width={81}
        height={41}
      />
    </a>
  );
}
