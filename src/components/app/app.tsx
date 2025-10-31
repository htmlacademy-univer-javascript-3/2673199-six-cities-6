import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainScreen} from '../../pages/main-screen/main-screen.tsx';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen.tsx';
import {AuthScreen} from '../../pages/auth-screen/auth-screen.tsx';
import {AppRoute, AuthorizationStatus} from '../consts.ts';
import {FavoritesScreen} from '../../pages/favourites-screen/favourites-screen.tsx';
import {OfferScreen} from '../../pages/offer-screen/offer-screen.tsx';
import {UserHeaderProps} from '../layout/user-header.tsx';
import {Layout, LayoutWithUser} from '../layout';
import { PrivateRoute } from '../private-route/private-route.tsx';
import {OfferDetailed, Offers} from '../../types/offer.ts';
import {Reviews} from '../../types/review.ts';
import {nears} from "../../mocks/offers.ts";

type AppProps = {
  offers: Offers;
  detailed: OfferDetailed;
  reviews: Reviews;
  activeCity: string;
  authStatus: AuthorizationStatus;
  userHeaderPrompts: UserHeaderProps;
};


export function App({offers, detailed, reviews, activeCity, authStatus, userHeaderPrompts}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route
            path={AppRoute.Login}
            element={<AuthScreen activeCity={activeCity}/>}
          />
        </Route>

        <Route element={<LayoutWithUser userHeaderPrompts={userHeaderPrompts}/>}>
          <Route
            path={AppRoute.Main}
            element={<MainScreen offers={offers}/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authStatus}>
                <FavoritesScreen offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen nearPlaces={nears} detailOffer={detailed} reviews={reviews}/>}
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
