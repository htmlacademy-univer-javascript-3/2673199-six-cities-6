import {useEffect, useState} from 'react';
import {Offers} from '../types/offer.ts';
import {api} from '../store';
import {APIRoute} from '../consts.ts';

type NearsState = {
  data: Offers;
  isLoading: boolean;
  error: string | null;
};

export function useNears(id?: string) {
  const [state, setState] = useState<NearsState>({
    data: [],
    isLoading: !!id,
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState({
        data: [],
        isLoading: false,
        error: 'Не передан id оффера',
      });
      return;
    }

    let cancelled = false;

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    api
      .get<Offers>(`${APIRoute.Offers}/${id}/nearby`)
      .then(({data}) => {
        if (cancelled) {
          return;
        }

        setState({
          data,
          isLoading: false,
          error: null,
        });
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setState({
          data: [],
          isLoading: false,
          error: 'Не удалось загрузить соседние предложения',
        });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
