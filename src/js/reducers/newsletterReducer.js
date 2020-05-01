import { NEWSLETTER_SUBSCRIBE } from "../actions/types";

const initialState = {
  items: false,
  item: {},
};

export default function (state = initialState, action) {
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
