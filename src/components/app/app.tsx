import {Routes, Route} from 'react-router-dom';
import {MainScreen} from '../../pages/main-screen/main-screen.tsx';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen.tsx';
import {AuthScreen} from '../../pages/auth-screen/auth-screen.tsx';
import {AppRoute} from '../app-route.ts';
import {FavoritesScreen} from '../../pages/favourites-screen/favourites-screen.tsx';
import {OfferScreen} from '../../pages/offer-screen/offer-screen.tsx';
import {Header} from '../header/header.tsx';
import {UserHeaderProps} from '../header/user-header.tsx';
import {PlaceCard} from '../place-card/place-card.tsx';

type AppProps = {
  places: PlaceCard[];
  isLoggedIn: boolean;
  userHeaderPrompts?: UserHeaderProps;
};


export function App({places, isLoggedIn, userHeaderPrompts}: AppProps) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} userHeaderPrompts={userHeaderPrompts}/>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen places={places}/>}/>
        <Route path={AppRoute.Login} element={<AuthScreen/>}/>
        <Route path={AppRoute.Favorites} element={<FavoritesScreen places={places}/>}/>
        <Route path={AppRoute.Offer} element={<OfferScreen places={places}/>}/>
        <Route path={AppRoute.NotFound} element={<NotFoundScreen/>}/>
      </Routes>
    </>
  );
}
