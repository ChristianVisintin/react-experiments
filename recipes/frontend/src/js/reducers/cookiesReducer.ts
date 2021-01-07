/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import {
  ACCEPT_COOKIE_POLICY,
  GET_COOKIES,
  SET_LANGUAGE,
} from "../actions/cookiesActions";
import { GenericStoreState } from "./types";
import CookieStorage from "../lib/misc/cookie_storage";

const initialState: GenericStoreState = new GenericStoreState({}, {});

export interface CookiesMessage {
  type: string;
  payload: CookieStorage;
}

export interface CookiesMessage {
  type: string;
  payload: CookieStorage;
}

export default function (
  state: GenericStoreState = initialState,
  action: CookiesMessage
) {
  switch (action.type) {
    case ACCEPT_COOKIE_POLICY:
      return {
        ...state,
        item: action.payload,
      };
    case GET_COOKIES:
      return {
        ...state,
        items: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
