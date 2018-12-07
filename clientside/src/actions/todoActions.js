import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./types";

export const add_todo = todo => async dispatch => {
  dispatch({
    type: ADD_TODO,
    payload: todo
  });
};

export const delete_todo = id => async dispatch => {
  dispatch({
    type: DELETE_TODO,
    payload: id
  });
};

export const edit_todo = (id, todo) => async dispatch => {
  const data = {
    todo,
    id
  };
  console.log(data);
  dispatch({
    type: EDIT_TODO,
    payload: data
  });
};
