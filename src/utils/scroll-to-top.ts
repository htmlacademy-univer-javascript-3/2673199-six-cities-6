import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import type {DependencyList} from 'react';

type ScrollToTopProps = {
  deps?: DependencyList;
  getTarget?: () => HTMLElement | null;
  behavior?: ScrollBehavior;
};

export function ScrollToTop({
  deps = [],
  getTarget,
  behavior = 'auto',
}: ScrollToTopProps) {
  const {pathname} = useLocation();

  useEffect(() => {
    const el = getTarget?.();

    if (el) {
      el.scrollTo({top: 0, left: 0, behavior});
    } else {
      window.scrollTo({top: 0, left: 0, behavior});
    }
    // getTarget может создаваться инлайн, не хочется каждый раз ререндерить
    // deps распаковывается, чтобы также лишних изменений не было
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, behavior, ...deps]);

  return null;
}
