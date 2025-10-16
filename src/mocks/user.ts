import {AuthorizationStatus} from '../components/consts.ts';
import {UserHeaderProps} from '../components/layout/user-header.tsx';
import {offers} from './offers.ts';

export const authStatus = AuthorizationStatus.Auth;
export const userHeaderProps: UserHeaderProps = {
  email: 'Oliver.conner@gmail.com',
  favoriteCount: offers.filter((x) => x.isFavorite).length,
  authState: authStatus,
};
