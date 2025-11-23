import {OfferDetailed, Offers} from '../types/offer.ts';
import {createReducer} from '@reduxjs/toolkit';
import {
  requireAuthorization,
  setActiveCity,
  setActiveSortingType,
  setDetailOffer, setError, setFavorites,
  setOffers, setOffersLoadingStatus, setReviews, setUser,
} from './action.ts';
import {AuthorizationStatus, SortingType} from '../consts.ts';
import {Reviews} from '../types/review.ts';
import {UserInfo} from '../types/user.ts';

type StoreState = {
  activeCity: string;
  activeSortingType: SortingType;
  offers: Offers;
  isOffersLoading: boolean;
  favoriteOffers: Offers;
  detailOffer: OfferDetailed | null;
  reviews: Reviews;
  authorizationStatus: AuthorizationStatus;
  user: UserInfo | null;
  errors: string | null;
};

const initialState: StoreState = {
  activeCity: 'Paris',
  activeSortingType: SortingType.Popular,
  offers: [],
  isOffersLoading: false,
  favoriteOffers: [],
  detailOffer: null,
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  errors: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setFavorites, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setDetailOffer, (state, action) => {
      state.detailOffer = action.payload;
    })
    .addCase(setActiveSortingType, (state, action) => {
      state.activeSortingType = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.errors = action.payload;
    });
});
