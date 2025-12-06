import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offers} from '../../../types';
import {toggleFavorite} from '../../api-actions.ts';


type FavoritesState = {
  favoriteOffers: Offers;
};

const initialState: FavoritesState = {
  favoriteOffers: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Offers>){
      state.favoriteOffers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      const updatedOffer = action.payload;

      const exists = state.favoriteOffers.some((o) => o.id === updatedOffer.id);

      if (updatedOffer.isFavorite) {
        state.favoriteOffers = exists
          ? state.favoriteOffers.map((o) => (o.id === updatedOffer.id ? updatedOffer : o))
          : [...state.favoriteOffers, updatedOffer];
      } else {
        state.favoriteOffers = state.favoriteOffers.filter(
          (o) => o.id !== updatedOffer.id
        );
      }
    });
  },
});

export const { setFavorites } = favoritesSlice.actions;
