import {Offers} from '../../types/offer.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';
import {PlacesList} from '../places-list/places-list.tsx';
import {PlaceCardType} from '../place-card';
import {memo} from 'react';

type FavoriteCityBlockProps = {
  cityName: string;
  cityOffers: Offers;
}

function FavoriteCityBlock({ cityName, cityOffers }: FavoriteCityBlockProps) {
  return (
    <li className="favorites__locations-items" key={cityName}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={AppRoute.Main} className="locations__item-link">
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <PlacesList
        offers={cityOffers}
        type={PlaceCardType.Favorite}
      />
    </li>
  );
}

function areEqual(prev: FavoriteCityBlockProps, next: FavoriteCityBlockProps) {
  if (prev.cityName !== next.cityName) {
    return false;
  }

  const prevIds = prev.cityOffers.map((o) => o.id);
  const nextIds = next.cityOffers.map((o) => o.id);
  if (prevIds.length !== nextIds.length) {
    return false;
  }

  for (let i = 0; i < prevIds.length; i++) {
    if (prevIds[i] !== nextIds[i]) {
      return false;
    }
  }

  return true;
}

export const FavoriteCityBlockMemo = memo(FavoriteCityBlock, areEqual);
