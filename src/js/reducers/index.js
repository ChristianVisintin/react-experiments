import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import newsletterReducer from './newsletterReducer';

export default combineReducers({
  recipes: recipeReducer,
  newsletterSubscription: newsletterReducer 
});
