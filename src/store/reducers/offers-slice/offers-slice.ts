import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offers} from '../../../types/offer.ts';
import {toggleFavorite} from '../../api-actions.ts';


type OffersState = {
  offers: Offers;
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  offers: [],
  isOffersLoading: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<Offers>) {
      state.offers = action.payload;
    },
    setOffersLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isOffersLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      const updated = action.payload;

      state.offers = state.offers.map((o) =>
        o.id === updated.id ? updated : o
      );
    });
  },
});

export const {setOffers, setOffersLoadingStatus} = offersSlice.actions;
