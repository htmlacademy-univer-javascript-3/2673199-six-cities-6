import {createAction} from '@reduxjs/toolkit';
import {OfferDetailed, Offers} from '../types/offer.ts';
import {AppRoute, AuthorizationStatus, SortingType} from '../consts.ts';
import {Reviews} from '../types/review.ts';
import {UserInfo} from '../types/user.ts';


export const setOffers = createAction<Offers>('offers/set');

export const setFavorites = createAction<Offers>('offers/favorites/set');

export const setOffersLoadingStatus = createAction<boolean>('offers/setOffersLoadingStatus');

export const setActiveCity = createAction<string>('city/set_active_city');

export const setDetailOffer = createAction<OfferDetailed>('offers/detail/set');

export const setReviews = createAction<Reviews>('reviews/set');

export const setActiveSortingType = createAction<SortingType>('offers/sorting');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUser = createAction<UserInfo | null>('user/set');

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');

export const setError = createAction<string | null>('errors/set');
