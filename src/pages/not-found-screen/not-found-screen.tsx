import { Link } from 'react-router-dom';
import {AppRoute} from '../../consts.ts';


export function NotFoundScreen() {
  return (
    <main className="page__main page__main--not-found">
      <div className="container">
        <section className="not-found">
          <h1 className="not-found__title">404. Page not found</h1>
          <Link className="not-found__link" to={AppRoute.Main}>
            Go to main page
          </Link>
        </section>
      </div>
    </main>
  );
}
