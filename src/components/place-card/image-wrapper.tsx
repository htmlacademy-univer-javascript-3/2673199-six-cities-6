import {PlaceCardType, ToImageHight, ToImageWidth, ToImageWrapperType} from './card-type.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';

type ImageWrapperProps = {
  type: PlaceCardType;
  imageSource: string;
};

export function ImageWrapper({ type, imageSource}: ImageWrapperProps) {
  return (
    <div className={`${ToImageWrapperType(type)} place-card__image-wrapper`}>
      <Link to={AppRoute.Main}>
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
