import {describe, it, expect} from 'vitest';
import {favoritesSlice, setFavorites} from './favorites-slice.ts';
import {toggleFavorite} from '../../api-actions';
import {createFakeOffer, createFakeOffers} from '../../../utils';


describe('favoritesSlice reducer', () => {
  const initialState = { favoriteOffers: [] };

  it('should return current state for empty action and given store', () => {
    const state = { favoriteOffers: createFakeOffers(2) };
    const action = { type: '' };

    const result = favoritesSlice.reducer(state, action);

    expect(result).toBe(state);
    expect(result).toEqual(state);
  });

  it('should return initial state for empty action and undefined store', () => {
    const action = { type: '' };

    const result = favoritesSlice.reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('should handle setFavorites', () => {
    const offers = createFakeOffers(3);

    const result = favoritesSlice.reducer(initialState, setFavorites(offers));

    expect(result.favoriteOffers).toEqual(offers);
  });

  it('should add offer on toggleFavorite.fulfilled when isFavorite=true and offer does not exist', () => {
    const state = { favoriteOffers: [] };
    const updatedOffer = createFakeOffer({ isFavorite: true });

    const action = {
      type: toggleFavorite.fulfilled.type,
      payload: updatedOffer,
    };
    const result = favoritesSlice.reducer(state, action);

    expect(result.favoriteOffers).toHaveLength(1);
    expect(result.favoriteOffers.some((o) => o.id === updatedOffer.id)).toBe(true);
  });


  it('should remove offer on toggleFavorite.fulfilled when isFavorite=false', () => {
    const offer = createFakeOffer({ isFavorite: true });
    const state = { favoriteOffers: [offer] };

    const updatedOffer = createFakeOffer({ id: offer.id, isFavorite: false });
    const action = {
      type: toggleFavorite.fulfilled.type,
      payload: updatedOffer,
    };

    const result = favoritesSlice.reducer(state, action);

    expect(result.favoriteOffers).toHaveLength(0);
    expect(result.favoriteOffers.some((o) => o.id === offer.id)).toBe(false);
  });
});
