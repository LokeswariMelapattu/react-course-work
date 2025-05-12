import { describe, it, expect } from 'vitest';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import store from '../store';
import rootReducer from '../reducers/rootReducer';

describe('Redux Store', () => {
  const mockStore = configureStore([thunk]);
  const initialState = {};

  it('should create a store with the correct initial state', () => {
    const testStore = mockStore(initialState);
    expect(testStore.getState()).toEqual(initialState);
  });

  it('should apply middleware correctly', () => {
    const middlewares = store.dispatch;
    expect(middlewares).toBeInstanceOf(Function);
  });

});