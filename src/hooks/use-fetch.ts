import {Dispatch, SetStateAction, useEffect, useState} from 'react';

export type FetchState<T> = {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
};

type UseFetchArgs<T> = {
  deps: unknown[];
  fetcher: () => Promise<T>;
  initialData: T;
};

export function useFetch<T>({
  deps,
  fetcher,
  initialData,
}: UseFetchArgs<T>): FetchState<T> {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  const reload = () => setReloadIndex((i) => i + 1);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (cancelled) {
          return;
        }
        setData(result);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }
        setError('Ошибка загрузки данных');
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadIndex]);

  return {data, setData, isLoading, error, reload};
}
