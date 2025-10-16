import { useState, useCallback } from 'react';

type Id = string;
type ApplyFn = (id: Id, next: boolean) => void;

type UseToggleBookmarkOptions = {
  request?: (id: Id, next: boolean) => Promise<void>;
};

export function useToggleBookmark(opts: UseToggleBookmarkOptions = {}) {
  const { request } = opts;
  const [pendingIds, setPendingIds] = useState<Set<Id>>(new Set());

  const setPending = useCallback((id: Id, val: boolean) => {
    setPendingIds((prev) => {
      const next = new Set(prev);
      if (val) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  const isPending = useCallback((id: Id) => pendingIds.has(id), [pendingIds]);

  const toggle = useCallback(
    async (id: Id, next: boolean, apply: ApplyFn) => {
      apply(id, next);
      setPending(id, true);

      try {
        if (request) {
          await request(id, next);
        } else {
          await new Promise((res) => setTimeout(res, 300));
        }
      } catch (e) {
        apply(id, !next);
        throw e;
      } finally {
        setPending(id, false);
      }
    },
    [request, setPending]
  );

  return { pendingIds, isPending, toggle };
}
