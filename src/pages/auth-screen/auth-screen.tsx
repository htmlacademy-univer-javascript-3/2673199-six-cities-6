import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {loginAction} from '../../store/api-actions.ts';
import {LoginForm} from '../../components/forms/login/login-form.tsx';

export function AuthScreen() {
  const activeCity = useAppSelector((state) => state.city.activeCity);
  const dispatch = useAppDispatch();

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <LoginForm
            onSubmit={({ email, password }) => void dispatch(loginAction({ email, password }))}
          />
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={AppRoute.Main}>
              <span>{activeCity}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
