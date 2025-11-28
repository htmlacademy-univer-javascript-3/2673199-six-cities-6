import {combineReducers} from '@reduxjs/toolkit';
import {citySlice} from './reducers/city-slice/city-slice.ts';
import {offersSlice} from './reducers/offers-slice/offers-slice.ts';
import {favoritesSlice} from './reducers/favorites-slice/favorites-slice.ts';
import {userSlice} from './reducers/user-slice/user-slice.ts';


export const reducer = combineReducers({
  city: citySlice.reducer,
  offers: offersSlice.reducer,
  favorites: favoritesSlice.reducer,
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;
