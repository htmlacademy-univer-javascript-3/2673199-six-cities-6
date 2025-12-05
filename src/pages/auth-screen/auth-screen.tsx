import { Link } from 'react-router-dom';
import {AppRoute, CITIES} from '../../consts.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {loginAction} from '../../store/api-actions.ts';
import {LoginForm} from '../../components/forms/login/login-form.tsx';
import {setActiveCity} from '../../store/reducers/city-slice/city-slice.ts';

export function AuthScreen() {
  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
  const dispatch = useAppDispatch();
  const handleCityClick = () => {
    dispatch(setActiveCity(randomCity));
  };

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
            <Link className="locations__item-link" to={AppRoute.Main} onClick={handleCityClick}>
              <span>{randomCity}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
