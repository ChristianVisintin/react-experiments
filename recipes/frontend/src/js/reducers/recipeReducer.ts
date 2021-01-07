/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import {
  GET_RECIPE,
  LIKE_RECIPE,
  SEARCH_RECIPES,
  GET_CAROUSEL_RECIPES,
  GET_LATEST_RECIPES,
  GET_RELATED_RECIPES,
  LOAD_MORE_RECIPES,
} from "../actions/recipeActions";
import { RecipeStoreState } from "./types";
import Recipe from "../lib/data/recipe";

const initialState: RecipeStoreState = new RecipeStoreState(
  [],
  new Recipe("-1", "", [], "1970-01-01T00:00:00Z", []),
  [],
  [],
  []
);

export interface RecipeMessage {
  type: string;
  payload: Array<Recipe>;
}

export default function (
  state: RecipeStoreState = initialState,
  action: RecipeMessage
) {
  switch (action.type) {
    case GET_CAROUSEL_RECIPES:
      return {
        ...state,
        carouselRecipes: action.payload,
      };
    case GET_LATEST_RECIPES:
      return {
        ...state,
        latestRecipes: action.payload,
      };
    case GET_RELATED_RECIPES:
      return {
        ...state,
        relatedRecipes: action.payload,
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case LOAD_MORE_RECIPES:
      return {
        ...state,
        recipes: state.recipes.concat(action.payload),
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    case LIKE_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    default:
      return state;
  }
}
