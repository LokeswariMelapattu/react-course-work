// tests for productsReducer.js
import productsReducer from '../reducers/productsReducer';
import { SET_PRODUCTS } from '../actionTypes';
import { describe, it, expect } from 'vitest';

describe('productsReducer', () => {
    const initialState = {
        products: [],
    };

    it('should return the initial state', () => {
        const newState = productsReducer(undefined, {});
        expect(newState).toEqual(initialState);
    });

    it('should handle SET_PRODUCTS', () => {
        const products = [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
        ];
        const action = { type: SET_PRODUCTS, payload: products };
        const expectedState = { ...initialState, products };

        const newState = productsReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });
});