import {PlaceCardType, ToImageHight, ToImageWidth, ToImageWrapperType} from './card-type.ts';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';

type ImageWrapperProps = {
  offerId: string;
  type: PlaceCardType;
  imageSource: string;
};

export function ImageWrapper({ offerId, type, imageSource}: ImageWrapperProps) {
  return (
    <div className={`${ToImageWrapperType(type)} place-card__image-wrapper`}>
      <Link to={generatePath(AppRoute.Offer, { id: String(offerId) })}>
        <img
          className="place-card__image"
          src={imageSource}
          width={ToImageWidth(type)}
          height={ToImageHight(type)}
          alt="Place image"
        />
      </Link>
    </div>
  );
}
