/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { ActionMessage } from "../actions/types";
import { NEWSLETTER_SUBSCRIBE } from "../actions/newsletterActions";

import { GenericStoreState } from "./types";

const initialState: GenericStoreState = new GenericStoreState({}, {});

export default function (
  state: GenericStoreState = initialState,
  action: ActionMessage
) {
  switch (action.type) {
    case NEWSLETTER_SUBSCRIBE:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
