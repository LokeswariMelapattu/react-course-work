// tests for postsReducer.js
import postsReducer from '../reducers/postsReducer';
import { SET_POSTS } from '../actionTypes';
import { describe, it, expect } from 'vitest';

describe('postsReducer', () => {
    const initialState = {
        posts: [],
    };

    it('should return the initial state', () => {
        const newState = postsReducer(undefined, {});
        expect(newState).toEqual(initialState);
    });

    it('should handle SET_POSTS', () => {
        const posts = [
            { id: 1, title: 'Post 1' },
            { id: 2, title: 'Post 2' },
        ];
        const action = { type: SET_POSTS, payload: posts };
        const expectedState = { ...initialState, posts };

        const newState = postsReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });
});
