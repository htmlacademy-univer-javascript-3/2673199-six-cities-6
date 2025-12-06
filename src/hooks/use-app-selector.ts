import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {State} from '../types';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
