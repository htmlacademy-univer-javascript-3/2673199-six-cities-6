import {Link} from 'react-router-dom';
import {AppRoute} from '../consts.ts';

export type PlaceTitleProps = {
  placeName: string;
  placeType: string;
};

export function PlaceTitle({ placeName, placeType }: PlaceTitleProps) {
  return (
    <>
      <h2 className="place-card__name">
        <Link to={AppRoute.Main}>{placeName}</Link>
      </h2>
      <p className="place-card__type">{placeType}</p>
    </>
  );
}
