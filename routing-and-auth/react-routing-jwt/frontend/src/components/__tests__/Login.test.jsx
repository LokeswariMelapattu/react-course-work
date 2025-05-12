import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../Login';
import { showNotification } from '../../redux/actionCreators/notificationActions';
import { loginUser } from '../../redux/actionCreators/authActions';

const mockStore = configureStore([]);
vi.mock('../../redux/actionCreators/notificationActions');
vi.mock('../../redux/actionCreators/authActions');

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the login form', () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).not.toBeNull();
    expect(screen.getByLabelText(/password/i)).not.toBeNull();
    expect(screen.getByRole('button', { name: /login/i })).not.toBeNull();
  });

  it('should show notification if email and password are not provided', () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      showNotification('Email and password must be provided', 'auth', 'error')
    );
  });

  it('should show notification if password is less than 10 characters', () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      showNotification('Password must be at least 10 characters long', 'auth', 'error')
    );
  });

  it('should dispatch loginUser action if email and password are valid', () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      loginUser({ email: 'test@example.com', password: 'validpassword' }, expect.any(Function))
    );
  });
});
