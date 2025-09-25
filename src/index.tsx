import ReactDOM from 'react-dom/client';
import {App} from "./components/App/App.tsx";
import {BrowserRouter} from "react-router-dom";
import {UserHeaderProps} from "./components/header/user-header.tsx";
import {PlaceCard} from "./components/place-card/place-card.tsx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const isLoggedIn = true;
const userHeaderProps: UserHeaderProps = {
  email: "Oliver.conner@gmail.com",
  favoriteCount: 3
};

const places: PlaceCard[] = [
  {
    mark: "Premium",
    imageSource: "img/apartment-01.jpg",
    price: 120,
    isBookmarked: false,
    rating: 4,
    placeTitleProps: {placeName: "Beautiful & luxurious apartment", placeType: "Apartment"},
  },
  {
    imageSource: "img/room.jpg",
    price: 80,
    isBookmarked: true,
    rating: 4,
    placeTitleProps: {placeName: "Wood and stone place", placeType: "Room"},
  },
  {
    imageSource: "img/apartment-02.jpg",
    price: 132,
    isBookmarked: false,
    rating: 4,
    placeTitleProps: {placeName: "Canal View Prinsengracht", placeType: "Apartment"},
  },
  {
    mark: "Premium",
    imageSource: "img/apartment-03.jpg",
    price: 180,
    isBookmarked: false,
    rating: 5,
    placeTitleProps: {placeName: "Nice, cozy, warm big bed apartment", placeType: "Apartment"},
  },
  {
    imageSource: "img/room.jpg",
    price: 80,
    isBookmarked: true,
    rating: 4,
    placeTitleProps: {placeName: "Wood and stone place", placeType: "Room"},
  },
];

root.render(
  <BrowserRouter>
    <App places={places} isLoggedIn={isLoggedIn} userHeaderPrompts={userHeaderProps}/>
  </BrowserRouter>
);
