import { memo, useEffect } from 'react';
import {useAppSelector } from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from "../../hooks/use-app-dispatch.ts";
import {setError} from "../../store/reducers/user-slice/user-slice.ts";
import './error-banner.css'

export function ErrorBanner() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.user.errors);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        dispatch(setError(null));
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);

  if (!error) return null;

  return (
    <div className="error-banner">
      <p>An error occurred.!</p>
      <button onClick={() => dispatch(setError(null))}>✖</button>
    </div>
  );
}

export const ErrorBannerMemo = memo(ErrorBanner);
