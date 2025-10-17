import ReactDOM from 'react-dom/client';
import {App} from './components/app/app.tsx';
import {activeCity, detailed, offers} from './mocks/offers.ts';
import {reviews} from './mocks/reviews.ts';
import {authStatus, userHeaderProps} from './mocks/user.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App
    offers={offers}
    detailed={detailed}
    reviews={reviews}
    activeCity={activeCity}
    authStatus={authStatus}
    userHeaderPrompts={userHeaderProps}
  />
);
