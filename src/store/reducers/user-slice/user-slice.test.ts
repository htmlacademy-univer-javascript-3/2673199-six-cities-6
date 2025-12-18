import {describe, it, expect} from 'vitest';
import {userSlice, requireAuthorization, setUser} from './user-slice.ts';
import {AuthorizationStatus} from '../../../consts';
import {createFakeUserInfo} from '../../../utils';

describe('userSlice reducer', () => {
  const reducer = userSlice.reducer;

  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  };

  it('should return current state for empty action and given store', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: createFakeUserInfo(),
    };
    const action = { type: '' };

    const result = reducer(state, action);

    expect(result).toBe(state);
    expect(result).toEqual(state);
  });

  it('should return initial state for empty action and undefined store', () => {
    const action = { type: '' };

    const result = reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('should handle requireAuthorization', () => {
    const result = reducer(
      initialState,
      requireAuthorization(AuthorizationStatus.Auth)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.user).toBeNull();
  });

  it('should handle setUser with user', () => {
    const user = createFakeUserInfo();

    const result = reducer(initialState, setUser(user));

    expect(result.user).toEqual(user);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Unknown);
  });

  it('should handle setUser with null', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: createFakeUserInfo(),
    };

    const result = reducer(state, setUser(null));

    expect(result.user).toBeNull();
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });
});
