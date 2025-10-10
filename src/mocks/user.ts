import {AuthorizationStatus} from '../components/consts.ts';
import {UserHeaderProps} from '../components/layout/user-header.tsx';
import {places} from './places.ts';

export const authStatus = AuthorizationStatus.NoAuth;
export const userHeaderProps: UserHeaderProps = {
  email: 'Oliver.conner@gmail.com',
  favoriteCount: places.filter((x) => x.isFavorite).length,
  authState: authStatus,
};
