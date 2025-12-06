import { useCallback } from 'react';
import { Reviews, Review } from '../types';
import { api } from '../store';
import { APIRoute } from '../consts.ts';
import { useFetch } from './use-fetch.ts';
import {apiRequestWithToastSettings} from '../services';

type ReviewInfo = {
  rating: number;
  comment: string;
};

export function useReviews(offerId?: string) {
  const { data, setData, isLoading, error } = useFetch<Reviews>({
    deps: [offerId],
    initialData: [],
    fetcher: async () => {
      if (!offerId) {
        return [];
      }
      const { data: response } = await api.get<Reviews>(
        `${APIRoute.Comments}/${offerId}`
      );
      return response;
    },
  });

  const sendReview = useCallback(
    async (info: ReviewInfo) => {
      if (!offerId) {
        return;
      }

      const newReview = await apiRequestWithToastSettings(
        (config) => api.post<Review>(`${APIRoute.Comments}/${offerId}`, info, config),
        {suppressToast: true},
      );

      setData((prev) => [...prev, newReview]);
    },
    [offerId, setData]
  );

  return {
    reviews: data,
    isLoading,
    error,
    sendReview,
  };
}
