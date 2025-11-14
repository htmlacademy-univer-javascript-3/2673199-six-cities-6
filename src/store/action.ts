import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {detailed, nears, offers} from '../mocks/offers.ts';
import {Offer, OfferDetailed, Offers} from '../types/offer.ts';
import {State} from '../types/state.ts';
import {SortingType} from '../consts.ts';


export const setOffers = createAction<Offers>('offers/set');

export const setActiveCity = createAction<string>('city/set_active_city');

export const setDetailOffer = createAction<OfferDetailed>('offers/detail/set');

export const setActiveSortingType = createAction<SortingType>('offers/sorting');

export const loadOffers = createAsyncThunk(
  'offers/load',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return offers;
  }
);

export const loadOffer = createAsyncThunk(
  'offers/detail',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return detailed;
  }
);

export const loadNears = createAsyncThunk(
  'nears/load',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return nears;
  }
);

export const toggleFavorite = createAsyncThunk(
  'offers/toggleFavorite',
  async ({ id, next }: { id: string; next: boolean }, { dispatch, getState }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = getState() as State;

    const updated: Offer[] = state.offers.map((o) =>
      o.id === id ? { ...o, isFavorite: next } : o
    );

    dispatch(setOffers(updated));
    if (state.detailOffer && state.detailOffer.id === id) {
      dispatch(setDetailOffer({ ...state.detailOffer, isFavorite: next }));
    }
    return updated;
  }
);
