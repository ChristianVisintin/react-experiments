/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer"
import recipeReducer from "./recipeReducer";
import newsletterReducer from "./newsletterReducer";
import cookiesReducer from "./cookiesReducer";
import twitterReducer from "./twitterReducer";

export default combineReducers({
  categories: categoryReducer,
  recipes: recipeReducer,
  newsletterSubscription: newsletterReducer,
  cookies: cookiesReducer,
  tweets: twitterReducer,
});
