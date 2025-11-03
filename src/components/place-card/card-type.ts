export enum PlaceCardType {
  Main,
  Favorite,
  Offer
}

export function ToListType(type: PlaceCardType): string {
  switch (type) {
    case PlaceCardType.Main: return 'cities__places-list places__list tabs__content';
    case PlaceCardType.Offer: return 'near-places__list places__list';
    default: return 'cities__places-list places__list tabs__content';
  }
}

export function ToArticleType(type: PlaceCardType): string {
  switch (type) {
    case PlaceCardType.Main: return 'cities__card';
    case PlaceCardType.Favorite: return 'favorites__card';
    case PlaceCardType.Offer: return 'near-places__card';
  }
}

export function ToImageWrapperType(type: PlaceCardType): string {
  switch (type) {
    case PlaceCardType.Main: return 'cities__image-wrapper';
    case PlaceCardType.Favorite: return 'favorites__image-wrapper';
    case PlaceCardType.Offer: return 'near-places__image-wrapper';
  }
}

export function ToImageWidth(type: PlaceCardType): number {
  switch (type) {
    case PlaceCardType.Main: return 260;
    case PlaceCardType.Favorite: return 150;
    case PlaceCardType.Offer: return 260;
  }
}

export function ToImageHight(type: PlaceCardType): number {
  switch (type) {
    case PlaceCardType.Main: return 200;
    case PlaceCardType.Favorite: return 110;
    case PlaceCardType.Offer: return 200;
  }
}

