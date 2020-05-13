import { ActionMessage, ACCEPT_COOKIE_POLICY, GET_COOKIES, SET_LANGUAGE } from "../actions/types";

const initialState: object = {
  items: {},
  item: {}
};

export default function (state = initialState, action: ActionMessage) {
  switch (action.type) {
    case ACCEPT_COOKIE_POLICY:
      return {
        ...state,
        item: action.payload,
      };
    case GET_COOKIES:
      return {
        ...state,
        items: action.payload
      };
    case SET_LANGUAGE:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
