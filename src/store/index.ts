import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer.ts';
import {createAPI} from '../services';
import {redirect} from '../middlewares';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
