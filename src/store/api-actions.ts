import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types';
import {Offer, OfferDetailed, Offers} from '../types';
import {APIRoute, AppRoute, AuthorizationStatus} from '../consts.ts';
import {ThunkApiConfig} from '../services';
import {dropToken, saveToken} from '../services';
import {AuthData, UserInfo, UserInfoFull} from '../types';
import {setOffers, setOffersLoadingStatus} from './reducers/offers-slice/offers-slice.ts';
import {requireAuthorization, setUser} from './reducers/user-slice/user-slice.ts';
import {redirectToRoute} from './action.ts';
import {setFavorites} from './reducers/favorites-slice/favorites-slice.ts';


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
    if (state.user.authorizationStatus !== AuthorizationStatus.Auth){
      dispatch(setFavorites([]));
    }

    const {data} = await api.get<Offers>(APIRoute.Favorites);
    dispatch(setFavorites(data));
  },
);

export const fetchNears = createAsyncThunk<void, {id: string}, ThunkApiConfig>(
  'nears/load',
  async ({id}, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setOffers(data));
  }
);

export const toggleFavorite = createAsyncThunk<Offer, { id: string; next: boolean }, ThunkApiConfig>(
  'offers/toggleFavorite',
  async ({ id, next }, { getState, extra: api }) => {
    const data = await api.post<OfferDetailed>(`${APIRoute.Favorites}/${id}/${+next}`);
    const state = getState();
    const preview = state.offers.offers.find((offer) => offer.id === id)?.previewImage;

    return {...data.data, previewImage: preview ?? data.data.images[0]};
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
