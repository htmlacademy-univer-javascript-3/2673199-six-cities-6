import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInfo} from '../../../types';
import {AuthorizationStatus} from '../../../consts.ts';


type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: UserInfo | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
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
  },
});

export const {requireAuthorization, setUser} = userSlice.actions;
