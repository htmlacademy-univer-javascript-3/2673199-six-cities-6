import {describe, it, expect, beforeEach, vi} from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services';
import {APIRoute, AuthorizationStatus, SortingType} from '../consts';
import {
  fetchOffers,
  fetchFavoritesOffers,
  fetchNears,
  toggleFavorite,
  checkAuthAction,
  loginAction,
  logoutAction,
} from './api-actions';
import {redirectToRoute} from './action';
import {setOffers, setOffersLoadingStatus} from './reducers/offers-slice/offers-slice';
import {setFavorites} from './reducers/favorites-slice/favorites-slice';
import {requireAuthorization, setUser} from './reducers/user-slice/user-slice';
import type {State} from '../types';
import * as tokenStorage from '../services';
import {
  createFakeOffer,
  createFakeOfferDetailed,
  createFakeOffers,
  createFakeUserInfo,
  expectSubsequence
} from '../utils';
import {createFakeUserInfoFull} from '../utils/mocks.ts';
import {AppThunkDispatch, extractActionsTypes} from '../utils/comparing.ts';

function findByType<T extends Action<string>>(
  actions: Action<string>[],
  type: string
): T | undefined {
  return actions.find((a): a is T => a.type === type);
}

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  const baseState: State = {
    city: { activeCity: 'Paris', activeSortingType: SortingType.Popular },
    offers: { offers: [], isOffersLoading: false },
    favorites: { favoriteOffers: [] },
    user: { authorizationStatus: AuthorizationStatus.Unknown, user: null },
  };

  beforeEach(() => {
    store = mockStoreCreator({
      ...baseState,
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
    });
    mockAxiosAdapter.reset();
    vi.clearAllMocks();
  });


  describe('fetchOffers', () => {
    it('should dispatch "fetchOffers", "setOffersLoadingStatus" x2, "setOffers" when server responses 200', async () => {
      const offers = createFakeOffers(2);
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, offers);

      await store.dispatch(fetchOffers());
      const types = extractActionsTypes(store.getActions());

      expect(types).toEqual([
        fetchOffers.pending.type,
        setOffersLoadingStatus.type,
        setOffersLoadingStatus.type,
        setOffers.type,
        fetchOffers.fulfilled.type,
      ]);
      const setOffersAction = findByType<ReturnType<typeof setOffers>>(store.getActions(), setOffers.type);
      expect(setOffersAction).toBeDefined();
      expect(setOffersAction!.payload).toEqual(offers);
    });

    it('should dispatch "fetchOffers", "setOffersLoadingStatus" when server responses 404', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(404);

      await store.dispatch(fetchOffers());
      const types = extractActionsTypes(store.getActions());

      expect(types).toEqual([
        fetchOffers.pending.type,
        setOffersLoadingStatus.type,
        fetchOffers.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesOffers', () => {
    it('should dispatch "setFavorites" when server responses 200', async () => {
      store = mockStoreCreator({
        ...baseState,
        user: { authorizationStatus: AuthorizationStatus.Auth, user: createFakeUserInfo() },
      });
      const favs = createFakeOffers(2);

      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, favs);

      await store.dispatch(fetchFavoritesOffers());

      const setOffersAction = findByType<ReturnType<typeof setFavorites>>(store.getActions(), setFavorites.type);
      expect(setOffersAction).toBeDefined();
      expect(setOffersAction!.payload).toEqual(favs);
    });

    it('should reject when server responses 404', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(404);

      const res = await store.dispatch(fetchFavoritesOffers());
      expect(res.type).toBe(fetchFavoritesOffers.rejected.type);
    });

    it('should reject when server responses 403', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(403);

      const res = await store.dispatch(fetchFavoritesOffers());
      expect(res.type).toBe(fetchFavoritesOffers.rejected.type);
    });
  });

  describe('fetchNears', () => {
    it('should dispatch "fetchNears", "setOffers" when server responses 200', async () => {
      const id = 'id-1';
      const nears = createFakeOffers(2);

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}/nearby`).reply(200, nears);

      await store.dispatch(fetchNears({ id }));
      const actions = store.getActions();
      const types = extractActionsTypes(actions);

      expect(types).toEqual([
        fetchNears.pending.type,
        setOffers.type,
        fetchNears.fulfilled.type,
      ]);
      const setOffersAction = findByType<ReturnType<typeof setOffers>>(store.getActions(), setOffers.type);
      expect(setOffersAction).toBeDefined();
      expect(setOffersAction!.payload).toEqual(nears);
    });

    it('should reject "fetchNears" when server responses 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/nope/nearby`).reply(404);

      const res = await store.dispatch(fetchNears({ id: 'nope' }));
      expect(res.type).toBe(fetchNears.rejected.type);
    });
  });

  describe('toggleFavorite', () => {
    it('should dispatch "toggleFavorite.fulfilled" when server responses 200 (previewImage from state)', async () => {
      store = mockStoreCreator({
        ...baseState,
        user: { authorizationStatus: AuthorizationStatus.Auth, user: null },
      });

      const offerInState = createFakeOffer({
        isFavorite: false,
        previewImage: 'STATE_PREVIEW',
      });
      const detailedFromServer = createFakeOfferDetailed({
        id: offerInState.id,
        isFavorite: true,
        images: ['STATE_PREVIEW'],
      });

      mockAxiosAdapter
        .onPost(`${APIRoute.Favorites}/${offerInState.id}/1`)
        .reply(200, detailedFromServer);

      const res = await store.dispatch(
        toggleFavorite({ id: offerInState.id, next: true })
      );

      expect(res.type).toBe(toggleFavorite.fulfilled.type);

      expect(res.payload).toEqual({
        ...detailedFromServer,
        previewImage: 'STATE_PREVIEW',
      });
    });

    it('should reject "toggleFavorite" when server responses 404', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/nope/1`).reply(404);

      const res = await store.dispatch(toggleFavorite({ id: 'nope', next: true }));
      expect(res.type).toBe(toggleFavorite.rejected.type);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "requireAuthorization", "setUser" when server responses 200', async () => {
      const full = createFakeUserInfoFull({
        email: 'mail@test.com',
        avatarUrl: 'AV',
        isPro: true,
        token: 'TOKEN',
        name: 'NAME',
      });

      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, full);
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, []);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions();

      const requireAction = findByType<ReturnType<typeof requireAuthorization>>(actions, requireAuthorization.type);
      expect(requireAction).toBeDefined();

      const userAction = findByType<ReturnType<typeof setUser>>(actions, setUser.type);
      expect(userAction).toBeDefined();
      expect(userAction!.payload).toEqual({
        avatarUrl: 'AV',
        email: 'mail@test.com',
        isPro: true,
      });
    });

    it('should dispatch "requireAuthorization", "setUser" when server responses 404', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(404);
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, []);

      const res = await store.dispatch(checkAuthAction());
      expect(res.type).toBe(checkAuthAction.fulfilled.type);
      const actions = store.getActions();

      const checkAction = findByType<ReturnType<typeof checkAuthAction.fulfilled>>(actions, checkAuthAction.fulfilled.type);
      expect(checkAction).toBeDefined();

      const requireAction = findByType<ReturnType<typeof requireAuthorization>>(actions, requireAuthorization.type);
      expect(requireAction!.payload).toBe(AuthorizationStatus.NoAuth);

      const userAction = findByType<ReturnType<typeof setUser>>(actions, setUser.type);
      expect(userAction!.payload).toBeNull();
    });
  });

  describe('loginAction', () => {
    it('should call saveToken once with received token when server response 200', async () => {
      const full = createFakeUserInfoFull({
        token: 'TOKEN_123',
        avatarUrl: 'AV',
        isPro: true,
      });
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, full);
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, []);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      const email = 'user@test.com';
      await store.dispatch(loginAction({ email, password: '123456' }));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith('TOKEN_123');

      const types = extractActionsTypes(store.getActions());

      expectSubsequence(types, [
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);

      const userAction = findByType<ReturnType<typeof setUser>>(store.getActions(), setUser.type);
      expect(userAction).toBeDefined();
      expect(userAction!.payload).toEqual({ avatarUrl: 'AV', email, isPro: true });
    });

    it('should be rejected and not call saveToken when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      const res = await store.dispatch(loginAction({ email: 'e', password: 'p' }));

      expect(res.type).toBe(loginAction.rejected.type);
      expect(mockSaveToken).not.toHaveBeenCalled();
    });
  });

  describe('logoutAction', () => {
    it('should call dropToken once when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, []);

      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toHaveBeenCalledTimes(1);

      const types = extractActionsTypes(store.getActions());

      expect(types).toContain(logoutAction.pending.type);
      expect(types).toContain(logoutAction.fulfilled.type);
    });

    it('should be rejected and not call dropToken when server response', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(404);

      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      const res = await store.dispatch(logoutAction());

      expect(res.type).toBe(logoutAction.rejected.type);
      expect(mockDropToken).not.toHaveBeenCalled();
    });
  });
});
