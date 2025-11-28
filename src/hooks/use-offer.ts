import {OfferDetailed} from '../types/offer.ts';
import {useFetch} from './use-fetch.ts';
import {api} from '../store';
import {APIRoute} from '../consts.ts';

export function useOffer(id?: string) {
  return useFetch<OfferDetailed | null>({
    deps: [id],
    initialData: null,
    fetcher: async () => {
      if (!id) {
        return null;
      }
      const {data} = await api.get<OfferDetailed>(
        `${APIRoute.Offers}/${id}`,
      );
      return data;
    },
  });
}
