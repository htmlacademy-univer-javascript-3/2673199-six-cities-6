import {generatePath, Link} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';

export type PlaceTitleProps = {
  placeName: string;
  placeType: string;
  id: string;
};

export function PlaceTitle({ placeName, placeType, id }: PlaceTitleProps) {
  return (
    <>
      <h2 className="place-card__name">
        <Link to={generatePath(`${AppRoute.Offer}`, { id: String(id) })}>{placeName}</Link>
      </h2>
      <p className="place-card__type">{placeType}</p>
    </>
  );
}
