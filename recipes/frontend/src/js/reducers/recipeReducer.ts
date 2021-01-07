/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { GET_RECIPE, LIKE_RECIPE } from "../actions/recipeActions";
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
    case GET_RECIPE:
      return {
        ...state,
        item: action.payload,
      };
    case LIKE_RECIPE:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
