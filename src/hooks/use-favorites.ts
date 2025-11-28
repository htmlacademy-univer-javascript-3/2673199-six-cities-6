import {useCallback, useState} from 'react';
import {useAppDispatch} from './use-app-dispatch.ts';
import {toggleFavorite} from '../store/api-actions.ts';

export function useFavorite() {
  const dispatch = useAppDispatch();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const onToggleBookmark = useCallback(
    async (id: string, next: boolean) => {
      setPendingId(id);
      try {
        await dispatch(
          toggleFavorite({
            id,
            next,
          }),
        ).unwrap();
      } finally {
        setPendingId(null);
      }
    },
    [dispatch],
  );

  const isBookmarkPending = useCallback(
    (id: string) => pendingId === id,
    [pendingId],
  );

  return {
    onToggleBookmark,
    isBookmarkPending,
  };
}
