import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Register from '../Register';
import { showNotification } from '../../redux/actionCreators/notificationActions';
import { registerUser } from '../../redux/actionCreators/authActions';

const mockStore = configureStore([]);
vi.mock('../../redux/actionCreators/authActions', () => ({
  registerUser: vi.fn(),
}));
vi.mock('../../redux/actionCreators/notificationActions', () => ({
    showNotification: vi.fn((message, type, status) => ({
      type: 'SHOW_NOTIFICATION',
      payload: { message, type, status },
    })),
  }));
  

describe('Register Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the registration form', () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/name/i)).not.toBeNull();
    expect(screen.getByLabelText(/email/i)).not.toBeNull();
    expect(screen.getByLabelText(/password confirmation/i)).not.toBeNull();
    expect(screen.getByRole('button', { name: /register/i })).not.toBeNull();
  });

  it('should show notification if password is too short', () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'email@email.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      showNotification('Password must be at least 10 characters', 'auth', 'error')
    );
  });

  it('should show notification if passwords do not match', () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'validpassword' } });
    fireEvent.change(screen.getByLabelText(/password confirmation/i), { target: { value: 'differentpassword' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'email@email.com' } });
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'email@email.com' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      showNotification('Passwords do not match', 'auth', 'error')
    );
  });

  it('should dispatch registerUser action if all inputs are valid', () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'validpassword' } });
    fireEvent.change(screen.getByLabelText(/password confirmation/i), { target: { value: 'validpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      registerUser({ name: 'John Doe', email: 'test@example.com', password: 'validpassword' }, expect.any(Function))
    );
  });
});
