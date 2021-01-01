/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { FETCH_RECIPES } from "../actions/types";
import { StoreState } from "./types";
import Recipe from "../classes/recipe";

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
    case FETCH_RECIPES:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
