import { AUTH_USER } from "./types";
import axios from "axios";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("http://localhost:5000/auth/current_user");
  console.log(res);
  dispatch({
    type: AUTH_USER,
    payload: res.data
  });
};
