import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainScreen} from '../../pages/main-screen/main-screen.tsx';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen.tsx';
import {AuthScreen} from '../../pages/auth-screen/auth-screen.tsx';
import {AppRoute} from '../../consts.ts';
import {FavoritesScreen} from '../../pages/favorites-screen/favorites-screen.tsx';
import {OfferScreen} from '../../pages/offer-screen/offer-screen.tsx';
import {UserHeaderProps} from '../layout/user-header.tsx';
import {Layout, LayoutWithUser} from '../layout';
import { PrivateRoute } from '../private-route/private-route.tsx';

type AppProps = {
  userHeaderPrompts: UserHeaderProps;
};


export function App({userHeaderPrompts}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route
            path={AppRoute.Login}
            element={<AuthScreen/>}
          />
        </Route>

        <Route element={<LayoutWithUser userHeaderPrompts={userHeaderPrompts}/>}>
          <Route
            path={AppRoute.Main}
            element={<MainScreen/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={userHeaderPrompts.authState}>
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
      </Routes>
    </BrowserRouter>
  );
}
