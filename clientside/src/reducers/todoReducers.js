import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO
} from "../actions/types";

export default function(state = [], action) {
  // state represents todos
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.payload);
      break;
    case DELETE_TODO:
      return state.filter((todo, i) => i !== action.payload);
      break;
    case EDIT_TODO:
      return [
        ...state.slice(0, action.payload.id),
        action.payload.todo,
        ...state.slice(action.payload.id + 1, state.length)
      ];
      break;
    case COMPLETE_TODO:
      return state.filter((todo, i) => i !== action.payload.id);
      break;
    default:
      return state;
  }
}
