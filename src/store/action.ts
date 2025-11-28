import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../consts.ts';

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
