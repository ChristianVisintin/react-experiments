/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import {
  EXPLORE_RECIPES,
  GET_CAROUSEL_RECIPES,
  GET_LATEST_RECIPES,
  GET_RELATED_RECIPES,
} from "../actions/recipeActions";
import { StoreState } from "./types";
import Recipe from "../lib/data/recipe";

const initialState: StoreState = new StoreState([], {});

export interface RecipeMessage {
  type: string;
  payload: Array<Recipe>;
}

export default function (
  state: StoreState = initialState,
  action: RecipeMessage
) {
  switch (action.type) {
    case GET_CAROUSEL_RECIPES:
      return {
        ...state,
        items: action.payload,
      };
    case GET_LATEST_RECIPES:
      return {
        ...state,
        items: action.payload,
      };
    case GET_RELATED_RECIPES:
      return {
        ...state,
        items: action.payload,
      };
    case EXPLORE_RECIPES:
      return {
        ...state,
        items: state.items.concat(action.payload),
      };
    default:
      return state;
  }
}
