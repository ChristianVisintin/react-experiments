import { ActionMessage, FETCH_RECIPES } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action: ActionMessage) {
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
