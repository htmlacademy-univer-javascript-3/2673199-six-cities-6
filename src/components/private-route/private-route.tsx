import {Navigate} from 'react-router-dom';
import Element = React.JSX.Element;
import {AppRoute, AuthorizationStatus} from '../consts.ts';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: Element;
}

export function PrivateRoute(props: PrivateRouteProps): Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
