import { COMPLETE_TODO, DELETE_COMPLETE, GET_COMPLETE } from "./types";
import axios from "axios";

export const get_complete = () => async dispatch => {
  const res = await axios.get("/api/get_complete");
  console.log(res.data);
  dispatch({
    type: GET_COMPLETE,
    payload: res.data
  });
};

export const complete_todo = (id, todo) => async dispatch => {
  const res = await axios.post(`/api/complete_todo/${id}`, {
    todo
  });
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
  const res = await axios.delete(`/api/delete_complete`, { params: { id } });
  dispatch({
    type: DELETE_COMPLETE,
    payload: id
  });
};
