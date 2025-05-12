import { combineReducers } from 'redux';
import { productsReducer } from './productsReducer';
import { authReducer } from './authReducer';
import { notificationReducer } from './notificationReducer';
import { postsReducer } from './postsReducer';

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
  posts: postsReducer,
  notification: notificationReducer
});