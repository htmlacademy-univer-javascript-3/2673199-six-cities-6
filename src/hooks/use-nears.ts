import {useFetch} from './use-fetch.ts';
import {Offers} from '../types';
import {APIRoute} from '../consts.ts';
import {api} from '../store';

export function useNears(id?: string) {
  return useFetch<Offers>({
    deps: [id],
    initialData: [],
    fetcher: async () => {
      if (!id) {
        return [];
      }

      const {data} = await api.get<Offers>(
        `${APIRoute.Offers}/${id}/nearby`,
      );

      return data;
    },
  });
}
