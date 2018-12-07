import { GET_TODOS, ADD_TODO, DELETE_TODO, EDIT_TODO } from "./types";
import axios from "axios";

export const get_todos = () => async dispatch => {
  const res = await axios.get("/api/get_todos");
  console.log(res.data);
  dispatch({
    type: GET_TODOS,
    payload: res.data
  });
};

export const add_todo = todo => async dispatch => {
  const res = await axios.post("/api/add_todo", {
    todo
  });
  dispatch({
    type: ADD_TODO,
    payload: res.data
  });
};

export const delete_todo = id => async dispatch => {
  const res = await axios.delete(`/api/delete_todo/`, { params: { id } });
  console.log(res.data);
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
