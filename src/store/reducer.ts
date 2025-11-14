import {OfferDetailed, Offers} from "../types/offer.ts";
import {activeCity} from "../mocks/offers.ts";
import {createReducer} from "@reduxjs/toolkit";
import {setActiveCity, loadOffers, toggleFavorite, setOffers, loadOffer, loadNears, setDetailOffer} from "./action.ts";

type StoreState = {
  activeCity: string;
  offers: Offers;
  detailOffer: OfferDetailed | null;
};

const initialState: StoreState = {
  activeCity: activeCity,
  offers: [],
  detailOffer: null,
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
    });
});
