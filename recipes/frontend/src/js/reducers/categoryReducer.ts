/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { LIST_CATEGORIES } from "../actions/recipeActions";
import { GenericStoreState } from "./types";
import { Category } from "../lib/data/category";

const initialState: GenericStoreState = new GenericStoreState([], {});

export interface CategoryMessage {
  type: string;
  categories: Array<Category>;
}

export default function (
  state: GenericStoreState = initialState,
  action: CategoryMessage
) {
  switch (action.type) {
    case LIST_CATEGORIES:
      return {
        ...state,
        items: action.categories,
      };
    default:
      return state;
  }
}
