import {describe, it, expect} from 'vitest';
import {offersSlice, setOffers, setOffersLoadingStatus} from './offers-slice.ts';
import {toggleFavorite} from '../../api-actions';
import {createFakeOffer, createFakeOffers} from '../../../utils';

describe('offersSlice reducer', () => {
  const initialState = {
    offers: [],
    isOffersLoading: false,
  };

  it('should return current state for empty action and given store', () => {
    const state = {
      offers: createFakeOffers(2),
      isOffersLoading: true,
    };
    const action = { type: '' };

    const result = offersSlice.reducer(state, action);

    expect(result).toBe(state);
    expect(result).toEqual(state);
  });

  it('should return initial state for empty action and undefined store', () => {
    const action = { type: '' };

    const result = offersSlice.reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('should handle setOffers', () => {
    const offers = createFakeOffers(3);

    const result = offersSlice.reducer(initialState, setOffers(offers));

    expect(result.offers).toEqual(offers);
    expect(result.isOffersLoading).toBe(false);
  });

  it('should handle setOffersLoadingStatus', () => {
    const result = offersSlice.reducer(initialState, setOffersLoadingStatus(true));

    expect(result.isOffersLoading).toBe(true);
    expect(result.offers).toEqual([]);
  });

  it('should update not favorite offer in offers list on toggleFavorite.fulfilled', () => {
    const offer = createFakeOffer({ isFavorite: false });

    const state = {
      offers: [offer],
      isOffersLoading: false,
    };

    const updatedOffer = createFakeOffer({
      id: offer.id,
      isFavorite: true,
    });

    const action = {
      type: toggleFavorite.fulfilled.type,
      payload: updatedOffer,
    };

    const result = offersSlice.reducer(state, action);

    expect(result.offers).toHaveLength(1);
    expect(result.offers.find((o) => o.id === offer.id)).toEqual(updatedOffer);
  });
});
