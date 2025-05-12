import { describe, it, expect } from 'vitest';
import authReducer from '../reducers/authReducer';
import { SET_USER_AUTH, LOGOUT_USER, AUTH_ERROR } from '../actionTypes';

describe('authReducer', () => {
  const initialState = {
    user: null,
    error: null,
  };

  it('should return the initial state', () => {
    const newState = authReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle SET_USER_AUTH', () => {
    const user = { id: 1, name: 'John Doe' };
    const action = { type: SET_USER_AUTH, payload: user };
    const expectedState = { ...initialState, user };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle LOGOUT_USER', () => {
    const action = { type: LOGOUT_USER };
    const expectedState = { ...initialState, user: { role: 'guest' } };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle AUTH_ERROR', () => {
    const error = 'Authentication failed';
    const action = { type: AUTH_ERROR, payload: error };
    const expectedState = { ...initialState, error };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});