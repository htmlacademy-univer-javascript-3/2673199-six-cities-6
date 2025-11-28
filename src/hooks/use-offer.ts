import {useEffect, useState} from 'react';
import type {OfferDetailed} from '../types/offer.ts';
import {api} from '../store';
import {APIRoute} from '../consts.ts';

type OfferState = {
  data: OfferDetailed | null;
  isLoading: boolean;
  error: string | null;
};

export function useOffer(id?: string) {
  const [offerState, setOfferState] = useState<OfferState>({
    data: null,
    isLoading: !!id,
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setOfferState({
        data: null,
        isLoading: false,
        error: 'Не передан id оффера',
      });
      return;
    }

    let cancelled = false;

    setOfferState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    api
      .get<OfferDetailed>(`${APIRoute.Offers}/${id}`)
      .then(({data}) => {
        if (cancelled) {
          return;
        }
        setOfferState({
          data,
          isLoading: false,
          error: null,
        });
      })
      .catch(() => {
        if (cancelled) {
          return;
        }
        setOfferState({
          data: null,
          isLoading: false,
          error: 'Не удалось загрузить оффер',
        });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return offerState;
}
