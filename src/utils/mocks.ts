import {datatype, random, lorem, address, image, internet, name} from 'faker';
import {City, Location, Offer, OfferDetailed, Offers, UserInfo, UserInfoFull} from '../types';

const OFFER_TYPES = ['apartment', 'room', 'house', 'hotel'] as const;

const createFakeLocation = (overrides: Partial<Location> = {}): Location => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: datatype.number({ min: 1, max: 20 }),
  ...overrides,
});

const createFakeCity = (overrides: Partial<City> = {}): City => ({
  name: address.city(),
  location: createFakeLocation(),
  ...overrides,
});

export const createFakeOffer = (overrides: Partial<Offer> = {}): Offer => ({
  id: datatype.uuid(),
  title: lorem.sentence(),
  type: random.arrayElement(OFFER_TYPES),
  price: datatype.number({ min: 50, max: 500 }),
  city: createFakeCity(),
  location: createFakeLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: Number((Math.random() * 4 + 1).toFixed(1)),
  previewImage: image.imageUrl(),
  ...overrides,
});

export const createFakeOffers = (count = 3, overrides: Partial<Offer> = {}): Offers =>
  Array.from({ length: count }, () => createFakeOffer(overrides));

export const createFakeUserInfo = (overrides: Partial<UserInfo> = {}): UserInfo => ({
  email: internet.email(),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
  ...overrides,
});

export const createFakeUserInfoFull = (
  overrides: Partial<UserInfoFull> = {}
): UserInfoFull => ({
  name: name.findName(),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
  email: internet.email(),
  token: datatype.uuid(),
  ...overrides,
});

export const createFakeOfferDetailed = (
  overrides: Partial<OfferDetailed> = {}
): OfferDetailed => {
  const { ...base } = createFakeOffer();

  return {
    ...(base as Omit<Offer, 'previewImage'>),
    description: lorem.paragraph(),
    bedrooms: datatype.number({ min: 1, max: 5 }),
    goods: Array.from({ length: datatype.number({ min: 1, max: 5 }) }, () => lorem.word()),
    host: {
      name: name.findName(),
      avatarUrl: image.avatar(),
      isPro: datatype.boolean(),
    },
    images: Array.from({ length: datatype.number({ min: 1, max: 5 }) }, () => image.imageUrl()),
    maxAdults: datatype.number({ min: 1, max: 10 }),
    ...overrides,
  } as OfferDetailed;
};
