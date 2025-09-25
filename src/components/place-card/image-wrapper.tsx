import {PlaceCardType, ToImageHight, ToImageWidth, ToImageWrapperType} from './cart-type.ts';

type ImageWrapperProps = {
  type: PlaceCardType;
  imageSource: string;
};

export function ImageWrapper({ type, imageSource }: ImageWrapperProps) {
  return (
    <div className={`${ToImageWrapperType(type)} place-card__image-wrapper`}>
      <a href="#">
        <img
          className="place-card__image"
          src={imageSource}
          width={ToImageWidth(type)}
          height={ToImageHight(type)}
          alt="Place image"
        />
      </a>
    </div>
  );
}
