import { COMPLETE_TODO, DELETE_COMPLETE } from "./types";

export const complete_todo = (id, todo) => async dispatch => {
  const data = {
    todo,
    id
  };
  dispatch({
    type: COMPLETE_TODO,
    payload: data
  });
};

export const delete_complete = id => async dispatch => {
  dispatch({
    type: DELETE_COMPLETE,
    payload: id
  });
};
