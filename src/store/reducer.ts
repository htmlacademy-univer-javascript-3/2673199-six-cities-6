import {OfferDetailed, Offers} from '../types/offer.ts';
import {activeCity} from '../mocks/offers.ts';
import {createReducer} from '@reduxjs/toolkit';
import {
  loadNears,
  loadOffer,
  loadOffers, loadReviews,
  setActiveCity,
  setActiveSortingType,
  setDetailOffer,
  setOffers,
  toggleFavorite
} from './action.ts';
import {SortingType} from '../consts.ts';
import {Reviews} from '../types/review.ts';

type StoreState = {
  activeCity: string;
  activeSortingType: SortingType;
  offers: Offers;
  detailOffer: OfferDetailed | null;
  reviews: Reviews;
};

const initialState: StoreState = {
  activeCity: activeCity,
  activeSortingType: SortingType.Popular,
  offers: [],
  detailOffer: null,
  reviews: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDetailOffer, (state, action) => {
      state.detailOffer = action.payload;
    })
    .addCase(toggleFavorite.fulfilled, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadNears.fulfilled, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer.fulfilled, (state, action) => {
      state.detailOffer = action.payload;
    })
    .addCase(setActiveSortingType, (state, action) => {
      state.activeSortingType = action.payload;
    })
    .addCase(loadReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
});
