import ReactDOM from 'react-dom/client';
import {App} from './components/app/app.tsx';
import {reviews} from './mocks/reviews.ts';
import {userHeaderProps} from './mocks/user.ts';
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store = {store}>
    <App
      reviews={reviews}
      userHeaderPrompts={userHeaderProps}
    />
  </Provider>
);
