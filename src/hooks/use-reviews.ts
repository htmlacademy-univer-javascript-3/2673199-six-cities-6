import {useCallback, useEffect, useState} from 'react';
import {Reviews, Review} from '../types/review.ts';
import {api} from '../store';
import {APIRoute} from '../consts.ts';

type ReviewsState = {
  data: Reviews;
  isLoading: boolean;
  error: string | null;
};

type ReviewInfo = {
  rating: number;
  comment: string;
};

export function useReviews(offerId?: string) {
  const [state, setState] = useState<ReviewsState>({
    data: [],
    isLoading: !!offerId,
    error: null,
  });

  const loadReviews = useCallback(async () => {
    if (!offerId) {
      setState({
        data: [],
        isLoading: false,
        error: 'Не передан id оффера',
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const {data} = await api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);
      setState({
        data,
        isLoading: false,
        error: null,
      });
    } catch {
      setState({
        data: [],
        isLoading: false,
        error: 'Не удалось загрузить отзывы',
      });
    }
  }, [offerId]);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  const sendReview = useCallback(
    async (info: ReviewInfo) => {
      if (!offerId) {
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        await api.post<Review>(
          `${APIRoute.Comments}/${offerId}`,
          info,
        );

        await loadReviews();
      } catch {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Не удалось отправить отзыв',
        }));
      }
    },
    [offerId, loadReviews],
  );

  return {
    reviews: state.data,
    isLoading: state.isLoading,
    error: state.error,
    sendReview,
  };
}
