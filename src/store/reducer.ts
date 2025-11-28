import {Offers} from '../types/offer.ts';
import {createReducer} from '@reduxjs/toolkit';
import {
  requireAuthorization,
  setActiveCity,
  setActiveSortingType,
  setError, setFavorites,
  setOffers, setOffersLoadingStatus, setUser,
} from './action.ts';
import {AuthorizationStatus, SortingType} from '../consts.ts';
import {UserInfo} from '../types/user.ts';
import {toggleFavorite} from './api-actions.ts';

type StoreState = {
  activeCity: string;
  activeSortingType: SortingType;
  offers: Offers;
  isOffersLoading: boolean;
  favoriteOffers: Offers;
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
    .addCase(setActiveSortingType, (state, action) => {
      state.activeSortingType = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.errors = action.payload;
    })
    .addCase(toggleFavorite.fulfilled, (state, action) => {
      const updatedOffer = action.payload;
      state.offers = state.offers.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      );

      if (updatedOffer.isFavorite) {
        const exists = state.favoriteOffers.some((o) => o.id === updatedOffer.id);
        state.favoriteOffers = exists
          ? state.favoriteOffers.map((o) =>
            o.id === updatedOffer.id ? updatedOffer : o
          )
          : [...state.favoriteOffers, updatedOffer];
      } else {
        state.favoriteOffers = state.favoriteOffers.filter(
          (o) => o.id !== updatedOffer.id,
        );
      }
    });
});
