import {describe, it, expect, beforeEach, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory, type MemoryHistory} from 'history';
import {App} from './app';
import {AppRoute, AuthorizationStatus, CITIES, SortingType} from '../../consts';
import {withHistory, withStore} from '../../utils/mock-components';
import * as hooks from '../../hooks';
import {createFakeOfferDetailed, createFakeOffers} from '../../utils';
import {Offers} from '../../types';


describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  const makeBaseState = (auth: AuthorizationStatus) => ({
    city: { activeCity: 'Paris', activeSortingType: SortingType.Popular },
    offers: { offers: [], isOffersLoading: false },
    favorites: { favoriteOffers: [] },
    user: { authorizationStatus: auth, user: null },
  });

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "AuthScreen" when user navigates to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeBaseState(AuthorizationStatus.NoAuth)
    );

    mockHistory.push(AppRoute.Login);
    render(withStoreComponent);

    const texts = [
      /E-mail/i,
      /Password/i,
    ];
    texts.forEach((t) => expect(screen.getByText(t)).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  describe('Main route', () => {
    it('should render MainScreen when user navigates to "/" and offers exist in store', () => {
      const activeCity = 'Paris';

      const offers = createFakeOffers(3).map((o, idx) => ({
        ...o,
        title: `Offer ${idx + 1}`,
        city: { ...o.city, name: activeCity },
      }));

      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        {
          ...makeBaseState(AuthorizationStatus.Auth),
          city: { activeCity, activeSortingType: SortingType.Popular },
          offers: { offers, isOffersLoading: false },
        }
      );

      mockHistory.push(AppRoute.Main);
      render(withStoreComponent);

      expect(screen.getByText(/\d+ places to stay in/i)).toBeInTheDocument();

      offers.forEach((offer) => {
        expect(screen.getByText(offer.title)).toBeInTheDocument();
      });
    });

    it('should render empty "MainScreen" when user navigates to "/" and no offers', () => {
      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeBaseState(AuthorizationStatus.Auth)
      );

      mockHistory.push(AppRoute.Main);
      render(withStoreComponent);

      const texts = [
        /No places to stay available/i,
        /We could not find any property available at the moment in/i,
      ];
      texts.forEach((t) => expect(screen.getByText(t)).toBeInTheDocument());

      CITIES.forEach((city) => {
        expect(screen.getByText(city)).toBeInTheDocument();
      });
    });
  });

  describe('Favorite route', () => {
    it('should render "FavoritesScreen" when user navigates to "/favorites" and authorized', () => {
      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeBaseState(AuthorizationStatus.Auth)
      );

      mockHistory.push(AppRoute.Favorites);
      render(withStoreComponent);

      const texts = [
        /Favorites/i,
        /Nothing yet saved/i,
        /Save properties to narrow down search or plan your future trips/i,
      ];
      texts.forEach((t) => expect(screen.getByText(t)).toBeInTheDocument());
    });

    it('should redirect to "/login" when user navigates to "/favorites" and not authorized', () => {
      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeBaseState(AuthorizationStatus.NoAuth)
      );

      mockHistory.push(AppRoute.Favorites);
      render(withStoreComponent);

      const texts = [
        /E-mail/i,
        /Password/i,
      ];
      texts.forEach((t) => expect(screen.getByText(t)).toBeInTheDocument());
      expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    });

    it('should render FavoritesScreen with cards when favoriteOffers exist', () => {
      const favoriteOffers = createFakeOffers(2).map((o, idx) => ({
        ...o,
        isFavorite: true,
        title: `Favorite offer ${idx + 1}`,
      }));

      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        {
          ...makeBaseState(AuthorizationStatus.Auth),
          favorites: { favoriteOffers },
        }
      );

      mockHistory.push(AppRoute.Favorites);
      render(withStoreComponent);

      expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
      favoriteOffers.forEach((offer) => {
        expect(screen.getByText(offer.title)).toBeInTheDocument();
      });
    });
  });

  describe('Offer route', () => {
    type UseOfferResult = ReturnType<typeof hooks.useOffer>;
    type UseNearsResult = ReturnType<typeof hooks.useNears>;

    it('should render Spinner when offer is loading', () => {
      vi.spyOn(hooks, 'useOffer').mockReturnValue({ data: null, isLoading: true, error: null } as UseOfferResult);
      vi.spyOn(hooks, 'useNears').mockReturnValue({ data: [] as Offers, isLoading: false, error: null } as UseNearsResult);

      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeBaseState(AuthorizationStatus.Auth)
      );

      mockHistory.push('/offer/123');
      render(withStoreComponent);

      expect(document.querySelector('.spinner')).toBeInTheDocument();
    });

    it('should redirect to 404 when offer hook returns error', () => {
      vi.spyOn(hooks, 'useOffer').mockReturnValue({data: null, isLoading: false, error: 'fail',} as UseOfferResult);
      vi.spyOn(hooks, 'useNears').mockReturnValue({data: [] as Offers, isLoading: false, error: null,} as UseNearsResult);

      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeBaseState(AuthorizationStatus.Auth)
      );

      mockHistory.push('/offer/123');
      render(withStoreComponent);

      expect(screen.getByText(/404|not found/i)).toBeInTheDocument();
    });

    it('should redirect to 404 when nears hook returns error', () => {
      vi.spyOn(hooks, 'useOffer').mockReturnValue({data: createFakeOfferDetailed({ id: '123', images: ['img1'] }), isLoading: false, error: null,} as UseOfferResult);
      vi.spyOn(hooks, 'useNears').mockReturnValue({data: [] as Offers, isLoading: false, error: 'fail',} as UseNearsResult);

      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeBaseState(AuthorizationStatus.Auth)
      );

      mockHistory.push('/offer/123');
      render(withStoreComponent);

      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });

    it('should render OfferScreen when offer and nears loaded', () => {
      const detail = createFakeOfferDetailed({ id: '123', images: ['img1'] });
      const nears = createFakeOffers(2);

      vi.spyOn(hooks, 'useOffer').mockReturnValue({data: detail, isLoading: false, error: null,} as UseOfferResult);
      vi.spyOn(hooks, 'useNears').mockReturnValue({data: nears, isLoading: false, error: null,} as UseNearsResult);

      const state = {
        ...makeBaseState(AuthorizationStatus.Auth),
        offers: { offers: nears, isOffersLoading: false },
      };

      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(withHistoryComponent, state);

      mockHistory.push('/offer/123');
      render(withStoreComponent);

      expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    });
  });

  describe('Not found routes', () => {
    it('should render "NotFoundScreen" when user navigates to non-existent route', () => {
      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeBaseState(AuthorizationStatus.Auth)
      );

      mockHistory.push('/unknown-route');
      render(withStoreComponent);

      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });

    it('should render "NotFoundScreen" when user navigates to not-found route', () => {
      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeBaseState(AuthorizationStatus.Auth)
      );

      mockHistory.push(AppRoute.NotFound);
      render(withStoreComponent);

      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });
});
