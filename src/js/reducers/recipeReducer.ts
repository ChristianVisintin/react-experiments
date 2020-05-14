import { RecipeMessage, FETCH_RECIPES } from "../actions/types";

import {StoreState } from "./types";

const initialState: StoreState = new StoreState([], {});

export default function (state: StoreState = initialState, action: RecipeMessage) {
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
