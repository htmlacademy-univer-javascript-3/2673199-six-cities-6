import {ThunkDispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {Action} from 'redux';
import {State} from '../types';

export type AppThunkDispatch = ThunkDispatch<State, AxiosInstance, Action<string>>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const expectSubsequence = (types: string[], expectedTypes: string[]) => {
  let idx = 0;
  for (const t of types) {
    if (t === expectedTypes[idx]) {
      idx += 1;
    }
    if (idx === expectedTypes.length) {
      break;
    }
  }
  if (idx !== expectedTypes.length) {
    throw new Error(
      `Expected subsequence:\n${expectedTypes.join('\n')}\n\nGot:\n${types.join('\n')}`
    );
  }
};
