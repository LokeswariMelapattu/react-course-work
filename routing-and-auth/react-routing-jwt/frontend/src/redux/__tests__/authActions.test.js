import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { checkAuthStatus, logoutUser, registerUser, loginUser } from '../actionCreators/authActions';
import { SET_USER_AUTH, LOGOUT_USER, AUTH_ERROR } from '../actionTypes';
import { showNotification } from '../actionCreators/notificationActions';

vi.mock('axios');
vi.mock('../actionCreators/notificationActions', () => ({
  showNotification: vi.fn(),
}));

describe('Auth Actions', () => {
  let dispatch;
  let navigate;

  beforeEach(() => {
    dispatch = vi.fn();
    navigate = vi.fn();
  });

  it('should check authentication status and set user auth', async () => {
    axios.get.mockResolvedValue({ status: 200, data: { user: { id: 1, role: 'user' } } });

    await checkAuthStatus()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: SET_USER_AUTH,
      payload: { id: 1, role: 'user' },
    });
  });

  it('should handle authentication check failure', async () => {
    axios.get.mockRejectedValue(new Error('Auth check failed'));

    await checkAuthStatus()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: AUTH_ERROR, payload: 'Failed to check authentication status' });
  });

  it('should log out user and redirect to login', async () => {
    axios.get.mockResolvedValue({ status: 200 });

    await logoutUser(navigate, '/', 'user')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: LOGOUT_USER });
    expect(dispatch).toHaveBeenCalledWith(showNotification('Logout successful', 'auth', 'success'));
  });

  it('should register user and set auth state', async () => {
    axios.post.mockResolvedValue({ status: 201, data: { user: { id: 1, role: 'user' } } });

    await registerUser({ email: 'test@example.com', password: 'password123' }, navigate)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: SET_USER_AUTH,
      payload: { id: 1, role: 'user' },
    });
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should handle registration failure', async () => {
    axios.post.mockRejectedValue(new Error('Registration failed'));

    await registerUser({ email: 'test@example.com', password: 'password123' }, navigate)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showNotification('Registration failed. Please try again.', 'auth', 'error'));
  });

  it('should log in user and set auth state', async () => {
    axios.post.mockResolvedValue({ status: 200, data: { user: { id: 1, role: 'user' } } });

    await loginUser({ email: 'test@example.com', password: 'password123' }, navigate)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: SET_USER_AUTH,
      payload: { id: 1, role: 'user' },
    });
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should handle login failure', async () => {
    axios.post.mockRejectedValue(new Error('Login failed'));

    await loginUser({ email: 'test@example.com', password: 'password123' }, navigate)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showNotification('Login failed. Please try again.', 'auth', 'error'));
  });
});
