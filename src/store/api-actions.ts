import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state.ts';
import {Offer, OfferDetailed, Offers} from '../types/offer.ts';
import {
  redirectToRoute,
  requireAuthorization,
  setDetailOffer,
  setFavorites,
  setOffers,
  setOffersLoadingStatus,
  setReviews,
  setUser
} from './action.ts';
import {APIRoute, AppRoute, AuthorizationStatus} from '../consts.ts';
import {ThunkApiConfig} from '../services/api.ts';
import {Reviews} from '../types/review.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {AuthData, UserInfo, UserInfoFull} from '../types/user.ts';
import {ReviewInfoForm} from '../components/forms/review/review-form.tsx';


export const fetchOffers = createAsyncThunk<void, void, ThunkApiConfig>(
  'offers/load',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
  },
);

export const fetchFavoritesOffers = createAsyncThunk<void, void, ThunkApiConfig>(
  'favorites/load',
  async (_arg, {dispatch, getState, extra: api}) => {
    const state = getState() ;
    if (state.authorizationStatus !== AuthorizationStatus.Auth){
      dispatch(setFavorites([]));
    }

    const {data} = await api.get<Offers>(APIRoute.Favorites);
    dispatch(setFavorites(data));
  },
);

export const fetchOffer = createAsyncThunk<void, {id: string}, ThunkApiConfig>(
  'offers/detail',
  async ({id}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<OfferDetailed>(`${APIRoute.Offers}/${id}`);
      dispatch(setDetailOffer(data));
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const fetchNears = createAsyncThunk<void, {id: string}, ThunkApiConfig>(
  'nears/load',
  async ({id}, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setOffers(data));
  }
);

export const fetchReviews = createAsyncThunk<void, {id: string}, ThunkApiConfig>(
  'reviews/load',
  async ({ id }, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);
    dispatch(setReviews(data));
  }
);

export const postReview = createAsyncThunk<void, {id: string; info: ReviewInfoForm}, ThunkApiConfig>(
  'reviews/load',
  async ({ id, info }, {dispatch, extra: api}) => {
    await api.post<Reviews>(`${APIRoute.Comments}/${id}`, info);
    dispatch(fetchReviews({id}));
  }
);

export const toggleFavorite = createAsyncThunk<void, { id: string; next: boolean }, ThunkApiConfig>(
  'offers/toggleFavorite',
  async ({ id, next }, { dispatch, getState, extra: api }) => {
    await api.post<OfferDetailed>(`${APIRoute.Favorites}/${id}/${+next}`);
    const state = getState() ;

    const updated: Offer[] = state.offers.map((o) =>
      o.id === id ? { ...o, isFavorite: next } : o
    );
    dispatch(setOffers(updated));
    if (state.detailOffer && state.detailOffer.id === id) {
      dispatch(setDetailOffer({ ...state.detailOffer, isFavorite: next }));
    }
    dispatch(fetchFavoritesOffers());
  }
);

export const setAuthData =
  (status: AuthorizationStatus, user: UserInfo | null) =>
    (dispatch: AppDispatch) => {
      dispatch(requireAuthorization(status));
      dispatch(setUser(user));
      dispatch(fetchFavoritesOffers());
    };

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: {avatarUrl, email, isPro}} = await api.get<UserInfoFull>(APIRoute.Login);
      dispatch(setAuthData(AuthorizationStatus.Auth, { avatarUrl, email, isPro }));
    } catch {
      dispatch(setAuthData(AuthorizationStatus.NoAuth, null));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, ThunkApiConfig>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl, isPro}} = await api.post<UserInfoFull>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setAuthData(AuthorizationStatus.Auth, { avatarUrl, email, isPro }));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthData(AuthorizationStatus.NoAuth, null));
  },
);
