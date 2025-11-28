import {useCallback} from 'react';
import {Reviews, Review} from '../types/review.ts';
import {api} from '../store';
import {APIRoute} from '../consts.ts';
import {useFetch} from './use-fetch.ts';

type ReviewInfo = {
  rating: number;
  comment: string;
};

export function useReviews(offerId?: string) {
  const {data, isLoading, error, reload} = useFetch<Reviews>({
    deps: [offerId],
    initialData: [],
    fetcher: async () => {
      if (!offerId) {
        return [];
      }
      const {data: response} = await api.get<Reviews>(
        `${APIRoute.Comments}/${offerId}`,
      );
      return response;
    },
  });

  const sendReview = useCallback(
    async (info: ReviewInfo) => {
      if (!offerId) {
        return;
      }

      await api.post<Review>(
        `${APIRoute.Comments}/${offerId}`,
        info,
      );

      reload();
    },
    [offerId, reload],
  );

  return {
    reviews: data,
    isLoading,
    error,
    sendReview,
  };
}
