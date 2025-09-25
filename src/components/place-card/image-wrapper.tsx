import {PlaceCardType} from "./cart-type.ts";

type ImageWrapperProps = {
  type: PlaceCardType;
  imageSource: string;
};

export function ImageWrapper({ type, imageSource }: ImageWrapperProps) {
  return (
    <div className={`${PlaceCardType.ToImageWrapperType(type)} place-card__image-wrapper`}>
      <a href="#">
        <img
          className="place-card__image"
          src={imageSource}
          width={PlaceCardType.ToImageWidth(type)}
          height={PlaceCardType.ToImageHight(type)}
          alt="Place image"
        />
      </a>
    </div>
  );
}
