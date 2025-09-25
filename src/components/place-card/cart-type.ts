export enum PlaceCardType {
  Main,
  Favourite,
  Offer
}

export function ToArticleType(type: PlaceCardType): string {
  switch (type) {
    case PlaceCardType.Main: return 'cities__card';
    case PlaceCardType.Favourite: return 'favorites__card';
    case PlaceCardType.Offer: return 'near-places__card';
  }
}

export function ToImageWrapperType(type: PlaceCardType): string {
  switch (type) {
    case PlaceCardType.Main: return 'cities__image-wrapper';
    case PlaceCardType.Favourite: return 'favorites__image-wrapper';
    case PlaceCardType.Offer: return 'near-places__image-wrapper';
  }
}

export function ToImageWidth(type: PlaceCardType): number {
  switch (type) {
    case PlaceCardType.Main: return 260;
    case PlaceCardType.Favourite: return 150;
    case PlaceCardType.Offer: return 260;
  }
}

export function ToImageHight(type: PlaceCardType): number {
  switch (type) {
    case PlaceCardType.Main: return 200;
    case PlaceCardType.Favourite: return 110;
    case PlaceCardType.Offer: return 200;
  }
}

