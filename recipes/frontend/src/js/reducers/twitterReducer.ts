/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { FETCH_TWEETS } from "../actions/twitterActions";
import { StoreState } from "./types";
import Tweet from "../lib/data/tweet";

const initialState: StoreState = new StoreState([], {});

export interface RecipeMessage {
  type: string;
  payload: Array<Tweet>;
}

export default function (
  state: StoreState = initialState,
  action: RecipeMessage
) {
  switch (action.type) {
    case FETCH_TWEETS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
