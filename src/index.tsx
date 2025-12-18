import ReactDOM from 'react-dom/client';
import {App} from './components/app/app.tsx';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction, fetchOffers} from './store/api-actions.ts';
import {HistoryRouter} from './components/history-route/history-route.tsx';
import browserHistory from './browser-history.ts';
import {ToastContainer} from 'react-toastify';
import {ScrollToTop} from './utils';

store.dispatch(fetchOffers());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store = {store}>
    <HistoryRouter history={browserHistory}>
      <ToastContainer />
      <ScrollToTop />
      <App />
    </HistoryRouter>
  </Provider>
);
