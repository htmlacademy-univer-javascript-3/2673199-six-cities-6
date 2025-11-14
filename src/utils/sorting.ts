import {Offer} from '../types/offer.ts';
import {SortingType} from '../consts.ts';

export function getSortingFunc(sorting: SortingType): (left: Offer, right: Offer) => number {
  switch (sorting) {
    case SortingType.PriceLowToHigh:
      return (left, right) => left.price - right.price;
    case SortingType.PriceHighToLow:
      return (left, right) => right.price - left.price;
    case SortingType.TopRatedFirst:
      return (left, right) => right.rating - left.rating;
    default:
      return () => 0;
  }
}
