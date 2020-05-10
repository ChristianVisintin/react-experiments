import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import newsletterReducer from './newsletterReducer';
import cookiesReducer from './cookiesReducer';

export default combineReducers({
  recipes: recipeReducer,
  newsletterSubscription: newsletterReducer,
  cookies: cookiesReducer
});
