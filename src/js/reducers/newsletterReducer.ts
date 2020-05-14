import { ActionMessage, NEWSLETTER_SUBSCRIBE } from "../actions/types";

import {StoreState } from "./types";

const initialState: StoreState = new StoreState({}, {});

export default function (state: StoreState = initialState, action: ActionMessage) {
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
