import {Navigate, Route, Routes} from 'react-router-dom';
import {MainScreen} from '../../pages/main-screen/main-screen.tsx';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen.tsx';
import {AuthScreen} from '../../pages/auth-screen/auth-screen.tsx';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {FavoritesScreen} from '../../pages/favorites-screen/favorites-screen.tsx';
import {OfferScreen} from '../../pages/offer-screen/offer-screen.tsx';
import {Layout, LayoutWithUser} from '../layout';
import { PrivateRoute } from '../private-route/private-route.tsx';
import {useAppSelector} from '../../hooks';
import {Spinner} from '../spinner/spinner.tsx';
import {HistoryRouter} from '../history-route/history-route.tsx';
import browserHistory from '../../browser-history.ts';
import {ScrollToTop} from '../../utils';
import {ToastContainer} from 'react-toastify';

export function App() {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const isOffersLoading = useAppSelector((state) => state.offers.isOffersLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout/>}>
          <Route
            path={AppRoute.Login}
            element={<AuthScreen/>}
          />
        </Route>

        <Route element={<LayoutWithUser authState={authorizationStatus}/>}>
          <Route
            path={AppRoute.Main}
            element={<MainScreen/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesScreen/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen/>}
          />
          <Route
            path={AppRoute.NotFound}
            element={<NotFoundScreen/>}
          />
        </Route>
        <Route
          path={AppRoute.All}
          element={<Navigate to={AppRoute.NotFound} replace />}
        />
      </Routes>
      <ToastContainer />
    </HistoryRouter>
  );
}
