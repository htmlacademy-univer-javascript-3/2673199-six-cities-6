import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInfo} from '../../../types';
import {AuthorizationStatus} from '../../../consts.ts';


type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: UserInfo | null;
  errors: string | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  errors: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requireAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUser(state, action: PayloadAction<UserInfo | null>) {
      state.user = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.errors = action.payload;
    },
  },
});

export const {requireAuthorization, setUser, setError} = userSlice.actions;
