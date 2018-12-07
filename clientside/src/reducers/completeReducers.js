import { COMPLETE_TODO, DELETE_COMPLETE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case COMPLETE_TODO:
      return [...state, action.payload.todo];

      break;
    case DELETE_COMPLETE:
      return state.filter((todo, i) => i !== action.payload);
      break;
    default:
      return state;
  }
}
