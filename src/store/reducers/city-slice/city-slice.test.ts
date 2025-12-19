import {describe, it, expect} from 'vitest';
import {citySlice, setActiveCity, setActiveSortingType} from './city-slice.ts';
import {SortingType} from '../../../consts';

describe('citySlice reducer', () => {

  const initialState = {
    activeCity: 'Paris',
    activeSortingType: SortingType.Popular,
  };

  it('should return current state for empty action and given store', () => {
    const state = {
      activeCity: 'Cologne',
      activeSortingType: SortingType.PriceLowToHigh,
    };
    const action = { type: '' };

    const result = citySlice.reducer(state, action);

    expect(result).toBe(state);
    expect(result).toEqual(state);
  });

  it('should return initial state for empty action and undefined store', () => {
    const action = { type: '' };

    const result = citySlice.reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('should handle setActiveCity', () => {
    const result = citySlice.reducer(initialState, setActiveCity('Amsterdam'));

    expect(result.activeCity).toBe('Amsterdam');
    expect(result.activeSortingType).toBe(SortingType.Popular);
  });

  it('should handle setActiveSortingType', () => {
    const result = citySlice.reducer(
      initialState,
      setActiveSortingType(SortingType.TopRatedFirst)
    );

    expect(result.activeSortingType).toBe(SortingType.TopRatedFirst);
    expect(result.activeCity).toBe('Paris');
  });
});
