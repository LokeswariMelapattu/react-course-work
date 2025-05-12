// tests for notificationReducer.js
import notificationReducer  from '../reducers/notificationReducer';
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actionTypes';
import { describe, it, expect } from 'vitest';

describe('notificationReducer', () => {
    const initialState = {
        message: '',
        stateType: null,
        requestStatus: null,
        visible: false,
    };

    it('should return the initial state', () => {
        const newState = notificationReducer(undefined, {});
        expect(newState).toEqual(initialState);
    });

    it('should handle SHOW_NOTIFICATION', () => {
        const notification = {
            message: 'Success',
            stateType: 'success',
            requestStatus: 200,
        };
        const action = { type: SHOW_NOTIFICATION, payload: notification };
        const expectedState = { ...initialState, ...notification, visible: true };

        const newState = notificationReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    it('should handle HIDE_NOTIFICATION', () => {
        const action = { type: HIDE_NOTIFICATION };

        const newState = notificationReducer(initialState, action);
        expect(newState).toEqual(initialState);
    });
});