import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SortingType} from '../../../consts.ts';

type CityState = {
  activeCity: string;
  activeSortingType: SortingType;
};

const initialState: CityState = {
  activeCity: 'Paris',
  activeSortingType: SortingType.Popular,
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<string>) {
      state.activeCity = action.payload;
    },
    setActiveSortingType(state, action: PayloadAction<SortingType>) {
      state.activeSortingType = action.payload;
    },
  },
});

export const {setActiveCity, setActiveSortingType} = citySlice.actions;
