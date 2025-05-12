import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, toBe } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from '../../App';
import { LOGOUT_USER } from '../../redux/actionTypes';

const mockStore = configureStore([]);

describe('App Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({ auth: { user: { role: 'guest' } }, error: null });
        store.dispatch = vi.fn();
    });

    afterEach(() => {
        cleanup();
    });

    it('should render navigation links correctly', () => {
        render(
            <Provider store={store}>
                <App router={MemoryRouter} /> {/* Pass MemoryRouter as a prop */}
            </Provider>
        );

        expect(screen.getByText("Home")).not.toBeNull();
        expect(screen.getByText(/About/)).not.toBeNull();
        expect(screen.getByText(/Register/)).not.toBeNull();
        expect(screen.getByText(/Login/)).not.toBeNull();
    });

    it('should show VIP links when user is authenticated', () => {
        store = mockStore({ auth: { user: { email: 'vip@email.com', role: "vip" } }, error: null });
        store.dispatch = vi.fn();

        render(
            <Provider store={store}>
                <App router={MemoryRouter} />
            </Provider>
        );

        const home = screen.getAllByText("VIP Area");
        expect(home.length).toBe(2);
        expect(screen.getAllByText("VIP Products")).not.toBeNull();
        expect(screen.getAllByText("VIP Posts")).not.toBeNull();
    });

    it('should dispatch logout action when logout button is clicked', () => {
        store = mockStore({ auth: { user: { role: 'vip' } }, error: null });
        store.dispatch = vi.fn();

        render(
            <Provider store={store}>
                <App router={MemoryRouter} />
            </Provider>
        );

        fireEvent.click(screen.getByText(/Logout/));
        expect(store.dispatch).toHaveBeenCalledWith({ type: LOGOUT_USER });
    });

    it('should display error message when error state is present', () => {
        store = mockStore({ auth: { user: { role: 'guest' } }, error: 'An error occurred' });
        store.dispatch = vi.fn();

        render(
            <Provider store={store}>
                <App router={MemoryRouter} />
            </Provider>
        );

        expect(screen.getByText(/An error occurred/)).not.toBeNull();
    });
});
