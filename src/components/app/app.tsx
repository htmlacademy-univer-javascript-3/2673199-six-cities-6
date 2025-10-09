import {Route, Routes} from 'react-router-dom';
import {MainScreen} from '../../pages/main-screen/main-screen.tsx';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen.tsx';
import {AuthScreen} from '../../pages/auth-screen/auth-screen.tsx';
import {AppRoute, AuthorizationStatus} from '../consts.ts';
import {FavoritesScreen} from '../../pages/favourites-screen/favourites-screen.tsx';
import {OfferScreen} from '../../pages/offer-screen/offer-screen.tsx';
import {UserHeaderProps} from '../layout/user-header.tsx';
import {PlaceCard} from '../place-card';
import {Layout, LayoutWithUser} from '../layout';
import { PrivateRoute } from '../private-route/private-route.tsx';

type AppProps = {
  places: PlaceCard[];
  authStatus: AuthorizationStatus;
  userHeaderPrompts?: UserHeaderProps;
};


export function App({places, authStatus, userHeaderPrompts}: AppProps) {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route
          path={AppRoute.Login}
          element={<AuthScreen/>}
        />
      </Route>

      <Route element={<LayoutWithUser userHeaderPrompts={userHeaderPrompts} />}>
        <Route
          path={AppRoute.Main}
          element={<MainScreen places={places} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authStatus}>
              <FavoritesScreen places={places} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen places={places} />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Route>
    </Routes>
  );
}
